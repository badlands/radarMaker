var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'templates/index.tpl');
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
    { name: "RETIRE", color: "#efafa9" }
];

const testString = 'name,ring,quadrant,isNew,description\n\
Composer,adopt,tools,Yes,"Although the idea of dependency management ..."\n\
Canary builds,trial,techniques,Yes,"Many projects have external code dependencies ..."\n\
Apache Kylin,assess,data,Yes,"Apache Kylin is an open source analytics solution ..."\n\
JSF,retire,platforms,Yes,"We continue to see teams run into trouble using JSF"\n\
Swift,adopt,platforms,Yes,"Swift is a modern programming language for mobile apps and more"\n\
Terraform,adopt,tools,No,"<Insert description>"';

const ENTRIES = maker.csvToJson(testString);

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (err) { return }

    const titleRegex = /{\$RADAR_TITLE}/g
    const entriesRegex = /{\$RADAR_ENTRIES}/g
    var output = data.replace(titleRegex, RADAR_TITLE);
    output = data.replace(entriesRegex, JSON.stringify(ENTRIES));

    console.log(output);
});