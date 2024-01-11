import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import VehicleData from "../components/VehicleData";

const HomeScreen = () => {
  return (
    <Box>
      <Heading px={10} pt={5}>
        Vehicles
      </Heading>
      <VehicleData />
    </Box>
  );
};

export default HomeScreen;
