import axios from "axios";
import { useState, useEffect } from "react";

const PackageURL = "http://localhost:5000/packages";

export function Leaderboard() {
  const [allPackageData, setAllPackageData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(true);

  useEffect(() => {
    axios
      .get(`${PackageURL}/leaderboard`)
      .then((response) => {
        const allPackages = response.data.map((eachPackage) => {
          return {
            category_title: eachPackage.category_title,
            votes: eachPackage.votes,
            package_name: eachPackage.package_name,
          };
        });
        setAllPackageData(allPackages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const returnLeaderBoard = allPackageData.map((item) => {
    return (
      <tr class="table-primary">
        <th scope="row">{item.package_name}</th>
        <td>{item.votes}</td>
        <td> {item.category_title}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1> Leaderboard</h1>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Package Name</th>
            <th scope="col">Number of Votes</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>{returnLeaderBoard}</tbody>
      </table>
    </div>
  );
}
