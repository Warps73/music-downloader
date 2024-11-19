require('dotenv').config()
var express = require('express');
var path = require('path');
global.appRoot = path.resolve(__dirname);
var cookieParser = require('cookie-parser');

var spotifyAPIRouter = require("./routes/spotifyApi");
var youtubeAPIRouter = require("./routes/youtubeApi");

var app = express();
app.use(express.static(path.join(__dirname, '/../frontend/build')));


const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Une erreur est survenue',
        message: err.message
    });
});


app.use("/api/download-spotify", spotifyAPIRouter);
app.use("/api/download-youtube", youtubeAPIRouter);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.status(404)
    res.send('Not found')
});

module.exports = app;
