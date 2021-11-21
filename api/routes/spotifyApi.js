var express = require("express");
var router = express.Router();
const download = require("../manager/spotifyManager");

router.post("/", async function(req, res, next) {


    const path = await download(req.body.url);

    return res.download('./public/example.zip')

});

module.exports = router;
