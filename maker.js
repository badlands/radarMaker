const CSVParser = require('papaparse');

function parseQuadrantsCSV(csvString) {
  const csv = CSVParser.parse(String(csvString), { 'header': true });
  if (csv.data.length <= 0) {
    return {};
  }

  csv.data.forEach( (index, quadrant) => console.log(index + "." + quadrant);
  return csv.data.map(line => quadrantLineToJson(line)).filter(entry => entry.id.length > 0);  
}

function quadrantLineToJson(line) {
  if (line.length < 3) { return null }

  return {
    "id": line.id,
    "name": line.name,
    "description": line.description
  }
}

class RadarMaker {
  constructor(quadrants, rings) {
    this.quadrants = quadrants;
    this.rings = [
      { name: "ADOPT", color: "#93c47d" },
      { name: "TRIAL", color: "#93d2c2" },
      { name: "ASSESS", color: "#fbdb84" },
      { name: "HOLD", color: "#efafa9" }
    ];
  }

  csvToJson(csvString) {
    const csv = CSVParser.parse(String(csvString), { 'header': true });
    if (csv.data.length <= 0) {
      return {};
    }

    return csv.data.map(line => this.lineToJson(line));
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
  lineToJson(line) {
    // TODO: active
    // TODO: moved
    // TODO: description
    if (line.length < 3) { return null }

    return {
      "quadrant": this.stringToQuadrant(line.quadrant),
      "ring": this.stringToRing(line.ring),
      "label": line.name,
      "active": true,
      "moved": 0, 
    }
  }

  stringToQuadrant(str) {
    const requiredQuadrantId = String(str).toLowerCase();

    console.log(this.quadrants);
    const quadrant = this.quadrants.filter(q => q.id == requiredQuadrantId);

    console.log("! " + str + " => " + quadrant);
    if (quadrant.length > 0) { 
      console.log("! " + str + " => " + quadrant + " -> " + this.quadrants.indexOf(quadrant));      
      return this.quadrants.indexOf(quadrant);
    } else { return -1 };

    // switch(String(str).toLowerCase()) {
    //   case "tools":
    //     return 0;
    //   case "techniques":
    //     return 1;
    //   case "data":
    //     return 2;
    //   case "platforms":
    //     return 3;                
    // }

    // console.error("Invalid quadrant: " + str);
    // return -1;
  }

  stringToRing(str) {
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
}


// function csvToJson(csvString) {
//     const csv = CSVParser.parse(String(csvString), { 'header': true });
//     if (csv.data.length <= 0) {
//       return {};
//     }

//     return csv.data.map(line => lineToJson(line));
// }



// module.exports.csvToJson = csvToJson;
// module.exports.stringToQuadrant = stringToQuadrant;
// module.exports.stringToRing = stringToRing;
// module.exports.lineToJson = lineToJson;
module.exports.radarMaker = RadarMaker;
module.exports.parseQuadrantsCSV = parseQuadrantsCSV;
