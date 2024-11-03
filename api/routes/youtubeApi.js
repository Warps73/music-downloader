var express = require("express");
var router = express.Router();
const youtubedl = require('youtube-dl-exec');
const fileSystem = require("fs");
const path = require("path");
const os = require('os');
router.post("/", async function (req, res, next) {
    try {
        const url = req.body.url;
        console.log('start dl infos')

        // Première étape : obtenir les infos
        const infos = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        });
        console.log('end dl infos')

        const fileName = `${infos.title}.mp3`;
        const filePath = path.join(os.tmpdir(), fileName);
        console.log('start dl')
        // Deuxième étape : télécharger l'audio
        await youtubedl(url, {
            extractAudio: true,
            audioFormat: 'mp3',
            noCheckCertificates: true,
            noPlaylist: true,
            output: filePath, // Chemin complet du fichier
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        });
        console.log('end dl')

        res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        res.header('Content-disposition', 'attachment; filename=' + fileName);
        res.header('Content-Type', 'audio/mpeg');
        fileSystem.createReadStream(filePath).pipe(res);

    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Une erreur est survenue');
    }
});

module.exports = router;