import React from "react";

//this is a functional component - takes in props but does not hold any state.
//This way, we can resue this text field component throguhout the application.
// this functional component is expecting a bunch of variables - value, handleChange, label, id, and name
const TextField = props => {
  // the props this functionali component is expecting:
  const { value, handleChange, label, id, name } = props;
  return (
    <React.Fragment>
      <label for={id}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        name={name}
        id={id}
      />
    </React.Fragment>
  );
};

export default TextField;
