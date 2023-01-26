import axios from "axios";
import { useState } from "react";

const PackageURL = "http://localhost:5000/packages";

const Package = (props) => {
  const [votesCount, setVotesCount] = useState(props.votes);

  // Right now, there is no way to verify 1 person 1 vote.
  // This needs to be fixed

  const handleVotesCount = () => {
    axios
      .patch(`${PackageURL}/${props.package_id}`)
      .then(() => {
        setVotesCount(votesCount + 1);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to vote");
      });
  };

  //show the number of total votes after clicking

  return (
    <div>
      <h2> {props.title}</h2>
      <p> {props.description} </p>
      <button type="button" onClick={handleVotesCount}>
        {" "}
        ⬆️{" "}
      </button>
    </div>
  );
};

export default Package;
