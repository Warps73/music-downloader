var express = require("express");
var router = express.Router();
const fileSystem = require("fs");
const path = require("path");
const ytDlpPath = path.resolve(__dirname, '../exec/yt-dlp');
const { create: createYoutubeDl } = require('youtube-dl-exec')
const youtubedl = createYoutubeDl(ytDlpPath)
const os = require('os');
const {getOptions, getBestFormat} = require("../util/youtubeOptions");
router.post("/", async function (req, res, next) {
    try {
        const url = req.body.url;
        const withVideo = req.body.withVideo

        const infos = await youtubedl(url, {
            dumpSingleJson: true,
            preferFreeFormats: true,
            noPlaylist: true,
            cookies: path.resolve(__dirname,'../resource/cookies.txt')
        });

        const format = withVideo ? getBestFormat(infos.formats) : 'mp3'
        const ext = `.${format}`
        const fileName = infos.title + ext;
        const tmpDir = os.tmpdir();
        console.log('Temp directory:', tmpDir);
        const filePath = path.join(os.tmpdir(), fileName);

        const options = getOptions(withVideo, filePath, format)

        await youtubedl(url, options);

        res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        res.header('Content-disposition', 'attachment; filename=' + fileName);
        fileSystem.createReadStream(filePath).pipe(res);

        // res.on('close', () => {
        //     fileSystem.unlink(filePath, (err) => {
        //         if (err) {
        //             console.error('Erreur lors de la suppression du fichier:', err);
        //         } else {
        //             console.log('Fichier supprimé avec succès');
        //         }
        //     });
        // });

    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Une erreur est survenue');
    }
});

module.exports = router;