const express = require('express');
const { MAX_ITEMS_PER_PAGE, TOTAL_USERS } = require('./constants');
const { buildItemResponse, buildItemsResponse } = require('./utils/build-items-response');
const { createUser } = require('./utils/create-user');

const routes = express.Router();

// Randomly pick a number of users between 600 and 1000 each time the server starts
const totalUsers = Math.round(Math.random() * 400 + 600);
// Generate fake users
const users = [...Array(totalUsers + 1).keys()].slice(1).map((id) => createUser(id));

routes.route('/users')
  .get((req, res) => {
    const { limit = MAX_ITEMS_PER_PAGE, offset = 0, pretty = false } = req.query;

    if (offset > totalUsers) {
      res.status(400).send(`There are only ${totalUsers} users`);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(buildItemsResponse({
      items: users,
      limit: Math.min(parseInt(limit, 10), MAX_ITEMS_PER_PAGE),
      offset: parseInt(offset, 10),
      total: users.length,
      req,
      pretty
    }))
  });

routes.route('/users/:id')
  .get((req, res) => {
    const { pretty = false } = req.query;

    res.setHeader('Content-Type', 'application/json');
    res.send(buildItemResponse({
      item: users.find(({ id }) => id === parseInt(req.params.id, 10) ),
      req,
      pretty
    }));
  });

module.exports = {
  routes
};
