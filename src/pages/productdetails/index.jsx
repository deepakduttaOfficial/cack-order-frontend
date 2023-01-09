import React from "react";
import { useParams } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { getsingleproduct } from "./helper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProdcut } from "../../reducer/product/action";
import CarouselImagesCard from "./components/CarouselImagesCard";

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

  // const { singleproduct } = useSelector((state) => state.PRODUCT);
  // console.log(singleproduct);
  return (
    <Container maxW={"6xl"} bgColor="gray.700" p="10" my="14">
      <Flex>
        <CarouselImagesCard />
      </Flex>
    </Container>
  );
};

export default ProductDetails;
