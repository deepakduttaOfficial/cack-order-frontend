import {
  Box,
  useColorModeValue,
  Stack,
  FormLabel,
  Select,
  Textarea,
  HStack,
} from "@chakra-ui/react";

const Sidebar = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.400", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      pt={"20"}
      px={"3"}
      {...rest}
    >
      <Stack spacing="24px">
        <HStack>
          <Select id="owner" defaultValue="Min">
            <option value="segun">Min</option>
            <option value="segun">200</option>
            <option value="segun">300</option>
            <option value="segun">400</option>
            <option value="segun">500</option>
          </Select>
          <Select id="owner" defaultValue="Max">
            <option value="segun">Max</option>
            <option value="segun">200</option>
            <option value="segun">300</option>
            <option value="segun">400</option>
            <option value="segun">500</option>
          </Select>
        </HStack>

        <Box>
          <FormLabel htmlFor="owner">Select Category</FormLabel>
          <Select id="owner" defaultValue="segun">
            <option value="segun">Segun Adebayo</option>
            <option value="kola">Kola Tioluwani</option>
            <option value="kola">Kola Tioluwani</option>
            <option value="kola">Kola Tioluwani</option>
          </Select>
        </Box>

        <Box>
          <FormLabel htmlFor="desc">Description</FormLabel>
          <Textarea id="desc" />
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
