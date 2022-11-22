import { Person } from "@/models";
import { addFavorite } from "@/redux/states";
import { AppStore } from "@/redux/store";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
  const pageSize = 5;
  const dispatch = useDispatch();
  const statePeople = useSelector((store: AppStore) => store.people);
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const findPerson = (person: Person) =>
    !!stateFavorites.find((p) => p.id === person.id);

  const filterPerson = (person: Person) =>
    stateFavorites.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...stateFavorites, person];
    dispatch(addFavorite(filteredPeople));
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "levelOfHappiness",
      headerName: "Happiness",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];
  return (
    <DataGrid
      rows={statePeople}
      columns={columns}
      disableColumnSelector
      disableSelectionOnClick
      autoHeight
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
      getRowId={(row: any) => row.id}
    />
  );
};

export default PeopleTable;
