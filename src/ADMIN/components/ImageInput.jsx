import React from "react";
import { Box, Input } from "@chakra-ui/react";
import { BsFillCameraFill } from "react-icons/bs";

const ImageInput = ({ ...rest }) => {
  return (
    <Box
      position={"relative"}
      display="inline-flex"
      justifyContent={"center"}
      alignItems={"center"}
      h={"8"}
      w={"8"}
    >
      <Box position={"absolute"}>
        <BsFillCameraFill size={"26"} color="#759edb" />
      </Box>
      <Input
        h={"8"}
        w={"8"}
        display="inline-block"
        type={"file"}
        opacity="0"
        {...rest}
      />
    </Box>
  );
};
export default ImageInput;
