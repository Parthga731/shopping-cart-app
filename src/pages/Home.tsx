import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Filter } from "../components/Filter";
import { Header } from "../components/Header";
import { SingleProduct } from "../components/SingleProduct";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase.config";
import { useAppSelector } from "../app/hooks";
import { productType } from "../other/AllTypes";

export const Home = ({ user }: any) => {
  const { allproducts } = useAppSelector((state) => state.productsval);
  const { byStock, byFastDelivery, byRating, searchQuery, sort } =
    useAppSelector((state: any) => state.filters);
  const navigate = useNavigate();
  console.log(allproducts);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  const transformProducts = () => {
    let sortedProducts = allproducts;

    console.log(sortedProducts);

    if (sort) {
      console.log(sort);
      sortedProducts = sortedProducts.slice().sort((a: any, b: any) => {
        return sort === "lowToHigh" ? a.price - b.price : b.price - a.price;
      });
      console.log(sortedProducts);
    }

    if (!byStock) {
      sortedProducts = sortedProducts?.filter(
        (prod: productType) => prod.inStock
      );
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts?.filter(
        (prod: productType) => prod.fastDelivery
      );
    }

    if (byRating) {
      sortedProducts = sortedProducts?.filter(
        (prod: productType) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts?.filter((prod: productType) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <>
      <Header user={user} />
      <Box className="home">
        <Filter />
        <Box className="productContainer">
          {transformProducts()?.map((prod: productType) => {
            console.log(prod);
            return <SingleProduct prod={prod} key={prod.id} />;
          })}
        </Box>
      </Box>
    </>
  );
};
