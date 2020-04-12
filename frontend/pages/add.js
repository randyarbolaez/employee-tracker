import React from "react";
import AddEmployee from "../components/AddEmployee";
import PleaseSignIn from "../components/PleaseSignIn";

const addEmployee = () => {
  return (
    <div>
      <PleaseSignIn>
        <AddEmployee />
      </PleaseSignIn>
    </div>
  );
};

export default addEmployee;
