import Package from "./Package";
import { useState, useEffect } from "react";

const PackageList = (props) => {
  const [showButton, setShowButton] = useState(true);
  const [showVotes, setShowVotes] = useState(false);
  const packages = props.packages;

  useEffect(() => {
    setShowButton(true);
    setShowVotes(false);
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
          showVotes={showVotes}
          setShowVotes={setShowVotes}
        />
      ))}
    </div>
  );
};

export default PackageList;
