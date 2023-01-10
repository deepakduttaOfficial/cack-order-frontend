import React from "react";
import { Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const CarouselImagesCard = () => {
  const { singleproduct } = useSelector((state) => state.PRODUCT);
  const images = [];

  singleproduct?.photos?.map((photo) => {
    images.push({ original: photo.secure_url, thumbnail: photo.secure_url });
  });

  return (
    <Box px={{ base: "0", md: "5" }} w={{ base: "full", md: "lg" }}>
      <Button mt="5" as={NavLink} to="/">
        <BiArrowBack />
      </Button>
      <Box py={"5"}>
        <ImageGallery
          infinite={false}
          showFullscreenButton={true}
          showPlayButton={true}
          disableSwipe={true}
          slideDuration={0}
          showBullets={true}
          items={images}
        />
      </Box>
    </Box>
  );
};

export default CarouselImagesCard;
