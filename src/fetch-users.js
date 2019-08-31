const USER_API_ENDPOINT = '/api/users';

export const fetchUsers = () => {
  // Currently, this function only fetches a subset of all the users because the API only returns up to 50 users at a time
  // The API supports two pagination parameters: `limit` and `offset`
  // You can see the API response using this URL in your browser: http://localhost:3001/api/users?pretty=true
  // The CHALLENGE is to update this function to return a promise with the list of all users and the total number of users,
  // in the format:
  // { items: [], _total: 0 }
  // You can read README.md for more info
  return fetch(USER_API_ENDPOINT)
    .then(results => results.json())
};
