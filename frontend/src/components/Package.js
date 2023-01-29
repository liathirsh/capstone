import axios from "axios";
import { useState } from "react";

const PackageURL = "http://localhost:5000/packages";

const Package = (props) => {
  const [votesCount, setVotesCount] = useState(props.votes);
  const [displayButton, setDisplayButton] = useState(false);
  console.log(props);

  // Right now, there is no way to verify 1 person 1 vote.
  //You should only vote once per category.
  //Once a button is triggered, you shouldn't allowed to vote at all
  // This needs to be fixed
  //show the number of total votes after clicking
  //reset vote (takes 1 vote away and adds another vote)

  const handleVotesCount = () => {
    axios
      .patch(`${PackageURL}/${props.id}`)
      .then(() => {
        setVotesCount(votesCount + 1);
        setDisplayButton(!displayButton);
        props.setShowButton(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to vote");
      });
  };

  return (
    <div>
      <section>
        <h2> {props.title} </h2>
        {props.showButton && (
          <button
            type="button"
            onClick={handleVotesCount}
            disabled={displayButton}
          >
            ⬆️
          </button>
        )}{" "}
      </section>
      <p> {props.description}</p>
    </div>
  );
};

export default Package;
