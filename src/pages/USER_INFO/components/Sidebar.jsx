import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { NavLink } from "react-router-dom";

import { getLocalUser } from "../../../helper/auth";

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const LinkItems = [
    {
      name: "Profile",
      icon: CgProfile,
      link: `/profile/${getLocalUser()?._id}`,
    },
    {
      name: "Orders",
      icon: MdOutlineDeliveryDining,
      link: `/profile/order/${getLocalUser()?._id}`,
    },
    {
      name: "Update password",
      icon: RiLockPasswordFill,
      link: `/profile/update-password/${getLocalUser()?._id}`,
    },
  ];
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Button mr={5} as={NavLink} to="/">
            <BiArrowBack />
          </Button>
          Misti
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link?.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: useColorModeValue("#eef2f9", "gray.800"),
        color: useColorModeValue("black", "white"),
      }}
      as={NavLink}
      to={link}
      style={({ isActive }) =>
        isActive
          ? { backgroundColor: useColorModeValue("#e4edf9", "#2d3847") }
          : undefined
      }
      {...rest}
    >
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: useColorModeValue("black", "white"),
        }}
        as={icon}
      />

      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Misti
      </Text>
    </Flex>
  );
};
