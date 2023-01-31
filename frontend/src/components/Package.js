import axios from "axios";
import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

const PackageURL = "http://localhost:5000/packages";

const Package = (props) => {
  const [votesCount, setVotesCount] = useState(props.votes);
  const [descriptionDisplay, setdescriptionDisplay] = useState(false);

  const handleVotesCount = () => {
    axios
      .patch(`${PackageURL}/${props.id}`)
      .then(() => {
        setVotesCount(votesCount + 1);
        props.setShowVotes(true);
        props.setShowButton(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to vote");
      });
  };

  //create a function the displays only the first sentence with a ... and then learn more can be the button

  return (
    <div class="col">
      <div class="col-md">
        <section class="card">
          <div>
            <h2 class="card-header text-bg-primary mb-3 text-center">
              {props.title}{" "}
            </h2>
          </div>
          <div class="col">
            <h3 class="card-subtitle mb-2 text-muted text-center">
              {props.showVotes && props.votes}
            </h3>
            <div class="text-center">
              {props.showButton && (
                <button
                  type="button"
                  class="btn btn-primary btn-xl"
                  onClick={handleVotesCount}
                >
                  ⬆️
                </button>
              )}
            </div>
          </div>
          <div class="card-body text-secondary">
            {descriptionDisplay && props.description}
          </div>
          <button onClick={() => setdescriptionDisplay(!descriptionDisplay)}>
            {descriptionDisplay === true ? "Hide Description" : "Learn More"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Package;
