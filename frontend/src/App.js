import "./App.css";
import Category from "./components/Category";
import PackageList from "./components/PackageList";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const URL = "http://localhost:5000/categories";
const PackageURL = "http://localhost:5000/packages";

const App = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [showVoteButton, setShowVoteButton] = useState(false);
  const [votesCount, setVotesCount] = useState([]);
  const [displayButton, setDisplayButton] = useState(false);
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
      });
  };

  const handleVotesCount = (id) => {
    axios
      .patch(`${PackageURL}/${id}`)
      .then(() => {
        setVotesCount(votesCount + 1);
        console.log(votesCount);
        setDisplayButton(!displayButton);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to vote");
      });
  };

  const hideButtons = () => {
    setShowVoteButton(!showVoteButton);
  };

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
        <PackageList packages={packageData} onVotes={handleVotesCount} />
        <p> {votesCount} </p>
      </section>
    </div>
  );
};

export default App;
