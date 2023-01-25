const Category = (props) => {
  const returnedCategories = props.categories.map((category) => {
    return (
      <div key={category.id}>
        <li onClick={() => props.onPackageClicked(category.id)}>
          {" "}
          {category.title}{" "}
        </li>
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
