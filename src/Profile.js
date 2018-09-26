import React from "react";
import FollowingList from "./FollowingList.js";
import Button from "./Button.js";

const Profile = props => {
  return (
    <div className="profile">
      <h2>Hello {props.login}</h2>
      <img src={props.avatar_url} alt={`photo of ${props.login}`} />
      <FollowingList followers={props.followers} />
      <Button value="Log Out" handleClick={props.handleLogOut} />
    </div>
  );
};

export default Profile;
