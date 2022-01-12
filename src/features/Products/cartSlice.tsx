import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cartItemsType, cartType } from "../../other/AllTypes";

const initialState: cartItemsType = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const CartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action);

      const existingIndex = state.cartItems.findIndex(
        (item: cartType) => item.id === action.payload.id
      );

      let product = action.payload;
      let selectProduct: cartType = state.cartItems[existingIndex];
      if (existingIndex >= 0) {
        selectProduct = {
          ...product,
          quantity: product.quantity + 1,
        };
        selectProduct = {
          ...selectProduct,
          totalProductPrice:
            Number(selectProduct.quantity) * selectProduct.price,
        };
        state.cartItems[existingIndex] = selectProduct;
        toast.info("Increased product quantity");
      } else {
        let tempProductItem: cartType = {
          ...action.payload,
          quantity: 1,
          totalProductPrice: product.price,
        };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
        console.log("addtoproduct => ", state.cartItems);
      }
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * Number(quantity);

          cartTotal.total += itemTotal;
          cartTotal.quantity += Number(quantity);

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    decreaseCart: (state: any, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item: cartType) => item.id === action.payload.id
      );

      console.log(state.cartItems[itemIndex]);

      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
        state.cartItems[itemIndex].totalProductPrice -=
          state.cartItems[itemIndex].price;

        toast.info("Decreased product quantity");
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item: cartType) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.error("Product removed from cart");
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product: cartType) => product.id !== action.payload.id
      );
      let product = action.payload;
      state.cartTotalQuantity =
        Number(state.cartTotalQuantity) - product.quantity;
      state.cartTotalAmount =
        (state.cartTotalQuantity - product.quantity) * product.price;
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});

export const { addToCart, getTotals, decreaseCart, removeFromCart, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
