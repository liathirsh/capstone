import Package from "./Package";

const PackageList = (props) => {
  console.log(props);
  const packages = props.packages;

  return (
    <div>
      {packages.map((pythonPackage, id) => (
        <Package
          id={pythonPackage.id}
          title={pythonPackage.title}
          votes={pythonPackage.likes}
          description={pythonPackage.description}
          key={id}
          onVotes={props.onVotes}
        />
      ))}
    </div>
  );
};

export default PackageList;
