import React from "react";
import { useParams } from "react-router-dom";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { getsingleproduct } from "./helper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProdcut } from "../../reducer/product/action";
import CarouselImagesCard from "./components/CarouselImagesCard";
import ProdcutDetailsCard from "./components/ProdcutDetailsCard";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getsingleproduct(productId).then((response) => {
      if (!response.data) {
        return toast(response.error.message || "Something went wrong", {
          type: "error",
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        dispatch(getSingleProdcut(response.data?.product));
      }
    });
  }, []);

  return (
    <Container
      maxW={"6xl"}
      my="14"
      bgColor={useColorModeValue("gray.100", "gray.700")}
    >
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ base: "start", md: "space-between" }}
      >
        <CarouselImagesCard />
        <ProdcutDetailsCard />
      </Flex>
    </Container>
  );
};

export default ProductDetails;
