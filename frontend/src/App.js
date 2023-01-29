import "./App.css";
import Category from "./components/Category";
import PackageList from "./components/PackageList";
import LeadershipBoard from "./components/LeadershipBoard";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const URL = "http://localhost:5000/categories";
const PackageURL = "http://localhost:5000/packages";

const App = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [votesCount, setVotesCount] = useState(packageData.votes);
  const [displayButton, setDisplayButton] = useState(false);
  const [showLeadershipBoard, setShowLeadershipBoard] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    title: "",
    description: "",
    id: null,
  });

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response);
        const allCategories = response.data.map((category) => {
          return {
            id: category.id,
            title: category.title,
            description: category.description,
          };
        });
        setCategoryData(allCategories);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to retrieve categories");
      });
  }, []);

  const handleCategoryClicked = (id) => {
    const category = categoryData.find((category) => {
      return id === category.id;
    });
    if (!category) {
      return;
    }
    axios
      .get(`${URL}/${category.id}/packages`)
      .then((response) => {
        const packagesDisplay = response.data.map((eachPackage) => {
          console.log(eachPackage.votes);
          return {
            id: eachPackage.id,
            title: eachPackage.title,
            description: eachPackage.description,
            votes: eachPackage.votes,
          };
        });
        setPackageData(packagesDisplay);
        setSelectedCategory(category);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to load packages");
      });
  };

  // const handleVotesCount = (id) => {
  //   axios
  //     .patch(`${PackageURL}/${id}`)
  //     .then(() => {
  //       setVotesCount(votesCount + 1);
  //       setDisplayButton(!displayButton);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("Unable to vote");
  //     });
  // };

  const hideButtons = () => {
    setDisplayButton(true);
  };

  //const packageClicked = () => {

  return (
    <div>
      <section>
        <h1> Popular Python Packages</h1>
        <h2> About this site </h2>
        <p> More Information </p>
      </section>
      <section>
        <Category
          categories={categoryData}
          onPackageClicked={handleCategoryClicked}
        />
        <PackageList packages={packageData} />
      </section>
      {showLeadershipBoard && <h1> Leadership Board </h1>}
    </div>
  );
};

export default App;
