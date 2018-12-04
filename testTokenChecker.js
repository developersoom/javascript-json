const {tokenChecker, tokenMap, countApostrophe} = require('./tokenChecker.js');
const testSet = require('./testSet.js');

testSet.test("<token에 (\')가 3개 이상인 문자열이 들어오면 'false'가 출력된다>", function(){
    const token = "'st'r'";
    const result = countApostrophe(token);
    return testSet.expect(false).toBe(result);
});

testSet.test("<token에 <(숫자)가 들어오면 'number'가 출력된다>", function(){
    const token = 1234;
    const result = tokenChecker.isOtherToken(token);
    return testSet.expect('number').toBe(result);
});

testSet.test("<token에 <(\'false\')가 들어오면 'boolean'이 출력된다>", function(){
    const token = 'false';
    const result = tokenChecker.isOtherToken(token);
    return testSet.expect('boolean').toBe(result);
});