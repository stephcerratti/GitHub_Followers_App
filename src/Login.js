import React from "react";
import TextField from "./TextField.js";
import Button from "./Button.js";

//this is more of a presentational component, with no functionality aside from rendering html

const Login = props => (
  // we need to render the textfield component that is being imported into this login component,
  // and pass in all of the props it is expecting
  // values are normally stored on the state in react
  //we need to pass this
  <div>
    <h2>please enter your github username to login</h2>
    <TextField
      name="username"
      handleChange={props.handleChange}
      id="github-username"
      label="Username"
      value={props.username}
    />
    <TextField
      name="FirstName"
      handleChange={props.handleChange}
      id="user-firstName"
      label="Your First Name"
      value={props.FirstName}
    />
    <Button value="Login" handleClick={props.handleLogin} />
  </div>
);
//we will store the login / user information in our state
export default Login;
