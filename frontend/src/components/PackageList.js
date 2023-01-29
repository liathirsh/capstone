import Package from "./Package";
import { useState, useEffect } from "react";

const PackageList = (props) => {
  const [showButton, setShowButton] = useState(true);

  const packages = props.packages;

  useEffect(() => {
    setShowButton(true);
  }, [packages]);

  return (
    <div>
      {packages.map((pythonPackage, id) => (
        <Package
          id={pythonPackage.id}
          title={pythonPackage.title}
          votes={pythonPackage.votes}
          description={pythonPackage.description}
          key={id}
          showButton={showButton}
          setShowButton={setShowButton}
          // onVoting={props.onVoting}
        />
      ))}
    </div>
  );
};

export default PackageList;
