import { Grid, Skeleton, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Base from "../../components/navbar";
import ProductCard from "../../components/ProductCard";
import { getAllProdcuts } from "../../reducer/product/action";
import { getallproducts } from "./helper";

const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { products, rerender, minPrice, maxPrice } = useSelector(
    (state) => state.PRODUCT
  );
  const [searchParams, _] = useSearchParams();
  const search = searchParams.get("q");
  useEffect(() => {
    setLoading(true);
    getallproducts(search, minPrice, maxPrice).then((response) => {
      setLoading(false);
      if (!response?.data) {
        return toast({
          title: response.error.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        dispatch(getAllProdcuts(response?.data?.products));
      }
    });
  }, [rerender, search, minPrice, maxPrice]);

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

      <Grid
        // templateColumns="repeat(4, minmax(200px, 1fr))"
        templateColumns={{
          base: "repeat(1, minmax(200px, 1fr))",
          sm: "repeat(2, minmax(200px, 1fr))",
          md: "repeat(2, minmax(200px, 1fr))",
          lg: "repeat(3,  minmax(200px, 1fr))",
          xl: "repeat(4,  minmax(200px, 1fr))",
        }}
        gap={6}
      >
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </Grid>
    </Base>
  );
};

export default Home;
