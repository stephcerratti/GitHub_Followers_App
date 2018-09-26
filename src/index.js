import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./Login.js";
import Profile from "./Profile.js";
import Button from "./Button.js";

import "./styles.css";

//all of the state will be handled in the app component
class App extends Component {
  // when we mount the app component, it will run the constructor. Super() gives us access to "this"
  constructor() {
    super();
    //we initialize the state on the constructor (state always stores an object):
    this.state = {
      //the username key will hold the value of name
      //we will store the github profile information in an object
      loggedin: false,
      username: "",
      FirstName: "",
      profile: {},
      followers: []
    };
    //
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  //when a user logs in, log thier username to localstorage

  // this function is taking in an event as an argument, and will update the value with the value of the name
  // we need to first pass this function to the login, to then get it to the text field
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLogin() {
    //pass in where the username is stored, which is on the state
    //once the username is passed in using the getGithubUser function, we
    //parse the data to json, and then console log the data.
    // next we need to get the data down to the button
    this.getGithubUser(this.state.username)
      .then(res => res.json())
      //instead of just storing the data in the console, we are storing it as a new object
      //.then(data => console.log(data));
      //we made the request in a custom method in our app
      .then(data => this.setState({ profile: data, loggedin: true }));
  }

  handleLogOut() {
    this.setState({ loggedin: false, profile: {}, username: "" });
    //when a user logs out, remove the username from local storage
    //set the loacl storage logged in value to false.
  }

  //below is our API request, which is pulling the username value from the api
  getGithubUser(username) {
    return fetch(`https://api.github.com/users/${username}`);
  }

  getGithubFollowing(url) {
    return fetch(url);
  }

  //passing in the previous props, and the previous states before beng uodated
  //we could not have made this request when the component first mounted, because we did not know the user who's
  // followers we were checking
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState, this.state);
    if (prevState.loggedin !== this.state.loggedin) {
      if (this.state.loggedin) {
        this.getGithubFollowing(this.state.profile.followers_url)
          .then(res => res.json())
          .then(data => this.setState({ followers: data }));
      }
    }
  }

  componentDidMount() {
    //check if the username is stored in local storage and if logged in true is in local storage
    //if the username is in the local storage, fetch the data from the github api and set local
    // if (this.state.username)
  }

  //render will render after the mounting process - will render all the html
  //handleChange = this.handleChange because we are referencing it in THIS component
  // we need to BIND the handleChange function, so it knows which correct THIS component to use (the "app's" this)
  render() {
    return (
      <div className="App">
        <h1>Github Developer</h1>
        {this.state.loggedin ? (
          //using a spread operator to take all the keys from the profile object, and passing
          //them as individual props
          <Profile
            {...this.state.profile}
            followers={this.state.followers}
            handleLogOut={this.handleLogOut}
          />
        ) : (
          <Login
            handleChange={this.handleChange}
            handleLogin={this.handleLogin}
            username={this.state.username}
            firstName={this.state.firstName}
          />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
