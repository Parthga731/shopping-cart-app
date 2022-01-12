import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import productsReducer from "../features/Products/productsSlice";
import FilterReducer from "../features/Products/FilterSlice";
import cartReducer from "../features/Products/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    productsval: productsReducer,
    filters: FilterReducer,
    cart_items: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
