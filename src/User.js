import React from 'react';

const User = ({ user: { id, username, firstName, lastName, avatar } }) => (
  <div className="user-wrapper">
    <img src={avatar} alt={username}/>
    <p className="username">{username} (ID: {id})</p>
    <p className="name">{firstName} { lastName}</p>
  </div>
);

export default User;
