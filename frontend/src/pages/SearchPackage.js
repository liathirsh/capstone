import axios from "axios";
import { useState, useEffect } from "react";

import { SearchForm } from "../components/SearchForm";

const API_URL = "https://libraries.io/api/pypi";
const API_KEY = process.env.REACT_APP_API_KEY;

export function SearchPackage() {
  const [packageName, setPackageName] = useState("");
  const [APIPackageData, setAPIPackageData] = useState({
    name: "",
    rank: "",
    stars: "",
    homepage: "",
  });

  console.log(API_KEY);

  const getData = (packageName) => {
    axios
      .get(`${API_URL}/${packageName.title}?api_key=${API_KEY}`)
      .then((response) => {
        setAPIPackageData({
          name: response.data.name,
          rank: response.data.rank,
          stars: response.data.stars,
          homepage: response.data.homepage,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to retrieve data");
      });
  };

  return (
    <div>
      <h1> Search for a Package from Libraries.io</h1>
      <h3 class="text-muted"> Type in a package for more information </h3>
      <br></br>
      <SearchForm setPackageName={getData} />
      <br></br>
      <h3 class="text-primary">
        {" "}
        <strong>Name: </strong>
        {APIPackageData.name}
      </h3>
      <br></br>
      <h3 class="text-info">
        {" "}
        <strong>Rank: </strong> {APIPackageData.rank}
      </h3>
      <br></br>
      <h3 class="text-info">
        {" "}
        <strong>Stars: </strong>
        {APIPackageData.stars}
      </h3>
      <br></br>
      <h3 class="text-info">
        {" "}
        <strong>Homepage: </strong>
        {APIPackageData.homepage}
      </h3>
      <br></br>
    </div>
  );
}

export default SearchPackage;
