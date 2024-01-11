import { Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [vehicle, setVehicle] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchVehicle = async () => {
      const { data } = await axios.get(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"
      );
      setVehicle(data.Results);
      setData(data.Results);
    };
    fetchVehicle();
  }, []);

  const handleChange = (searchVal) => {
    setSearch(searchVal);

    if (search !== "") {
      const filtered = vehicle.filter((item) => {
        return item.Country.toLowerCase().includes(search.toLowerCase);
      });
      setData(filtered);
    } else {
      setData(vehicle);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleChange(e)}
      />
      {search.length > 1
        ? data.map((item, index) => {
            return (
              <div
                style={{ padding: "10px", border: "1px solid red" }}
                key={index}
              >
                <p style={{ fontWeight: "bold" }}>{item.Country}</p>
                <p>{item.Mfr_CommonName}</p>
                <p>
                  {item.VehicleTypes.map((v, i) => (
                    <span key={i + 1}>{v.Name},</span>
                  ))}
                </p>
              </div>
            );
          })
        : vehicle.map((item, index) => {
            return (
              <div
                style={{ padding: "10px", border: "1px solid red" }}
                key={index}
              >
                <p style={{ fontWeight: "bold" }}>{item.Country}</p>
                <p>{item.Mfr_CommonName}</p>
                <p>
                  {item.VehicleTypes.map((v, i) => (
                    <span key={i + 1}>{v.Name},</span>
                  ))}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default Test;
