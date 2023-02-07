import { Link } from "react-router-dom";
import { Category } from "../components/Category";
import { PackageList } from "../components/PackageList";
import { LeadershipBoard } from "../components/LeadershipBoard";
import { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/journal/bootstrap.min.css";

const URL = "http://localhost:5000/categories";
const PackageURL = "http://localhost:5000/packages";

export function Home() {
  const [categoryData, setCategoryData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [allPackageData, setAllPackageData] = useState({});
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
      .get(`${PackageURL}/leadershipboard`)
      .then((response) => {
        const allPackages = response.data.map((eachPackage) => {
          return {
            id: eachPackage.id,
            title: eachPackage.title,
            votes: eachPackage.votes,
            categoryId: eachPackage.category_id,
          };
        });
        setAllPackageData(allPackages);
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
          </section>
        </section>
      </span>
    </div>
  );
}
