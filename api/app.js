require('dotenv').config()
var express = require('express');
var path = require('path');
global.appRoot = path.resolve(__dirname);
var cookieParser = require('cookie-parser');

var spotifyAPIRouter = require("./routes/spotifyApi");
var youtubeAPIRouter = require("./routes/YoutubeApi");

var app = express();
app.use(express.static(path.join(__dirname, '/../frontend/build')));


const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ['Content-Disposition']
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors(corsOptions));


app.use("/spotifyApi", spotifyAPIRouter);
app.use("/youtubeApi", youtubeAPIRouter);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../frontend/build/index.html'));
});

module.exports = app;
