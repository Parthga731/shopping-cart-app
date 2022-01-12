import { doc, setDoc } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header } from "../components/Header";
import { auth, database } from "../config/Firebase.config";
import { getSingleData } from "../config/FirebaseFunc";
import { clearCart } from "../features/Products/cartSlice";

export const PurchaseProduct = ({ user }: any) => {
  const { cartTotalQuantity, cartTotalAmount, cartItems } = useAppSelector(
    (state) => state.cart_items
  );
  //   console.log(cart_item);
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Email: "",
    CellNo: "",
    Address: "",
    UserProductList: cartItems,
    TotalQuantity: cartTotalQuantity,
    TotalPrice: cartTotalAmount,
  });
  const [error, setError] = useState("");
  const [successFulMsg, setSuccessFulMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    Name,
    Email,
    Address,
    CellNo,
    UserProductList,
    TotalQuantity,
    TotalPrice,
  } = userInfo;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getSingleData(user)
          .then((data: any) => {
            console.log(data);
            setUserInfo({
              ...userInfo,
              Name: data.name,
              Email: data.email,
              CellNo: data.phoneNumber || "",
            });
          })
          .catch((error) => {
            setError(error.message);
            toast.error("user is not present");
          });
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  const handlerChangeProduct = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const cashoutSubmit = (e: any) => {
    e.preventDefault();
    console.log(userInfo);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const date = new Date();
        const time = date.getTime();
        setDoc(doc(database, `Buyer-info - ${user.uid}`, `_${time}`), {
          BuyerName: Name,
          BuyerEmail: Email,
          BuyerCell: CellNo,
          BuyerAddress: Address,
          BuyerPayment: TotalPrice,
          BuyerProductList: UserProductList,
          BuyerQuantity: TotalQuantity,
        })
          .then(() => {
            // setUserInfo({null});
            dispatch(clearCart(null));
            setSuccessFulMsg(
              "Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds"
            );
            toast.success(
              "Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds"
            );
            setTimeout(() => {
              navigate("/");
            }, 5000);
          })
          .catch((error) => {
            setError(error.message);
            toast.error(error.message);
          });
      }
    });
  };

  return (
    <>
      <Header user={user} />
      <div className="container">
        <br />
        <h2>Cashout Details</h2>
        <br />
        {successFulMsg && (
          <>
            <div className="success-msg">{successFulMsg}</div>
          </>
        )}
        <form
          autoComplete="off"
          className="form-group"
          onSubmit={cashoutSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            required
            name="Name"
            value={Name}
            disabled
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="Email"
            className="form-control"
            required
            value={Email}
            disabled
          />
          <br />
          <label htmlFor="Cell No">Cell No</label>
          <input
            type="number"
            name="CellNo"
            className="form-control"
            required
            onChange={handlerChangeProduct}
            value={CellNo}
            placeholder="eg 03123456789"
          />
          <br />
          <label htmlFor="Delivery Address">Delivery Address</label>
          <input
            type="text"
            name="Address"
            className="form-control"
            required
            onChange={handlerChangeProduct}
            value={Address}
          />
          <br />
          <label htmlFor="Price To Pay">Price To Pay</label>
          <input
            type="number"
            name="TotalPrice"
            className="form-control"
            required
            value={TotalPrice}
            disabled
          />
          <br />
          <label htmlFor="Total No of Products">Total No of Products</label>
          <input
            type="number"
            name="TotalQuantity"
            className="form-control"
            required
            value={TotalQuantity}
            disabled
          />
          <br />
          <button type="submit" className="btn btn-success btn-md mybtn">
            SUBMIT
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
      </div>
    </>
  );
};
