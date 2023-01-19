import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { getallproducts } from "../../../pages/home/helper";
import { Box, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { months } from "../month";
import Graph_Comp from "../../components/Graph_Comp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Product_graph = () => {
  const [createdMonth, setCreatedMonth] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
  const { search, minPrice, maxPrice } = filter;

  useEffect(() => {
    setLoading(true);
    getallproducts({ search, minPrice, maxPrice }).then((response) => {
      setLoading(false);
      if (!response.data) {
        setCreatedMonth([]);
      } else {
        let product = response.data?.products;
        let dateArry = [];
        product.map((product) => {
          const date = new Date(product?.createdAt);
          dateArry.push(months[date.getMonth()]);
        });
        setCreatedMonth(dateArry);
      }
    });
  }, []);

  return (
    <VStack
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      w={"full"}
      py={"5"}
    >
      <Heading
        textAlign={"center"}
        mt={"14"}
        mb={"5"}
        px={5}
        color={useColorModeValue("gray.500", "gray.400")}
      >
        This Chart illustrates the number of Products uploaded/month
      </Heading>
      <Box bgColor="white" w={"full"}>
        <Graph_Comp createdMonth={createdMonth} label={"Products"} />
      </Box>
    </VStack>
  );
};

export default Product_graph;
