import React from "react";
import { useState, useEffect } from "react";

function CarData() {
  const [datas, setDatas] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const inputHandler = (e) => {
    setFilterInput(e.target.value);
    let filterArray = [];
    filterArray = datas?.filter((res) => {
      return res.Country.includes(filterInput.toUpperCase());
    });
    setFilteredData(filterArray);
    if (filterArray.length === 0) {
      setError("No Results Found");
      setFilterInput("");
    }
  };

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"
    )
      .then((res) => res.json())
      .then((data) => {
        setDatas(data.Results);
      });
  }, [inputHandler]);

  const vehicleData = (data) => {
    return data?.map((items) => (
      <>
           {" "}
        {items.VehicleTypes.length ? (
          items.VehicleTypes.map((type) => (
            <tr>
                     <td>{type.Name}</td>       <td>{items.Country}</td>       
              <td>{items.Mfr_Name}</td>       <td>{items.Mfr_CommonName}</td>   
            </tr>
          ))
        ) : (
          <tr>
                   <td></td>       <td>{items.Country}</td>       
            <td>{items.Mfr_Name}</td>       <td>{items.Mfr_CommonName}</td>   
          </tr>
        )}
         
      </>
    ));
  };

  return (
    <div className="App">
            <h1>Vehicle List</h1>     {" "}
      <input
        value={filterInput}
        onChange={inputHandler}
        placeholder="Enetr country Name"
      />
                 {" "}
      <table>
               {" "}
        <thead>
                 {" "}
          <tr>
                      <th>Vehicle Type</th>          <th>Country</th>         {" "}
            <th>Name</th>          <th>mfr_commonName</th>       {" "}
          </tr>
                         {" "}
        </thead>
               {" "}
        <tbody>
                 {" "}
          {filteredData.length && filterInput !== ""
            ? vehicleData(filteredData)
            : vehicleData(datas)}
                 {" "}
        </tbody>
             {" "}
      </table>
            {error ? <div>{error}</div> : ""}   {" "}
    </div>
  );
}

export default CarData;
