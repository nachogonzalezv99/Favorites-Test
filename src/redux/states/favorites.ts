import { LocalStorageType, Person } from "@/models";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Person[] = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getLocalStorage(LocalStorageType.FAVORITES)
    ? JSON.parse(getLocalStorage(LocalStorageType.FAVORITES) as string)
    : initialState,
  reducers: {
    addFavorite: (state, action) => {
      setLocalStorage(LocalStorageType.FAVORITES, action.payload);
      return action.payload;
    }
  },
});

export const { addFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
