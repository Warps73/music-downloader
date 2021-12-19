var express = require("express");
var router = express.Router();
const stream = require("stream");
const {getFileName, download} = require("../manager/spotifyManager");

router.post("/", async function (req, res, next) {


    const url = req.body.url;
    const fileName = await getFileName(url)
    const file = await download(url);
    const fileContents = Buffer.from(file, "base64");
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'audio/mpeg');

    readStream.pipe(res);
});

module.exports = router;
