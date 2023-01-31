const Category = (props) => {
  const categories = props.categories;

  const returnedCategories = categories.map((category) => {
    return (
      <div class="container" key={category.id}>
        <div class="circle-singleline">
          <li
            class="circle-singleline"
            onClick={() => props.onPackageClicked(category.id)}
          >
            {" "}
            {category.title}{" "}
          </li>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h1> Categories</h1>
      <ul> {returnedCategories} </ul>
    </div>
  );
};

export default Category;
