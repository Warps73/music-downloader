var express = require("express");
var router = express.Router();
const YoutubeDlWrap = require("youtube-dl-wrap");
const youtubeDlWrap = new YoutubeDlWrap(appRoot + "/bin/yt-dlp.exe");
const fileSystem = require("fs");

router.post("/", async function (req, res, next) {


    const url = req.body.url;
    let infos = await youtubeDlWrap.getVideoInfo([url, "--no-playlist",])

    const fileName = (infos.title).replace(/[^0-9a-z]/gi, '') + '.mp3'
    youtubeDlWrap.execPromise([url,
        "-f", "best", "--no-playlist", "-x", "--audio-format", "mp3", "-o", fileName])
        .then(function () {
            let filePath = "./" + fileName;
            res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'audio/mpeg');
            fileSystem.createReadStream(filePath).pipe(res);
        }).catch(function () {
        res.sendStatus(400)
        res.send('An error occurred')
    }).finally(function () {
        fileSystem.rmSync('./'+ fileName);
    });
});

module.exports = router;
