import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { getonecategory, updatecategory } from "../../helper/category";

import { isAuthenticate } from "../../../helper/auth";
import { useDispatch } from "react-redux";
import { reRenderCategory } from "../../../reducer/category/action";

const UpdateCategory = ({ id, adminId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const token = isAuthenticate();
  const toast = useToast();
  const dispatch = useDispatch();

  const getOneCategory = (id) => {
    getonecategory(id).then((response) => {
      if (!response.data) {
        return false;
      } else {
        setValue(response.data?.category?.name);
      }
    });
  };

  const updateCategory = (categoryId) => {
    setLoading(true);
    const data = { name: value };
    updatecategory(data, adminId, token, categoryId).then((response) => {
      setValue("");
      setLoading(false);
      onClose();
      if (!response.data) {
        return toast({
          position: "top-right",
          title: response.error.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "The category has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(reRenderCategory());
      }
    });
  };

  return (
    <>
      <Button
        size={"sm"}
        colorScheme="blue"
        onClick={() => {
          getOneCategory(id);
          onOpen();
        }}
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form a update category</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCategory(id);
            }}
          >
            <ModalBody>
              <FormControl id="category" isRequired>
                <Input
                  placeholder="Update category"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
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
                Update Category
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCategory;
