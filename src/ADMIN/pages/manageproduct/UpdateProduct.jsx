import React, { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getsingleproduct } from "../../../pages/productdetails/helper";
import Sidebar from "../../components/Sidebar";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { getcategory } from "../../../helper/category";
import CustomButton from "../../../components/CustomButton";
import ImagesUpload from "../../components/ImagesUpload";
import { updateproduct } from "../../helper/product";
import { isAuthenticate } from "../../../helper/auth";
import { reRenderProduct } from "../../../reducer/product/action";
import { BiArrowBack } from "react-icons/bi";

const UpdateProduct = () => {
  const { adminId, productId } = useParams();
  const navigate = useNavigate();
  const token = isAuthenticate();
  const toast = useToast();
  const dispatch = useDispatch();

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
  // Find the Product using
  useEffect(() => {
    getsingleproduct(productId).then((response) => {
      if (!response.data) {
        return navigate("/");
      } else {
        let product = response.data?.product;
        setValues({
          ...values,
          name: product?.name,
          price: product?.price,
          stock: product?.stock,
          category: product?.category,
          description: product?.description,
        });
      }
    });
  }, []);

  // Get all categories
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

  // Update product
  useEffect(() => {
    formData.delete("photos");
    if (images.length !== 0) {
      images.forEach((image) => {
        formData.append("photos", image);
      });
    }
  }, [images]);

  const handleChange = (name) => (e) => {
    formData.set(name, e.target.value);
    setValues({ ...values, [name]: e.target.value, loading: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    updateproduct(formData, adminId, token, productId).then((response) => {
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
          title: "The product has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate(`/admin/${adminId}/dashboard/manageproduct`);
        dispatch(reRenderProduct());
      }
    });
  };

  return (
    <Sidebar>
      <Button mt={{ base: "2", md: 5 }} onClick={() => navigate(-1)}>
        <BiArrowBack />
      </Button>
      <Stack
        mx={"auto"}
        maxW={{ base: "full", sm: "lg" }}
        py={12}
        px={{ base: "2", sm: 6 }}
        bg={useColorModeValue("white", "gray.900")}
        rounded="md"
        //
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <ImagesUpload
              images={images}
              setImages={setImages}
              loading={loading}
            />
            {images.length === 0 && (
              <Text textAlign={"center"}>
                If you don't upload a new image, the previous image will remain
                unchanged.
              </Text>
            )}
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
              disabled={loading}
            >
              Update product
            </CustomButton>
          </VStack>
        </form>
      </Stack>
    </Sidebar>
  );
};
export default UpdateProduct;
