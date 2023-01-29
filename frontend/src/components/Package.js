import axios from "axios";
import { useState } from "react";

const PackageURL = "http://localhost:5000/packages";

const Package = (props) => {
  const [votesCount, setVotesCount] = useState(props.votes);
  //const [votesDisplay, setVotesDisplay] = useState(false);

  //show the number of total votes after clicking
  //reset vote (takes 1 vote away and adds another vote)

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
    <div>
      <h3> </h3>
      <section>
        <h2>{props.title} </h2>
        {props.showButton && (
          <button type="button" onClick={handleVotesCount}>
            ⬆️
          </button>
        )}{" "}
      </section>
      <h3> {props.showVotes && props.votes} </h3>
      <p> {props.description}</p>
    </div>
  );
};

export default Package;
