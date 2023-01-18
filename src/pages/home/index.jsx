import { Grid, HStack, Progress, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Base from "../../components/navbar";
import ProductCard from "../../components/ProductCard";
import { getAllProdcuts } from "../../reducer/product/action";
import { getallproducts } from "./helper";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { products, rerender, search } = useSelector((state) => state.PRODUCT);
  useEffect(() => {
    setLoading(true);
    getallproducts(search).then((response) => {
      setLoading(false);
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
  }, [rerender, search]);

  {
    Array(9).fill(" ");
  }

  return (
    <Base>
      {loading && (
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {Array(9)
            .fill(" ")
            .map((_, index) => {
              return <Skeleton key={index} height={"380px"} />;
            })}
        </Grid>
      )}

      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </Grid>
    </Base>
  );
};

export default Home;
