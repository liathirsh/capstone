import axios from "axios";
import { useState } from "react";

const PackageURL = "http://localhost:5000/packages";
// const VotesURL = "http://localhost:5000/votes";

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

  return (
    <div class="col">
      <div class="col-md">
        <section class="card border-primary mb-3">
          <div>
            <h2 class="card-header text-white bg-primary mb-3 text-center text-uppercase fw-bold">
              {props.title}{" "}
            </h2>
          </div>
          <div class="col">
            <h3 class="card-subtitle mb-2 text-muted text-center">
              {props.showVotes && votesCount}
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
          <button
            class="btn btn-outline-primary"
            onClick={() => setdescriptionDisplay(!descriptionDisplay)}
          >
            {descriptionDisplay === true ? "Hide Description" : "Learn More"}
          </button>{" "}
        </section>
      </div>
    </div>
  );
};

export default Package;
