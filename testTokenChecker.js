const {tokenChecker, tokenMap, countApostrophe} = require('./tokenChecker.js');
const testSet = require('./testSet.js');

testSet.test("<(\')가 3개 이상인 문자열이 들어오면 에러메시지가 출력된다>", function(){
    const strToken = "'st'r'";
    const result = countApostrophe(strToken);
    return testSet.expect(false).toBe(result);
});