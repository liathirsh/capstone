const Category = (props) => {
  const categories = props.categories;

  const returnedCategories = categories.map((category) => {
    return (
      <div class="container" key={category.id}>
        <li
          class="card border-primary mb-3 align-items-center"
          onClick={() => props.onPackageClicked(category.id)}
        >
          <div class="d-flex w-200 justify-content-between">
            <h1 class="mb-1">{category.title}</h1>

            {/* <small class="text-muted">{category.description}</small> */}
          </div>
        </li>
      </div>
    );
  });
  return (
    <div>
      <h1> Categories</h1>
      <medium class="text-muted">Click on a category to learn more </medium>

      <ul class="list-group"> {returnedCategories} </ul>
    </div>
  );
};

export default Category;
