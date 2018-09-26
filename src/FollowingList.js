import React from "react";

const FollowingList = props => {
  return (
    <React.Fragment>
      <h2>My followers</h2>
      <ul>
        {props.followers.map((follower, i) => (
          <li key={`follower-${i}`}>
            <img src={follower.avatar_url} />
            <p>{follower.login}</p>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default FollowingList;
