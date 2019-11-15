const CSVParser = require('papaparse');
/*
quadrants: [
    { name: "Languages" },
    { name: "Infrastructure" },
    { name: "Frameworks" },
    { name: "Data Management" }
  ],
  rings: [
    { name: "ADOPT", color: "#93c47d" },
    { name: "TRIAL", color: "#93d2c2" },
    { name: "ASSESS", color: "#fbdb84" },
    { name: "HOLD", color: "#efafa9" }
  ],
  */

function csvToJson(csvString) {
    const csv = CSVParser.parse(String(csvString), { 'header': true });
    if (csv.data.length <= 0) {
      return {};
    }

    return csv.data.map(line => lineToJson(line));
}

/// From a single CSV line to JSON
/// ["Swift", "adopt", "languages & frameworks", "Yes", "Swift is a modern programming language for mobile apps and more"]
/// becomes
/// {
///  quadrant: 3,
///  ring: 0,
///  label: "AWS EMR",
///  active: false,
///  link: "../data_processing/aws_emr.html",
///  moved: 0
///}
function lineToJson(line) {
  // TODO: active
  // TODO: moved
  // TODO: description
  if (line.length < 3) { return null }

  return {
    "quadrant": stringToQuadrant(line.quadrant),
    "ring": stringToRing(line.ring),
    "label": line.name,
    "active": true,
    "moved": 0, 
  }
}

function stringToQuadrant(str) {  
  switch(String(str).toLowerCase()) {
    case "tools":
      return 0;
    case "techniques":
      return 1;
    case "data":
      return 2;
    case "platforms":
      return 3;                
  }

  console.error("Invalid quadrant: " + str);
  return -1;
}

function stringToRing(str) {
  switch(String(str).toLowerCase()) {
    case "adopt":
      return 0;
    case "trial":
      return 1;
    case "assess":
      return 2;
    case "hold":
      return 3;                
  }

  console.error("Invalid ring: " + str);
  return -1;
}

module.exports.csvToJson = csvToJson;
module.exports.stringToQuadrant = stringToQuadrant;
module.exports.stringToRing = stringToRing;
module.exports.lineToJson = lineToJson;
