import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Input,
  Flex,
} from "@chakra-ui/react";

const VehicleData = () => {
  const [motors, setMotors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMotors = async () => {
      const { data } = await axios.get(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"
      );
      setMotors(data.Results);
      setFilteredData(data.Results);
    };
    fetchMotors();
  }, []);

  useEffect(() => {
    if (motors.length > 0) {
      const filtered = motors.filter((item) => {
        return item.Country.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredData(filtered);
    }
  }, [searchTerm]);

  return (
    <Box p={10}>
      <Flex pb={5}>
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>
      <TableContainer>
        <Table variant="striped" size="md" colorScheme="green">
          <TableCaption>Vehicle detail with Country and type</TableCaption>
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Brand Name</Th>
              <Th>Vehicle Types</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{item.Country}</Td>
                  <Td>{item.Mfr_CommonName}</Td>
                  <Td>
                    {item.VehicleTypes.map((v, i) =>
                      v.IsPrimary ? <span key={i + 1}> {v.Name},</span> : null
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VehicleData;
