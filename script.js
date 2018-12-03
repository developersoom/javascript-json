const scan = require('./scan.js');
const tokenChecker = require('./tokenChecker.js');
const parseToken = require('./parseToken.js');

let objectStatus = false;

function parse(str) {
    const tokens = scan(str);
    let result = [];
    let objectKeyName;
    let tokenType;

    for (let token of tokens){
        if (tokenChecker.isFinalToken(token, result)) return result;
        
        if (tokenType = tokenChecker.isStartToken(token)) parseToken.executeStartToken(result, tokenType);
        
        else if (tokenType = tokenChecker.isOtherToken(token)) parseToken.executeOtherToken(result, tokenType, token, objectKeyName);
        
        else if (tokenType = tokenChecker.isEndToken(token, result)) parseToken.executeEndToken(result, tokenType);

        else if (objectStatus && token !== ':') objectKeyName = token;
    } 
}

//test

// var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a: 'a' }, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
// var str = "[1,{a:'str', b:[912,[5656,33]]}]";
var str = "[1,{key: [2,{a:'a'}]}]"
// var str = "[23,234, '[123]' , 2344]";
// console.log(parse(str))
console.log(JSON.stringify(parse(str), null, 2));