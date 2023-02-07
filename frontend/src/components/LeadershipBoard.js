export function LeadershipBoard(props) {
  const returnLeadershipBoard = props.packageData.map((item) => {
    return (
      <tr class="table-primary">
        <th scope="row">{item.title}</th>
        <td>{item.votes}</td>
        <td></td>
      </tr>
    );
  });

  return (
    <div>
      <h1> LeadershipBoard</h1>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Package Name</th>
            <th scope="col">Number of Votes</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>{returnLeadershipBoard}</tbody>
      </table>
    </div>
  );
}
