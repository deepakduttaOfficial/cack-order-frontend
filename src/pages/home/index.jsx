import { Grid, HStack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Base from "../../components/navbar";
import ProductCard from "../../components/ProductCard";
import { getAllProdcuts } from "../../reducer/product/action";
import { getallproducts } from "./helper";

const Home = () => {
  const dispatch = useDispatch();
  const { products, rerender } = useSelector((state) => state.PRODUCT);
  useEffect(() => {
    return () => {
      getallproducts().then((response) => {
        if (!response.data) {
          return toast(response.error.message || "Something went wrong", {
            type: "error",
            theme: "colored",
            autoClose: 2000,
          });
        } else {
          dispatch(getAllProdcuts(response?.data?.products));
        }
      });
    };
  }, [rerender]);
  return (
    <Base>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </Grid>
    </Base>
  );
};

export default Home;
