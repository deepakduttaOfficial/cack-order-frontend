import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Container, Button, VStack, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getLocalUser, isAuthenticate } from "../../helper/auth";
import useRazorpay from "react-razorpay";
import { createorder, createpayment } from "../../helper/paymentHendle";
import { removeAlladdcard } from "../../helper/addCard";

const Payment = ({ setStep }) => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const Razorpay = useRazorpay();
  const { createOrder } = useSelector((state) => state.ORDER);
  const navigate = useNavigate();
  const user = getLocalUser();
  const token = isAuthenticate();

  const handlePayment = useCallback(async () => {
    setLoading(true);
    const order = await createpayment(createOrder, user._id, token);
    if (!order.data) {
      setLoading(false);
      return toast({
        title: "Try again or reload the page",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top-right",
      });
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_PUBLIC_KEY,
      amount: createOrder.totalAmount,
      currency: "INR",
      name: "Misti shop",
      order_id: order.data?.payment?.id,
      handler: (paymentInfo) => {
        const data = {
          orderItems: createOrder?.orderItems,
          shippingInfo: createOrder?.shippingInfo,
          totalAmount: createOrder?.totalAmount,
          paymentInfo,
        };
        createorder(data, user._id, token).then((response) => {
          setLoading(false);
          if (!response.data) {
            return toast({
              title: "Try again or reload the page",
              status: "error",
              duration: 10000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            navigate(`/profile/order/${user._id}`);
            removeAlladdcard();
            toast({
              title: "Successfully ordered",
              status: "success",
              duration: 10000,
              isClosable: true,
              position: "top-right",
            });
          }
        });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: createOrder.shippingInfo?.phoneNo,
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response) {
      setLoading(false);
      toast({
        title: response.reason || "Payment failed, reload or try again later",
        description: response.description || null,
        status: "error",
        duration: 90000,
        isClosable: true,
        position: "top-right",
      });
    });
    rzpay.open();
  }, []);

  return (
    <VStack w={"full"}>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb={"5"}>
        Place your order
      </Heading>
      <Container>
        <Button
          w={"full"}
          colorScheme="green"
          onClick={handlePayment}
          isLoading={loading}
          loadingText="Submiting..."
        >
          Place your order
        </Button>

        <Button
          mt={"5%"}
          onClick={() => {
            setStep(1);
          }}
          variant="solid"
          w={"full"}
        >
          Back
        </Button>
      </Container>
    </VStack>
  );
};

export default Payment;
