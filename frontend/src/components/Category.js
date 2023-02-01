const Category = (props) => {
  const categories = props.categories;

  const returnedCategories = categories.map((category) => {
    return (
      <div className="container" key={category.id}>
        <li
          className="card border-primary mb-3 align-items-center"
          onClick={() => props.onCategoryClicked(category.id)}
        >
          <div className="d-flex w-200 justify-content-between">
            <h1 className="mb-3">{category.title}</h1>

            {/* <small class="text-muted">{category.description}</small> */}
          </div>
        </li>
      </div>
    );
  });
  return (
    <div>
      <h1> Categories</h1>
      <medium className="text-muted">Click on a category to learn more </medium>

      <ul className="list-group"> {returnedCategories} </ul>
    </div>
  );
};

export default Category;
