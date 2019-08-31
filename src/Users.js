import React, { Fragment} from 'react';
import './Users.css';
import { fetchUsers } from './fetch-users';
import User from './User';

const Users = () => {
  const [ users, setUsers ] = React.useState(null);
  const [ totalUsers, setTotalUsers ] = React.useState(null);

  React.useEffect(() => {
    // TODO: fetchUser should fetch all users from the paginated API and return the full list of 1000 users
    fetchUsers()
      .then(data => {
        setUsers(data.items);
        setTotalUsers(data._total);
      });
  }, []);

  if (!users) {
    return 'Loading...';
  };

  return (
    <Fragment>
      <h2>Users</h2>
      <h3>Total Users {totalUsers}</h3>
      <div className="users-wrapper">
        {users.map((user) => <User user={user} key={user.id}/>)}
      </div>
    </Fragment>
  )
};

export default Users;
