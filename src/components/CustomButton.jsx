import { Button } from "@chakra-ui/react";
import React from "react";

const CustomButton = ({ children, ...rest }) => {
  return (
    <Button
      color={"white"}
      bgGradient="linear(to-r, red.400,pink.400)"
      _hover={{
        bgGradient: "linear(to-r, red.400,pink.400)",
        boxShadow: "xl",
      }}
      _focus={{
        bgGradient: "linear(to-r, red.300,pink.300)",
        boxShadow: "xl",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
