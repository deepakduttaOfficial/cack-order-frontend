import React from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useColorMode,
  InputGroup,
  InputLeftElement,
  Input,
  Badge,
  useToast,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import CustomButton from "../CustomButton";
import { getLocalUser, isAuthenticate, signout } from "../../helper/auth";

import { FiShoppingCart } from "react-icons/fi";
import { getaddcard } from "../../helper/addCard";
import logo from "../../assets/logo.png";

const Topbar = ({ isOpen, onOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const user = getLocalUser();
  const { sidebarIcon } = useSelector((state) => state.UI);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        borderBottom="1px"
        borderBottomColor={useColorModeValue("gray.400", "gray.700")}
        position="sticky"
        top={0}
        zIndex={"overlay"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box as={NavLink} to="/" mr={["0px", "2"]}>
            <HStack>
              <Box w={9}>
                <Image src={logo} alt="logo" w={"full"} />
              </Box>
              <Text fontWeight={"bold"} display={{ base: "none", md: "block" }}>
                Misti
              </Text>
            </HStack>
          </Box>

          <InputGroup w={"70%"} mx="1">
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearch color="gray.300" />}
            />
            <Input
              type="search"
              placeholder="whitch cack do you want..."
              value={search || ""}
              onChange={(e) => {
                setSearchParams(`q=${e.target.value}`);
              }}
            />
          </InputGroup>

          <Flex alignItems={"center"}>
            <Button
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              _focus={{ boxShadow: "none" }}
              w="fit-content"
              mr={1}
            >
              {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
            </Button>

            <Box
              mr="2"
              as={NavLink}
              to={`/addcard`}
              position={"relative"}
              rounded="full"
              p={"1"}
            >
              <FiShoppingCart size="26px" name="bell" />
              <Badge
                position={"absolute"}
                top="-1"
                right="-1"
                bgColor={"red.400"}
                rounded="full"
              >
                {getaddcard().length}
              </Badge>
            </Box>

            {isAuthenticate() ? (
              <Flex alignItems={"center"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar name={user?.name} src={user?.photo?.secure_url} />
                  </MenuButton>
                  <MenuList>
                    {getLocalUser()?.role === "ADMIN" && (
                      <>
                        <MenuItem
                          color={useColorModeValue("green.600", "green.200")}
                          as={NavLink}
                          to={`/admin/${
                            getLocalUser()?._id
                          }/dashboard/createproduct`}
                        >
                          ADMIN DASHBOARD
                          <MenuDivider />
                        </MenuItem>
                      </>
                    )}

                    <MenuItem
                      as={NavLink}
                      to={`/profile/${getLocalUser()?._id}`}
                    >
                      PROFILE
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem
                      onClick={() => {
                        signout(() => {
                          toast({
                            title: "Log out",
                            status: "warning",
                            duration: 9000,
                            isClosable: true,
                            position: "top-right",
                          });
                          navigate("/e/signin");
                        });
                      }}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <CustomButton as={NavLink} to="/e/signin">
                Log in
              </CustomButton>
            )}
            {sidebarIcon && (
              <IconButton
                size={"md"}
                icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                aria-label={"Open Menu"}
                display={{ md: "none", base: "flex" }}
                justifyContent="center"
                alignItems={"center"}
                onClick={isOpen ? onClose : onOpen}
                ml="1"
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Topbar;
