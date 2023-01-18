import React, { useEffect, useState, useRef } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ReactCrop, { makeAspectCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { CloseIcon } from "@chakra-ui/icons";
import ImageInput from "../components/ImageInput";

// Set to default crop center
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImagesUpload = ({ images, setImages, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectFile, setSelectFile] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [crop, setCrop] = useState();
  const [cropped, setCropped] = useState(crop);
  const imgRef = useRef();
  let ratio = 1;

  useEffect(() => {
    if (isModal) {
      onOpen();
      return;
    } else {
      onClose();
      return;
    }
  }, [isModal]);

  // Generate a new croped image
  const preView = () => {
    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const crop = cropped;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      setImages([
        ...images,
        new File([blob], `cropped${crypto.randomUUID()}.png`, {
          type: "image/png",
        }),
      ]);
    });
  };

  const removeImage = (val) => {
    const rm = images.filter((_, index) => index !== val);
    setImages(rm);
  };

  return (
    <>
      <VStack mb={"4"}>
        <VStack w={"full"}>
          {images?.length >= 1 && (
            <Box position={"relative"}>
              <CloseIcon
                color="red.700"
                position={"absolute"}
                zIndex={"overlay"}
                top={0}
                right={0}
                onClick={() => {
                  removeImage(0);
                }}
                cursor="pointer"
              />
              <AspectRatio w={"200px"} ratio={ratio}>
                <Image src={URL.createObjectURL(images[0])} w="full" />
              </AspectRatio>
            </Box>
          )}
          <HStack>
            {images?.map((_, index) => (
              <Box
                key={index}
                position={"relative"}
                display={index === 0 ? "none" : "block"}
              >
                <CloseIcon
                  color="red.700"
                  position={"absolute"}
                  zIndex={"overlay"}
                  top={0}
                  right={0}
                  onClick={() => {
                    removeImage(index);
                  }}
                  cursor="pointer"
                />
                <AspectRatio w={"100px"} ratio={ratio}>
                  <Image src={URL.createObjectURL(images[index])} w="full" />
                </AspectRatio>
              </Box>
            ))}
          </HStack>
        </VStack>
        {images?.length <= 3 && (
          <ImageInput
            onChange={(e) => {
              setSelectFile(URL.createObjectURL(e.target.files[0]));
              setIsModal(true);
            }}
            disabled={loading}
          />
        )}
      </VStack>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={6}>
            <Center>
              {selectFile && (
                <ReactCrop
                  crop={crop}
                  onChange={(crop) => {
                    setCrop(crop);
                  }}
                  aspect={ratio}
                  onComplete={(cropped) => {
                    setCropped(cropped);
                  }}
                >
                  <img
                    width={200}
                    src={selectFile}
                    ref={imgRef}
                    onLoad={(e) => {
                      const { width, height } = e.currentTarget;
                      setCrop(centerAspectCrop(width, height, ratio));
                    }}
                  />
                </ReactCrop>
              )}
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                preView();
                setIsModal(false);
                setSelectFile(null);
              }}
            >
              Crop
            </Button>
            <Button
              onClick={() => {
                setIsModal(false);
                setSelectFile(null);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagesUpload;
