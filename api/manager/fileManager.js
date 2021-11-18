const fs = require('fs');
const archiver = require('archiver');

const saveFile = async function (song, path) {
    fs.writeFileSync(path, song);
}

const generateZip = async function (files) {

    // todo use temp storage instead public directory
    //  https://www.npmjs.com/package/tmp
    const output = fs.createWriteStream('./public/example.zip');
    const archive = archiver('zip', {
        zlib: {level: 9}
    });

    archive.pipe(output);

    files.forEach(function (data) {
        archive.append(fs.readFileSync(data.path), {name: `${data.name}.mp3`});

    })

    await archive.finalize();

    return './public/example.zip';
}


module.exports = {saveFile, generateZip}
