const scan = require('./scan.js');
const testSet = require('./testSet.js');

testSet.test("<문자열에 ('[1, 2]')가 들어오면 분석한 배열 tokens의 길이는 4이다>", function () {
    const str = "[1, 2]";
    const result = scan(str).length;
    return testSet.expect(4).toBe(result);
});

testSet.test("<문자열에 ('[1[2]')가 들어오면 분석한 배열 tokens의 길이는 3이다>", function () {
    const str = "'[1[2]'";
    const result = scan(str).length;
    return testSet.expect(0).toBe(result);
});

testSet.test("<문자열에 (공백)이 들어오면 분석한 배열 tokens의 길이는 0이다>", function () {
    const str = " ";
    const result = scan(str).length;
    return testSet.expect(0).toBe(result);
});

testSet.test("<문자열에 '{key: value}' 들어오면 분석한 배열 tokens의 길이는 5이다>", function () {
    const str = "{key: value}";
    const result = scan(str).length;
    return testSet.expect(5).toBe(result);
});