const fs = require('fs'),
    path = require('path');


const templateFile = path.join(__dirname, 'templates/index.tpl');
const dataFile = path.join(__dirname, 'data/radar.csv');
const destFile = path.join(__dirname, 'docs/output.html');

const maker = require('./maker.js');

const RADAR_TITLE = 'ICT Tech Radar';
const QUADRANTS = [
    { name: "Tools" },
    { name: "Techniques" },
    { name: "Data" },
    { name: "Platforms" }
];
const RINGS = [
    { name: "ADOPT", color: "#93c47d" },
    { name: "TRIAL", color: "#93d2c2" },
    { name: "ASSESS", color: "#fbdb84" },
    { name: "HOLD", color: "#efafa9" }
];

fs.readFile(dataFile, { encoding: 'utf-8' }, function(err, dataContent) {
    if (err) { return }

    const entries = maker.csvToJson(dataContent);

    fs.readFile(templateFile, { encoding: 'utf-8' }, function(err, data) {
        if (err) { return }

        const titleRegex = /{\$RADAR_TITLE}/g
        const entriesRegex = /{\$RADAR_ENTRIES}/g
        var output = data.replace(titleRegex, RADAR_TITLE);
        output = output.replace(entriesRegex, JSON.stringify(entries));

        console.log(output);

        fs.writeFile(destFile, output, (err) => {
            if (err) {
                return console.log(err);
            }
        
            console.log("=== Done ===");
        }); 
    });
});