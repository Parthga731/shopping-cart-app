import React, { useEffect, useState } from "react";
import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { removeFromCart } from "../features/Products/cartSlice";
import { auth } from "../config/Firebase.config";
import { signOut } from "firebase/auth";
import { filterBySearch } from "../features/Products/FilterSlice";
import { cartType } from "../other/AllTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Header = ({ user }: any) => {
  console.log("header => ", user);
  const [activeNavbar, setActiveNavbar] = useState("/");
  const location = useLocation();
  const { cartItems } = useAppSelector((state) => state.cart_items);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") setActiveNavbar("/");
    else if (location.pathname === "/addproduct")
      setActiveNavbar("/addproduct");
    else if (location.pathname === "/about") setActiveNavbar("/about");
    else if (location.pathname === "/signup") setActiveNavbar("/signup");
    else if (location.pathname === "/login") setActiveNavbar("/login");
    else if (location.pathname === "/logout") setActiveNavbar("/logout");
  }, [location]);

  const logoutHandler = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }} expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Button variant="text" component={Link} to="/">
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", color: "white" }}>
                Shopping Cart
              </Typography>
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll>
              <NavLink
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: activeNavbar === "/" ? "aqua" : "yellow",
                  marginInline: "15px",
                }}>
                Home
              </NavLink>

              <NavLink
                to={"/about"}
                style={{
                  textDecoration: "none",
                  color: activeNavbar === "/about" ? "aqua" : "yellow",
                  marginInline: "15px",
                }}>
                About
              </NavLink>
            </Nav>

            {useLocation().pathname.split("/")[1] !== "cart" && (
              <Navbar.Text className="search">
                <FormControl
                  style={{ width: 500 }}
                  type="search"
                  placeholder="Search a product..."
                  className="m-auto"
                  aria-label="Search"
                  onChange={(e) => dispatch(filterBySearch(e.target.value))}
                />
              </Navbar.Text>
            )}
            <Box className="d-flex flex-row">
              {!user && (
                <>
                  <NavLink
                    to={"/login"}
                    style={{
                      textDecoration: "none",
                      color: activeNavbar === "/login" ? "aqua" : "yellow",
                      marginInline: "15px",
                      padding: "5px",
                    }}>
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    style={{
                      textDecoration: "none",
                      color: activeNavbar === "/signup" ? "aqua" : "yellow",
                      marginInline: "15px",
                      padding: "5px",
                    }}>
                    SingUp
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink
                    to={"/"}
                    style={{
                      textDecoration: "none",
                      color: activeNavbar === "/" ? "aqua" : "yellow",
                      marginInline: "15px",
                      padding: "5px",
                    }}>
                    {user}
                  </NavLink>
                  <NavLink
                    to={"/logout"}
                    onClick={logoutHandler}
                    style={{
                      textDecoration: "none",
                      color: activeNavbar === "/logout" ? "aqua" : "yellow",
                      marginInline: "15px",
                      padding: "5px",
                    }}>
                    Logout
                  </NavLink>
                  <Dropdown align={"end"}>
                    <Dropdown.Toggle variant="success">
                      <FaShoppingCart color="white" fontSize="25px" />
                      <Badge>{cartItems.length}</Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: 370 }}>
                      {cartItems.length > 0 ? (
                        <>
                          {cartItems.map((prod: cartType) => (
                            <span className="cartitem" key={prod.id}>
                              <img
                                src={prod.image}
                                className="cartItemImg"
                                alt={prod.name}
                              />
                              <div className="cartItemDetail">
                                <span>{prod.name}</span>
                                <span>₹ {prod.price}</span>
                              </div>
                              <AiFillDelete
                                fontSize="20px"
                                style={{ cursor: "pointer" }}
                                onClick={() => dispatch(removeFromCart(prod))}
                              />
                            </span>
                          ))}
                          <Link to="/cart">
                            <Button style={{ width: "95%", margin: "0 10px" }}>
                              Go To Cart
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <span style={{ padding: 10 }}>Cart is Empty!</span>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Box>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
