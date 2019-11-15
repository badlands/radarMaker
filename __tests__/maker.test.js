const sut = require('../maker.js');

test('CSV is converted to JSON', () => {
    const testString = 'name,ring,quadrant,isNew,description\n\
Composer,adopt,tools,Yes,"Although the idea of dependency management ..."\n\
Canary builds,trial,techniques,Yes,"Many projects have external code dependencies ..."\n\
Apache Kylin,assess,platforms,Yes,"Apache Kylin is an open source analytics solution ..."\n\
JSF,retire,languages & frameworks,Yes,"We continue to see teams run into trouble using JSF"\n\
Swift,adopt,languages & frameworks,Yes,"Swift is a modern programming language for mobile apps and more"\n\
Terraform,adopt,tools,No,"<Insert description>"';

    const result = sut.csvToJson(testString);

    expect(result).toHaveLength(6);
    expect(result[0].label).toBe('Composer');
});

test('stringToQuadrant', () => {
    const testString = 'Languages';
    expect(sut.stringToQuadrant(testString)).toBe(0);
});

test('stringToQuadrant with funny capitalization', () => {
    const testString = 'LangUAges';
    expect(sut.stringToQuadrant(testString)).toBe(0);
});

test('stringToRing', () => {
    const testString = 'ADOPT';
    expect(sut.stringToRing(testString)).toBe(0);
});

test('lineToJson', () => {
    const testLine = { 'name': 'Swift', ring: 'ADOpt', quadrant: 'LangUAges' };
    const result = sut.lineToJson(testLine);

    const expected = {
        "quadrant": 0,
        "ring": 0,
        "label": "Swift",
        "active": true,
        "moved": 0
    };

    expect(result.active).toBe(true);
    expect(result.moved).toBe(0);
    expect(result.label).toBe('Swift');
    expect(result.quadrant).toBe(0);
    expect(result.ring).toBe(0);
});