import Category from "./Category";
import { useState } from "react";

export function CategoryList(props) {
  const categories = props.categories;

  return (
    <div class="container">
      <div class="row">
        {categories.map((category, id) => (
          <Category
            id={category.id}
            title={category.title}
            description={category.description}
            OnCategoryClicked={props.onCategoryClicked}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
