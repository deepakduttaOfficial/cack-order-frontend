import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  Select,
  useToast,
} from "@chakra-ui/react";

import { isAuthenticate } from "../../../helper/auth";
import { updateorderstatus } from "../../helper/order";
import { reRenderOrder } from "../../../reducer/order/action";

const UpdateOrder = ({ id }) => {
  const { adminId } = useParams();
  const token = isAuthenticate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [orderId, setOrderId] = useState();
  const [value, setValue] = useState("");
  const [loading, setloading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const orderStatus = ["PROCESSING", "SHIPPED", "CANCELLED", "DELIVERED"];

  const updateOrder = (orderId) => {
    setloading(true);
    const data = { orderStatus: value };
    updateorderstatus(adminId, token, orderId, data).then((response) => {
      setloading(false);
      if (!response.data) {
        return toast({
          position: "top-right",
          title: response.error.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        setValue("");
        onClose();
        toast({
          position: "top-right",
          title: "The order has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(reRenderOrder());
      }
    });
  };
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setOrderId(id);
        }}
        size={"sm"}
        colorScheme="blue"
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form a update Orders</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateOrder(orderId);
            }}
          >
            <ModalBody>
              <FormControl id="order" isRequired>
                <Select
                  placeholder="Select option"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                >
                  {orderStatus.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                w={"full"}
                type="submit"
                isLoading={loading}
                loadingText={"Updating..."}
                disabled={loading}
              >
                Update Order
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateOrder;
