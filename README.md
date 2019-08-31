# Interview Challenge

## Intro

This is a small React app that shows users info (`username`, `name` and `avatar`). The user list comes from a
Users API located at `/api/users`.

This Users API is paginated, which means that it doesn't return the list of all users, only returns up to `50` users
at the time, so you have to make multiple requests to retrieve them all. The API supports two pagination parameters:

- `limit`: The number of users we want the API to return, up to `50`.
- `offset`: A value that tells the API from which user index it should start returning them.

So if you make a request to `/api/users`, it will be equivalent to `/api/users?limit=50&offset=0`. To retrieve the next
batch of users, you would need to make a request to `/api/users?limit=50&offset=50`.

The API response looks like:

```json
{
    "items": [],
    "_total": 0,
    "_links": {
        "previous": {
            "href": null
        },
        "next": {
            "href": null
        }
    }
}
```

Where:

- `items`: An array of the user objects.
- `_total`: Gives you the total numbers of users. For instance, if there are `600` users and `limit` is `50`, `_total`
    will always return `600`.
- `_links`: An object that has the URL for the previous and next page. If it's the first page, `previous.href` will
    return `null`, if it's the last page, `next.href` will return `null`.

> You can see the API response in your browser by going to: `http://localhost:3000/api/users?pretty=true`.
>
> **Try playing around with it.**
>
> Note: `pretty=true` is just a parameter that tells the API to format the JSON response so it can be easily inspect on the browser.

## Challenge

The challenge to solve is to show all the users in the application, by loading them all when the page loads. You can check the file `Users.js` to inspect how `fetchUsers` is consumed there. Your changes will most likely only be contained inside `fetch-users.js`.

## How to start

1) Fork this repo, you can make it private in Github.

2) Clone your forked repo locally.

3) Run `npm install` on the repo root to install all project dependencies.

4) Run `npm start` to start the application. You can point your browser to `http://localhost:3000/`.

5) Familiarize with the FE app located in `src/` and start coding. Good luck!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
