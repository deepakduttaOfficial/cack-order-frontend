import React, { useEffect, useState } from "react";
import { Progress, Box, Button } from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import ShippingInfo from "./ShippingInfo";
import Payment from "./Payment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../helper/auth";
import { BiArrowBack } from "react-icons/bi";

const CreateOrder = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { createOrder } = useSelector((state) => state.ORDER);
  useEffect(() => {
    if (createOrder.orderItems.length === 0) {
      toast({
        title: "Check out first",
        status: "warning",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return navigate(`/addcard/${getLocalUser()._id}`);
    }
    if (createOrder.totalAmount === 0) {
      toast({
        title: "Check out first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return navigate(`/addcard/${getLocalUser()._id}`);
    }
  }, []);

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={800}
      p={6}
      m="10px auto"
      as="form"
    >
      <Button mt="5" onClick={() => navigate(-1)}>
        <BiArrowBack />
      </Button>
      {step === 1 ? (
        <ShippingInfo {...{ setStep }} />
      ) : (
        <Payment {...{ setStep }} />
      )}
    </Box>
  );
};

export default CreateOrder;
