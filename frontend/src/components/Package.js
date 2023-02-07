import axios from "axios";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const PackageURL = "http://localhost:5000/packages";
const VotesURL = "http://localhost:5000/votes";

const Package = (props) => {
  const { onePackage } = useParams();
  const [votesCount, setVotesCount] = useState(props.votes);
  const [descriptionDisplay, setdescriptionDisplay] = useState(false);

  const handleVotesCount = () => {
    axios
      .patch(`${PackageURL}/${props.id}`)
      .then(() => {
        setVotesCount(votesCount + 1);
        props.setShowVotes(true);
        props.setShowButton(false);
        props.setShowLeadershipBoard(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to vote");
      });
  };

  // bug where votescount only shows up after being refreshed
  // packages should always show up in the same order
  //create a function the displays only the first sentence with a ... and then learn more can be the button

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
          </button>
        </section>
      </div>
    </div>
  );
};

export default Package;
