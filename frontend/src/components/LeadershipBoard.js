const LeadershipBoard = (props) => {
  console.log("leadershipboard", props);
  const returnLeadershipBoard = props.packageData.map((item) => {
    return (
      <div key={item.id}>
        <li>
          <h1>{item.title}</h1>
        </li>
      </div>
    );
  });

  return (
    <div>
      <h1> LeadershipBoard</h1>
      <ul> {returnLeadershipBoard}</ul>
    </div>
  );
};

export default LeadershipBoard;
