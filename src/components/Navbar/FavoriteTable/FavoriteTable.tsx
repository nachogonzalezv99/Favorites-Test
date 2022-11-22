import { AppStore } from "@/redux/store";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { Person } from "@/models";
import { addFavorite } from "@/redux/states";

export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {
  const pageSize = 5;
  const stateFavorites = useSelector((store: AppStore) => store.favorites);
  const dispatch = useDispatch();

  const handleClick = (person: Person) => {
    const filteredPeople = stateFavorites.filter((p) => p.id !== person.id);
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
          <IconButton
            size="large"
            aria-label="favorites"
            color="inherit"
            onClick={() => handleClick(params.row)}
          >
            <AiFillDelete />
          </IconButton>
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
      rows={stateFavorites}
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

export default FavoriteTable;
