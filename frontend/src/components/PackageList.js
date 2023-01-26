import Package from "./Package";

const PackageList = (props) => {
  console.log(props);
  const packages = props.packages;

  console.log(packages);

  return (
    <div>
      {packages.map((pythonPackage, id) => (
        <Package
          id={pythonPackage.id}
          title={pythonPackage.title}
          votes={pythonPackage.likes}
          description={pythonPackage.message}
          key={id}
        />
      ))}
    </div>
  );
};

export default PackageList;
