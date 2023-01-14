import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useId } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { isAuthenticate } from "../../helper/auth";
import { getcategory } from "../../helper/category";
import ImagesUpload from "../components/ImagesUpload";

import Sidebar from "../components/Sidebar";
import { createproduct } from "../helper/product";

const CreateProduct = () => {
  const { adminId } = useParams();
  const token = isAuthenticate();
  const toast = useToast();
  const navigate = useNavigate();
  // Get all category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getcategory().then((response) => {
      if (!response.data) {
        return;
      } else {
        setCategories(response.data?.categories);
      }
    });
  }, []);

  const [images, setImages] = useState([]);
  const [values, setValues] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    formData: new FormData(),
    loading: false,
  });
  const { name, price, stock, category, description, formData, loading } =
    values;

  useEffect(() => {
    formData.delete("photos");
    images.forEach((image) => {
      formData.append("photos", image);
    });
  }, [images]);

  const handleChange = (name) => (e) => {
    formData.set(name, e.target.value);
    setValues({ ...values, [name]: e.target.value, loading: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    createproduct(formData, adminId, token).then((response) => {
      setValues({ ...values, loading: false });
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
          title: "Product created successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <Sidebar>
      <Stack
        mx={"auto"}
        maxW={{ base: "full", sm: "lg" }}
        py={12}
        px={{ base: "2", sm: 6 }}
        bg={useColorModeValue("white", "gray.900")}
        rounded="md"
        mt={{ base: "2", md: 12 }}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <ImagesUpload
              images={images}
              setImages={setImages}
              loading={loading}
            />
            <HStack w={"full"}>
              <FormControl id={useId()} isRequired>
                <FormLabel>Product name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter a product name"
                  value={name}
                  onChange={handleChange("name")}
                  disabled={loading}
                />
              </FormControl>

              <FormControl id={useId()} isRequired>
                <FormLabel>price:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter a amount"
                  value={price}
                  onChange={handleChange("price")}
                  disabled={loading}
                />
              </FormControl>
            </HStack>

            <HStack w={"full"}>
              <FormControl id={useId()} isRequired>
                <FormLabel>Stock</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your product stock"
                  value={stock}
                  onChange={handleChange("stock")}
                  disabled={loading}
                />
              </FormControl>

              <FormControl id={useId()} isRequired>
                <FormLabel>Select a category</FormLabel>
                <Select
                  placeholder="Choose a category"
                  value={category}
                  onChange={handleChange("category")}
                  disabled={loading}
                >
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>

            <FormControl id="name">
              <FormLabel>Product Description</FormLabel>
              <Textarea
                placeholder="Write some about your product..."
                rows={5}
                value={description}
                onChange={handleChange("description")}
                disabled={loading}
              />
            </FormControl>
            <CustomButton
              w={"full"}
              type={"submit"}
              isLoading={loading}
              loadingText={"Creating..."}
              disabled={loading || images.length === 0}
            >
              Create a product
            </CustomButton>
          </VStack>
        </form>
      </Stack>
    </Sidebar>
  );
};

export default CreateProduct;
