import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../config/Firebase.config";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/Products/cartSlice";
import { Header } from "../components/Header";
import { IconButton } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Cart = ({ user }: any) => {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useAppSelector(
    (state: any) => state.cart_items
  );
  console.log(cartItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getTotals(null));
  }, [cartItems, dispatch]);
  return (
    <>
      <Header user={user} />
      {cartItems.length !== 0 && <h1>Cart</h1>}
      <div className="cart-container">
        {cartItems.length === 0 && (
          <>
            <div>
              no items in your cart or slow internet causing trouble (Refresh
              the page) or you are not logged in
            </div>
            <div>
              <Link to="/">Return to Home page</Link>
            </div>
          </>
        )}
        {cartItems &&
          cartItems.map((cart: any) => (
            <div className="cart-card" key={cart.id}>
              <div className="cart-img">
                <img src={cart.image} alt="not found" />
              </div>

              <div className="cart-name">{cart.name}</div>

              <div className="cart-price-orignal">Rs {cart.price}.00</div>

              <IconButton
                color="primary"
                className="inc"
                onClick={() => dispatch(addToCart(cart))}>
                <Add />
              </IconButton>
              <div className="quantity">{cart.quantity}</div>

              <IconButton
                color="primary"
                className="dec"
                onClick={() => dispatch(decreaseCart(cart))}>
                <Remove />
              </IconButton>

              <div className="cart-price">Rs {cart.totalProductPrice}.00</div>
              <IconButton
                color="primary"
                className="delete-btn"
                onClick={() => dispatch(() => dispatch(removeFromCart(cart)))}>
                <Delete />
              </IconButton>
            </div>
          ))}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="cart-summary-heading">Cart-Summary</div>
            <div className="cart-summary-price">
              <span>Total Price</span>
              <span>{cartTotalAmount}</span>
            </div>
            <div className="cart-summary-price">
              <span>Total Qty</span>
              <span>{cartTotalQuantity}</span>
            </div>
            <Link to="/purchaseitem" className="cashout-link">
              <button
                className="btn btn-success btn-md"
                style={{ marginTop: 5 + "px" }}>
                Cash on delivery
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
