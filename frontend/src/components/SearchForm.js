import { useState } from "react";
import PropTypes from "prop-types";

export function SearchForm(props) {
  const [formFields, setFormFields] = useState({
    title: "",
  });
  const [error, setError] = useState(false);

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const FormSubmit = (event) => {
    event.preventDefault();
    props.setPackageName({
      title: formFields.title,
    });
    setFormFields({
      title: "",
    });
  };

  const validateInput = () => {
    setError(formFields.title.length === 0 || formFields.title.length > 40);
  };

  return (
    <form onSubmit={FormSubmit}>
      <div>
        <label class="text-primary" htmlFor="Title">
          <h1>
            <strong>Title: </strong>{" "}
          </h1>
        </label>
        {error ? <label className="error_text">Check Length</label> : " "}
        <input
          name="Title"
          className={
            formFields.title.length === 0 || formFields.title.length > 40
              ? "max_length_input"
              : ""
          }
          onChange={onTitleChange}
          onInput={validateInput}
          value={formFields.title}
        />
      </div>
    </form>
  );
}
SearchForm.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
};

export default SearchForm;
