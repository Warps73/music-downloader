const {default: Spotify} = require("spotifydl-core");
const parser = require("../util/url-parser");
const {saveFile, generateZip} = require("./fileManager");


const credentials = {
    clientId: process.env.CLIENT_ID ,
    clientSecret: process.env.CLIENT_SECRET,
}
const spotify = new Spotify(credentials);

const download = async function (link) {

    // todo manage playlists actually only one track worked
    const files = [];
    const type = await parser(link);
    const getDataMethod = 'get' + type[0].toUpperCase() + type.slice(1);
    const downloadMethod = 'download' + type[0].toUpperCase() + type.slice(1);
    const data = await spotify[getDataMethod](link);
    const path = `./public/${data.name}.mp3`;

    const song = await spotify[downloadMethod](link);

    await saveFile(song, path)

    files.push({
        path : path,
        name : data.name
    })

    const generatedZip =  await generateZip(files);

    console.error(generatedZip)

    return generatedZip;

}

module.exports = download;
