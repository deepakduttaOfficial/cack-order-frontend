import React from "react";
import { Card, HStack, Image } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { useSelector } from "react-redux";

const CarouselImagesCard = () => {
  const { singleproduct } = useSelector((state) => state.PRODUCT);
  const images = [];

  singleproduct?.photos?.map((photo) => {
    images.push({ original: photo.secure_url, thumbnail: photo.secure_url });
  });

  return (
    <Card w={{ base: "full", md: "md" }}>
      <ImageGallery
        infinite={false}
        showFullscreenButton={true}
        showPlayButton={true}
        disableSwipe={true}
        slideDuration={0}
        showBullets={true}
        items={images}
      />
    </Card>
  );
};

export default CarouselImagesCard;
