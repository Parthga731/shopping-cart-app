import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart, removeFromCart } from "../features/Products/cartSlice";
import { cartType, productType } from "../other/AllTypes";
import { Rating } from "./Rating";

export const SingleProduct = ({ prod }: any) => {
  const carts = useAppSelector((state) => state.cart_items);
  console.log(prod);
  const dispatch = useAppDispatch();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prod.ratings} onClick={null} />
          </Card.Subtitle>
          {carts.cartItems.some((p: cartType) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() => dispatch(removeFromCart(prod))}>
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(addToCart(prod))}
              disabled={!prod.inStock}>
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
