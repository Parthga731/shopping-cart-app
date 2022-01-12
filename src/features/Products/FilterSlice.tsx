import { createSlice } from "@reduxjs/toolkit";
import faker from "faker";
import { filterType } from "../../other/AllTypes";

faker.seed(99);

const initialState: filterType = {
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
};

export const FilterSlice = createSlice({
  name: "productsall",
  initialState,
  reducers: {
    sortByPrice: (state, action) => {
      console.log(action.payload);
      return { ...state, sort: action.payload.sort };
    },
    filterByStock: (state, action) => {
      return { ...state, byStock: action.payload };
    },
    filterByDelivery: (state, action) => {
      return { ...state, byFastDelivery: action.payload };
    },
    filterByRating: (state, action) => {
      return { ...state, byRating: action.payload };
    },
    filterBySearch: (state, action) => {
      return { ...state, searchQuery: action.payload };
    },
    clearFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  sortByPrice,
  filterByStock,
  filterByDelivery,
  filterByRating,
  filterBySearch,
  clearFilter,
} = FilterSlice.actions;

export default FilterSlice.reducer;
