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
import React, { useEffect, useRef } from "react";

import { useState } from "react";
import ImageInput from "../components/ImageInput";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CloseIcon } from "@chakra-ui/icons";

const ImagesUpload = ({ images, setImages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectFile, setSelectFile] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [crop, setcrop] = useState({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 56.25,
  });
  const [cropped, setCropped] = useState(crop);

  const imgRef = useRef();

  useEffect(() => {
    if (isModal) {
      onOpen();
      return;
    } else {
      onClose();
      return;
    }
  }, [isModal]);

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
              <AspectRatio w={"470px"} ratio={16 / 9}>
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
                <AspectRatio w={"150px"} ratio={16 / 9}>
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
          />
        )}
      </VStack>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody py={6}>
            <Center>
              {selectFile && (
                <ReactCrop
                  crop={crop}
                  onChange={(crop) => {
                    setcrop(crop);
                  }}
                  aspect={16 / 9}
                  onComplete={(cropped) => {
                    setCropped(cropped);
                  }}
                >
                  <img width={200} src={selectFile} ref={imgRef} />
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
