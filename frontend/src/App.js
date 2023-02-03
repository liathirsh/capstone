import "./App.css";

import Category from "./components/Category";
import PackageList from "./components/PackageList";
import LeadershipBoard from "./components/LeadershipBoard";
import { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/journal/bootstrap.min.css";

const URL = "http://localhost:5000/categories";
const PackageURL = "http://localhost:5000/packages";

const App = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  //const [displayButton, setDisplayButton] = useState(false);
  const [allPackageData, setAllPackageData] = useState({});
  const [showLeadershipBoard, setShowLeadershipBoard] = useState(false);
  const [sortedPackages, setSortedPackages] = useState(packageData);
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
        setAllPackageData(
          [...allPackages].sort((a, b) => {
            if (a.votes < b.votes) {
              return 1;
            } else if (b.votes < a.votes) {
              return -1;
            } else {
              return 0;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
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
        setPackageData(
          //Sorts the data so it renders alphabetically
          [...packagesDisplay].sort((a, b) => {
            // if return value is negative, a comes first
            const atitle = a.title.toLowerCase();
            const btitle = b.title.toLowerCase();
            if (atitle < btitle) {
              return -1;
            } else if (btitle < atitle) {
              return 1;
            } else {
              return 0;
            }
          })
        );
        setSelectedCategory(category);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to load packages");
      });
  };

  // write a function that takes all of the votes and sees who has the most
  // this gets sent to the leadership board and that handles rendering of votes
  // sort by category, sort by package etc.

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Popular Python Packages
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  Home
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  LeadershipBoard
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">
                    Home
                  </a>
                  <a class="dropdown-item" href="#">
                    About
                  </a>
                  <a class="dropdown-item" href="#">
                    Leadership Board
                  </a>
                  <div class="dropdown-divider"></div>
                </div>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <span class="border border-primary">
        <section class="container">
          <Category
            categories={categoryData}
            onCategoryClicked={handleCategoryClicked}
          />
          <br></br>
          <br></br>
          <section>
            <PackageList
              packages={packageData}
              showLeadershipBoard={showLeadershipBoard}
              setShowLeadershipBoard={setShowLeadershipBoard}
            />
            {showLeadershipBoard && (
              <LeadershipBoard
                packageData={allPackageData}

                //onLeadershipBoardClicked={getAllPackages}
              />
            )}
          </section>
        </section>
      </span>
    </div>
  );
};

export default App;
