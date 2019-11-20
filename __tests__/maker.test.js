const RadarMaker = require('../maker.js').radarMaker;
const QUADRANTS = [ { id: "tools", name: "Tools" }, { id: "techniques", name: "Techniques" }, { id: "data", name: "Data" }, { id: "techniques", name: "Platforms" } ];
var sut = null;

beforeEach(() => {
    sut = new RadarMaker(QUADRANTS, {})
});

test('CSV is converted to JSON', () => {
    const testString = 'name,ring,quadrant,isNew,description\n\
Composer,adopt,tools,Yes,"Although the idea of dependency management ..."\n\
Canary builds,trial,techniques,Yes,"Many projects have external code dependencies ..."\n\
Apache Kylin,assess,data,Yes,"Apache Kylin is an open source analytics solution ..."\n\
JSF,hold,platforms,Yes,"We continue to see teams run into trouble using JSF"\n\
Swift,adopt,platforms,Yes,"Swift is a modern programming language for mobile apps and more"\n\
Terraform,adopt,tools,No,"<Insert description>"';

    const result = sut.csvToJson(testString);

    expect(result).toHaveLength(6);
    expect(result[0].label).toBe('Composer');
    expect(result[0].quadrant).toBe(0);
    expect(result[0].ring).toBe(0);
});

test('stringToQuadrant', () => {
    const testString = 'tools';
    expect(sut.stringToQuadrant(testString)).toBe(0);
});

test('stringToQuadrant with funny capitalization', () => {
    const testString = 'TOols';
    expect(sut.stringToQuadrant(testString)).toBe(0);
});

test('stringToRing', () => {
    const testString = 'ADOPT';
    expect(sut.stringToRing(testString)).toBe(0);
});

test('lineToJson', () => {
    const testLine = { 'name': 'Swift', ring: 'ADOpt', quadrant: 'plaTForms' };
    const result = sut.lineToJson(testLine);

    expect(result.active).toBe(true);
    expect(result.moved).toBe(0);
    expect(result.label).toBe('Swift');
    expect(result.quadrant).toBe(3);
    expect(result.ring).toBe(0);
});