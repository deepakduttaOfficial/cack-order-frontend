import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useId } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { getcategory } from "../../helper/category";
import ImagesUpload from "../components/ImagesUpload";

import Sidebar from "../components/Sidebar";
// import UploadImageSlider from "../components/UploadImageSlider";

const CreateProduct = () => {
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
  });
  const { name, price, stock, category, description, formData } = values;

  useEffect(() => {
    formData.delete("photos");
    formData.append("photos", images);
  }, [images]);

  const handleChange = (name) => (e) => {
    formData.set(name, e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (var pair of formData.entries()) {
      console.log(pair);
    }
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
            <ImagesUpload images={images} setImages={setImages} />
            <HStack w={"full"}>
              <FormControl id={useId()} isRequired>
                <FormLabel>Product name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter a product name"
                  value={name}
                  onChange={handleChange("name")}
                />
              </FormControl>

              <FormControl id={useId()} isRequired>
                <FormLabel>price:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter a amount"
                  value={price}
                  onChange={handleChange("price")}
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
                />
              </FormControl>

              <FormControl id={useId()} isRequired>
                <FormLabel>Select a category</FormLabel>
                <Select
                  placeholder="Choose a category"
                  value={category}
                  onChange={handleChange("category")}
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
              />
            </FormControl>
            <CustomButton w={"full"} type={"submit"}>
              Create a product
            </CustomButton>
          </VStack>
        </form>
      </Stack>
    </Sidebar>
  );
};

export default CreateProduct;
