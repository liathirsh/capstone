import { useState } from "react";

export function Category(props) {
  console.log(props);
  const [descriptionDisplay, setdescriptionDisplay] = useState(false);
  return (
    <div className="col" key={props.id}>
      <li
        className="card border-primary mb-3 align-items-center"
        onClick={() => props.OnCategoryClicked(props.id)}
      >
        <div className="d-flex w-200 justify-content-between">
          <h1 className="mb-3">{props.title}</h1>

          {/* <small class="text-muted">{category.description}</small> */}
        </div>
      </li>
    </div>
  );
}

export default Category;
