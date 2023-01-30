import axios from "axios";
import { useState } from "react";

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
    <div>
      <h3> </h3>
      <section class="container">
        <div class="col">
          <h2>{props.title} </h2>
        </div>
        <div class="col">
          <h3> {props.showVotes && props.votes} </h3>
          {props.showButton && (
            <button type="button" onClick={handleVotesCount}>
              ⬆️
            </button>
          )}{" "}
        </div>
      </section>
      <section>
        <div>{descriptionDisplay && props.description}</div>
        <br></br>
        <button onClick={() => setdescriptionDisplay(!descriptionDisplay)}>
          {descriptionDisplay === true ? "Hide Description" : "Learn More"}
        </button>
      </section>
    </div>
  );
};

export default Package;
