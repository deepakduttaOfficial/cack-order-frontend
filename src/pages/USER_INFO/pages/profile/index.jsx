import React from "react";
import Sidebar from "../../components/Sidebar";
import {
  Button,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Container,
  VStack,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EditInput from "./EditInput";
import ImageHander from "./ImageHander";
import { getLocalUser } from "../../../../helper/auth";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const user = getLocalUser();
  const [name, setName] = useState(user?.name);

  return (
    <Sidebar>
      <Container
        bgColor={useColorModeValue("white", "gray.800")}
        py={10}
        px={5}
      >
        <form>
          <VStack>
            <ImageHander />

            <EditInput
              label={"Name: "}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              loading={loading}
              setLoading={setLoading}
              values={name}
            />
            <EditInput label={"Email: "} editable={false} value={user?.email} />
          </VStack>
        </form>
      </Container>
    </Sidebar>
  );
};

export default Profile;
