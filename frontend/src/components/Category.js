import { useState } from "react";

export function Category(props) {
  const [descriptionDisplay, setdescriptionDisplay] = useState(false);
  return (
    <div
      className="col-4 card border-primary align-items-center d-flex w-200 justify-content-between"
      key={props.id}
      onClick={() => props.OnCategoryClicked(props.id)}
    >
      <h1 className="m-1">{props.title}</h1>
      <div class="card-body text-secondary">
        {descriptionDisplay && props.description}
      </div>
      <button
        class="btn btn-outline-primary"
        onClick={() => setdescriptionDisplay(!descriptionDisplay)}
      >
        {descriptionDisplay === true ? "Hide Description" : "Learn More"}
      </button>
    </div>
  );
}

export default Category;
