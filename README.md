## Overview

This React App is a exercise app from one interview. The requirement is [here](./exercise-requirement/designs/Functional Specification.pdf).
It can fetch rocket launchs data from Data Server, filter and display launchs. It try to meet all the requirements which from 'exercise-requirement' folder.

![Main Page](./exercise-requirement/designs/Design.png)

To run this app, you need to start API server and this App.

You can get more and updated information from [spacexpatchlist](https://spacexpatchlist.space) if you are interested on rocket launchs.

## API Server

Need to start API server that provides data.

To start the server, use a separate terminal window with the following:

1. Change into the `server` directory and run `npm install`
2. Start the server via `npm run start`

The following 2 endpoints will now be available.

| Endpoint                             | Description                       |
| ------------------------------------ | --------------------------------- |
| http://localhost:8001/launches       | returns an array of launch data   |
| http://localhost:8001/launchpads     | returns launchpads                |

## Run this App
- `npm install`
- `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


