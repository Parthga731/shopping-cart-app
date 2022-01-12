import { createSlice } from "@reduxjs/toolkit";
import faker from "faker";
import { productType } from "../../other/AllTypes";

faker.seed(99);

const products: productType[] = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  decription: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  image: faker.random.image(),
  inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
}));

const initialState = {
  allproducts: products,
};

export const productsSlice = createSlice({
  name: "productsall",
  initialState,
  reducers: {
    addProduct: (state, payload) => {},
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
