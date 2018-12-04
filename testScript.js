const {Data, parseToken, parse} = require('./script.js');
const testSet = require('./testSet.js');

testSet.test("<문자열이 \"[23,234, '[123]' , 2344]\"일 때, 첫번째 인자('23')의 타입은 number이다.>", function () {
    const str = "[23,234, '[123]' , 2344]";
    const result = parse(str);
    return testSet.expect('number').toBe(result[0].child[0].type);
});

testSet.test("<문자열이 \"[1,{key: [2,{a:'a'}]}]\"일 때, 두번째 인자의 타입은 object이다.>", function () {
    const str = "[1,{key: [2,{a:'a'}]}]";
    const result = parse(str);
    return testSet.expect('object').toBe(result[0].child[1].type);
});