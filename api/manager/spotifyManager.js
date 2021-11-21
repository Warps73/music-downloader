const {default: Spotify} = require("spotifydl-core");
const parser = require("../util/url-parser");


const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
}
const spotify = new Spotify(credentials);

/**
 *
 * @param link
 * @return {Promise<*|string>}
 */
const download = async function (link) {

    // todo manage playlists actually only one track worked
    const type = await getType(link)
    const downloadMethod = 'download' + type[0].toUpperCase() + type.slice(1);

    return await spotify[downloadMethod](link);

}

const getFileName = async function (link) {

    const type = await getType(link)
    const getDataMethod = 'get' + type[0].toUpperCase() + type.slice(1);

    const data = await spotify[getDataMethod](link);


    return `${data.name}.mp3`;

}

const getType = async function (link) {
    return await parser(link);
}

module.exports = {download, getFileName};
