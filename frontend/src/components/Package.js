const Package = (props) => {
  // Right now, there is no way to verify 1 person 1 vote.
  //You should only vote once per category.
  //Once a button is triggered, you shouldn't allowed to vote at all
  // This needs to be fixed
  //show the number of total votes after clicking
  //reset vote (takes 1 vote away and adds another vote)

  console.log(props);

  return (
    <div>
      <section>
        <h2> {props.title} </h2>
        <button
          type="button"
          onClick={() => props.onVotes(props.id)}
          // disabled={displayButton}
        >
          ⬆️
        </button>
      </section>

      <p> {props.description}</p>
    </div>
  );
};

export default Package;
