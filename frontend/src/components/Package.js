import axios from "axios";
import { useState } from "react";

const PackageURL = "http://localhost:5000/packages";

const Package = (props) => {
  const [votesCount, setVotesCount] = useState(props.votes);
  const [displayButton, setDisplayButton] = useState(false);

  // Right now, there is no way to verify 1 person 1 vote.
  //You should only vote once per category.
  //Once a button is triggered, you shouldn't allowed to vote at all
  // This needs to be fixed

  const handleVotesCount = () => {
    axios
      .patch(`${PackageURL}/${props.id}`)
      .then(() => {
        setVotesCount(votesCount + 1);
        setDisplayButton(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to vote");
      });
  };

  //show the number of total votes after clicking

  return (
    <div>
      <section>
        <h2> {props.title}</h2>
      </section>
      <section>
        <h3> {props.description}</h3>
      </section>

      <button type="button" onClick={handleVotesCount} disabled={displayButton}>
        ⬆️
      </button>
    </div>
  );
};

export default Package;
