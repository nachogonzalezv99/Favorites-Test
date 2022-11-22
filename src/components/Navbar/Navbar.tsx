import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { CustomDialog } from "../CustomDialog";
import { FavoriteTable } from "./FavoriteTable";
import { AiOutlineStar } from "react-icons/ai";
import { dialogOpenSubject$ } from "../CustomDialog/CustomDialog";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  return (
    <>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Test
          </Typography>
          <IconButton
            size="large"
            aria-label="favorites"
            color="inherit"
            onClick={handleClick}
          >
            <Badge badgeContent={stateFavorites.length} color="error">
              <AiOutlineStar />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
