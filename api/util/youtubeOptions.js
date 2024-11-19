const path = require("path");

const videoOptions = {
    noPlaylist: true,
    cookies: path.resolve(__dirname,'../resource/cookies.txt')
}

const audioOptions = {
    extractAudio: true,
    cookies: path.resolve(__dirname,'../resource/cookies.txt'),
    noPlaylist: true,
}

const getOptions = function (video, output, format) {
    let options;
    if (video) {
        options = videoOptions;
        options.format = format
    } else {
        options = audioOptions
        options.audioFormat = format
    }

    options.output = output;

    return options;
}

function getBestFormat(formats) {
    try {
        const videoFormats = formats.filter(format => format.vcodec !== 'none'); // Exclut les formats uniquement audio

        const bestVideoFormat = videoFormats.reduce((best, current) => {
            if (best.height > current.height) return best;
            if (best.height < current.height) return current;
            return best;
        });

        return bestVideoFormat.ext;

    } catch (error) {
        console.error('Erreur lors de la récupération du format:', error);
    }
}


module.exports = {getBestFormat, getOptions};
