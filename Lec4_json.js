class Data {
    constructor(type, value, child) {
        this.type = type;
        this.value = value;
        this.child = child;
    }
}

function scan(str) {
    let tokens = [];
    let stack = "";
    for (let token of str) {
        if (token === '[' || token === '{') {
            stack === "" ? tokens.push(token) : tokens.push(stack);
            stack = "";
        } else if(token === ','){
            if(stack !== "") {tokens.push(stack)};
            stack = "";
        } else if (token === ']' || token === '}' || token === ':') {
            if(stack !== ""){tokens.push(stack)};
            tokens.push(token);
            stack = "";
        } else if (token === ' ') {
            continue;
        } else {
            stack += token;
        }
    }
    return tokens;
}

function parse(str) {
    const tokens = scan(str);
    let result = [];
    let temp = "", objectStatus = false;

    for (let token of tokens){
        if (token === '[') {
            result.push(new Data('array', "", []));
        } else if (token === '{') {
            result.push(new Data('object', "", []));
            objectStatus = true;
        } else if (token === ':'){
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('objectKey', temp));
        } else if (!isNaN(Number(token))) {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('number', token));
        } else if (token === 'null') {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('null', token));
        } else if (token === 'true' || token === 'false') {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('boolean', token));
        } else if (token[0] === "'") {
            if (!countApostrophe(token)) {
                console.log(`${token}은 올바른 문자열이 아닙니다.`);
                return;
            }
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('string', token));
        } else if (token === ']' && result.length > 1) {
            const lastData = result.pop();
            const lastChild = result[result.length - 1].child;
            lastChild.push(lastData);
        } else if (token === '}' && result.length > 1) {
            const lastData = result.pop();
            const lastChild = result[result.length - 1].child;
            lastChild.push(lastData);
            objectStatus = false;
        } else if (token === ']' && result.length === 1) {
            return result;
        } else if (objectStatus === true && token !== ':'){
            temp = token;
        } else {
            console.log(`${token}은 올바른 문자열이 아닙니다.`);
            return;
        }
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

//test

var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a: 'a' }, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
// var str = "[1,{a:'str', b:[912,[5656,33]]}]";
// var str = "[1,{key: [2,{a:'a'}]}]"
// console.log(parse(str))
console.log(JSON.stringify(parse(str), null, 2));