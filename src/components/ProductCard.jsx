import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  LinkBox,
  LinkOverlay,
  Circle,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import CustomButton from "./CustomButton";
import { NavLink } from "react-router-dom";
const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1521398359471-8997fbaa9406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fja2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  name: "Wayfarer Classic this is a awosome card",
  price: 4.5,
};

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <LinkBox role={"group"}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={"full"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Box
          overflow={"hidden"}
          display={"flex"}
          // justifyContent="center"
          // alignItems={"center"}
          h={"200"}
          w={"full"}
        >
          <Image
            src={product?.photos[0]?.secure_url}
            alt={`Picture of ${data.name}`}
            w={"full"}
            transition="all 0.5s ease-in-out"
            _groupHover={{ transform: "scale(1.2)" }}
          />
        </Box>

        <Box px="4" py={"6"}>
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              New
            </Badge>
          </Box>
          <LinkOverlay as={NavLink} to={`/e/signin/${product?._id}`}>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
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
          <CustomButton w={"full"} mt={3} display="flex" alignItems="center">
            <Text mr={"2"}>Add to card</Text> <FiShoppingCart />
          </CustomButton>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default ProductCard;
