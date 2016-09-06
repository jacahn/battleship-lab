# Battleship lab

Builds off the [getting started](http://socket.io/get-started/chat/) example chat app from [Socket.io](http://socket.io/)

## Local Setup

To get the app working locally, first clone and install all dependencies:

```bash
$ git clone git@github.com:ga-wdi-exercises/mean-socket-chat.git
$ cd mean-socket-chat
$ npm install
```

Then, make sure you have `mongod` running:

```bash
# in another bash tab
$ mongod
```

To start the app run:

```bash
$ nodemon
```

Then you should be able to view the application by navigating to `localhost:3000` in your browser

> **Note**: If you do not have `nodemon` installed already, run `$ npm install -g nodemon` first.
