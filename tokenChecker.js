const tokenMap = {
    others : {":" : "objectKey", "null" : "null", "true" : "boolean", "false" : "boolean", "'" : "string"},
    start : {"[" : "array", "{" : "object"},
    end : {"]" : "array", "}" : "object"}
}

const tokenChecker = {
    isStartToken(token){
        if(Object.keys(tokenMap.start).includes(token)) return tokenMap.start[token];
    }, 
    isEndToken(token, result){
        if(Object.keys(tokenMap.end).includes(token) && result.length > 1) return tokenMap.end[token];
    },
    isOtherToken(token){
        if(Object.keys(tokenMap.others).includes(token)) return tokenMap.others[token];
        if(token[0] === "'") {
            if(countApostrophe(token)) return tokenMap.others[token[0]];
            console.log(`${token}은 올바른 문자열이 아닙니다.`); return false;
        }
        if(!isNaN(Number(token))) return "number";
    },
    isFinalToken(token, result){
        if(token === ']' && result.length === 1) return true;
    }
}

function countApostrophe(token) {
    let count = 0;
    for (let letter of token) {
        if (letter === "'") count++;
    }
    if (count === 2) return true;
    return false;
}

module.exports.tokenMap = tokenMap;
module.exports.tokenChecker = tokenChecker;
module.exports.countApostrophe = countApostrophe;
