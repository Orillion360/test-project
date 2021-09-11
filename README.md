# Splinterlands Developer Evaluation Project

## Setup

1. Fork and clone the GitHub repo
2. Run `npm install`
3. Run `node index.js` to run the application

If installed and run successfully, the application will log to the console a live stream of the Hive blockchain transactions related to the Splinterlands game.

## Project

The evaluation project is to build a web application (preferrably using the [Express web framework for NodeJS](https://www.npmjs.com/package/express)) consisting of static html, css, and js files which uses API calls to pull data from the server about the stream of Splinterlands blockchain transactions it receives. The requested web application should do the following things:

1. Show a list of each type of operation (ex. "sm_find_match") and the total number of times that operation was seen in the stream
2. Show a list of each player account name that submitted one or more operations and the total number of operations submitted by each player
3. Provide the ability to refresh the list of operations and player accounts mentioned above
4. Provide the ability to search for a specific player and view a detailed list of the operations submitted by that player, including the type of operation, timestamp, block number, and transaction ID
5. Anything else you want to add!
 

# Solution

## Setup
1. Run `npm install`
2. Run `npm start`

## Project

1. [index.html](http://localhost:3000/index.html) Under `Operations`.
2. [index.html](http://localhost:3000/index.html) Under `Players`.
3. [index.html](http://localhost:3000/index.html) Press the `Refresh` button under the respective list names.
4. [index.html](http://localhost:3000/index.html) Has a search bar on top where you can fill in a player id.
5. Added a live-update checkbox under each list which listens on a websocket to update that particular list.

_Notes_:
I set the node engine to 9 or higher due to it requireing some features of ES6. (Map and getter/setter syntax).