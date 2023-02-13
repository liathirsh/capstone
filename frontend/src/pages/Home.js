import { Link } from "react-router-dom";
import { Category } from "../components/Category";
import { CategoryList } from "../components/CategoryList";
import { PackageList } from "../components/PackageList";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootswatch/dist/journal/bootstrap.min.css";
import { SearchPackage } from "./SearchPackage";

const URL = "http://localhost:5000/categories";

export function Home() {
  const [categoryData, setCategoryData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [showOnePackagePage, setShowOnePackagePage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
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
          [...packagesDisplay].sort((a, b) => {
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

  return (
    <div>
      <span class="border border-primary">
        <section class="container">
          <div class="row">
            <h1> Categories </h1>
            <h6 class="text-muted">
              {" "}
              Click on a category to see the packages and vote{" "}
            </h6>
            <h1> </h1>
            <CategoryList
              categories={categoryData}
              onCategoryClicked={handleCategoryClicked}
            />
          </div>
          <br></br>
          <br></br>
          <section>
            <PackageList packages={packageData} />
          </section>
        </section>
      </span>
    </div>
  );
}
