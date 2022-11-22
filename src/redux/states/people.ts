import { LocalStorageType, Person } from "@/models";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Person[] = [];

export const peopleSlice = createSlice({
  name: "people",
  initialState: getLocalStorage(LocalStorageType.PEOPLE)
    ? JSON.parse(getLocalStorage(LocalStorageType.PEOPLE) as string)
    : initialState,
  reducers: {
    addPeople: (state, action) => {
      setLocalStorage(LocalStorageType.PEOPLE, action.payload);
      return action.payload;
    },
  },
});

export const { addPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
