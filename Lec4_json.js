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
        if(token === ' '){
            continue;
        }
        if (token === ',' || token === '[') {
            stack === "" ? tokens.push(token.toString()) : tokens.push(stack.toString());
            stack = "";
            continue;
        }
        if (token === ']') {
            tokens.push(stack.toString());
            stack = token;
            continue;
        }
        stack += token;
    }
    return tokens;
}

function parse(str) {
    const tokens = scan(str);
    let result = [];
    let type = "", value = "", child = [];

    for (let token of tokens) {
        if (token === '[') {
            type = 'array';
            result.push(new Data(type, value, child));
        } else if (Number(token)) {
            const lastChild = result[result.length - 1].child;
            type = 'number';
            value = token;
            lastChild.push(new Data(type, value));
            type = "", value = "", child = [];
        } else if (token === 'null') {
            const lastChild = result[result.length - 1].child;
            type = 'null';
            value = token;
            lastChild.push(new Data(type, value));
            type = "", value = "", child = [];
        } else if (token === 'true' || token === 'false') {
            const lastChild = result[result.length - 1].child;
            type = 'boolean';
            value = token;
            lastChild.push(new Data(type, value));
            type = "", value = "", child = [];
        } else if (token[0] === "'" && token[token.length-1] === "'") {
            const lastChild = result[result.length - 1].child;
            type = 'string';
            value = token;
            lastChild.push(new Data(type, value));
            type = "", value = "", child = [];
        } else if (token === ']' && result.length > 1) {
            const lastData = result.pop();
            const lastChild = result[result.length - 1].child;
            lastChild.push(lastData);
        }
    }
    return result;
}

function countApostrophe(token){
    let count = 0;
    for(let letter of token){
        if(letter === "'") count++;
    }
    if(count === 2)return true;
    return false;
}


//test
// var str = "[123,[22,23,[11,[112233],112],55],33]";
var str = "['1a3',[null,false,['11',[112233],112],55, '99'],33, true]";
// console.log(parse(str))
console.log(JSON.stringify(parse(str), null, 2));