# Mudsdale

A demo for something cool.

See in http://shrouded-oasis-20966.herokuapp.com/ .

## Assumptions
* handle invalid input on server side
* sync all clients in realtime
* no concern for server-side rendering
* no concern for the top 20 sorting performance
* only sort topics by votes, no concern for the stability
* no concern for code optimization, e.g. minification
* use http
* e2e test
* lint
* no concern for CI
* management by yarn scripts

## Stack
* Express + React + Redux + Cycle.js
* e2e test by testcafe

## Key Files
### Server
All routes are in `/server/index.js`.

### Client
The entrypoint of the React app is in `/client/index.js`.
The API requests related codes are in `/client/cycles.js`

### Management
#### install dependencies
`yarn install`

#### start the server
`yarn run start`

#### build the client
`yarn run build`

### e2e test
Build the client first and start the server. Then
`yarn run test`

or run the test in an opened Chrome to see it in action
`yarn run test:open`
