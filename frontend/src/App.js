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
  //const [displayButton, setDisplayButton] = useState(false);
  //const [allPackageData, setAllPackageData] = useState({});
  const [showLeadershipBoard, setShowLeadershipBoard] = useState(false);
  const [leadershipBoardData, setLeadershipBoardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    title: "",
    description: "",
    id: null,
  });

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
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

  useEffect(() => {
    axios
      .get(PackageURL)
      .then((response) => {
        const allPackages = response.data.map((eachPackage) => {
          return {
            id: eachPackage.id,
            title: eachPackage.title,
            votes: eachPackage.votes,
            categoryId: eachPackage.category_id,
          };
        });
        setLeadershipBoardData(allPackages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [leadershipBoardData]);

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

  const topThreePackages = () => {
    setLeadershipBoardData(
      [...leadershipBoardData].sort((a, b) => {
        if (a.votes < b.votes) {
          return -1;
        } else if (b.votes < a.votes) {
          return 1;
        } else {
          return 0;
        }
      })
    );
    setLeadershipBoardData(leadershipBoardData.slice(0, 3));
  };

  // write a function that takes all of the votes and sees who has the most
  // this gets sent to the leadership board and that handles rendering of votes
  // sort by category, sort by package etc.

  return (
    <div>
      <section class="container marketing">
        <section class="col p-4 m-1 bg-info">
          <h1> Popular Python Packages</h1>
        </section>
        <section class="row">
          <section class="col-8 p-4 m-1 bg-info">
            <h2> About this site </h2>
          </section>
          <section class="col p-4 m-1 bg-info">
            <p> More Information </p>
          </section>
        </section>
      </section>
      <span class="border border-primary">
        <section class="container">
          <Category
            categories={categoryData}
            onPackageClicked={handleCategoryClicked}
          />
          <section>
            <PackageList
              packages={packageData}
              showLeadershipBoard={topThreePackages}
            />
          </section>
        </section>
        {/* <h2 onClick={() => setShowLeadershipBoard(!showLeadershipBoard)}>
        {" "}
        Click here when you're done voting
        {showLeadershipBoard === true ? { topThreePackages } : "Learn More"}
      </h2>
      <LeadershipBoard leadershipData={leadershipBoardData}></LeadershipBoard> */}
      </span>
    </div>
  );
};

export default App;
