import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import CustomButton from "./CustomButton";
import { NavLink, useNavigate } from "react-router-dom";
import { addcard, getaddcard } from "../helper/addCard";
import { useDispatch } from "react-redux";
import { updateAddCard } from "../reducer/UI/action";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClik = (product) => {
    const isAdded = getaddcard().some((item) => {
      if (item._id === product._id) {
        return true;
      } else {
        return false;
      }
    });
    if (!isAdded) {
      addcard(product);
      dispatch(updateAddCard());
      navigate("/addcard");
    } else {
      navigate("/addcard");
    }
  };
  return (
    <LinkBox role={"group"} display="inline-block">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={"full"}
        maxW={"sm"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Box overflow={"hidden"} display={"flex"} w={"full"}>
          <Image
            src={product?.photos[0]?.secure_url}
            alt={`Picture of ${product?.photos[0]?.public_id}`}
            w={"full"}
            transition="all 0.5s ease-in-out"
            _groupHover={{ transform: "scale(1.2)" }}
          />
        </Box>

        <Box px="4" py={"6"}>
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
              New
            </Badge>
          </Box>
          <LinkOverlay as={NavLink} to={`/product/${product?._id}`}>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="lg"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {product?.name}
              </Box>
            </Flex>
          </LinkOverlay>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="2xl" mr="2">
                ₹
              </Box>
              {product?.price.toFixed(2)}
            </Box>
          </Flex>
          <CustomButton
            w={"full"}
            mt={3}
            display="flex"
            alignItems="center"
            onClick={() => {
              handleClik(product);
            }}
          >
            <Text mr={"2"}>Add to card</Text> <FiShoppingCart />
          </CustomButton>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default ProductCard;
