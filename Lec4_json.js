class Data {
    constructor(type, value, child, key) {
        this.type = type;
        this.key = key || undefined;
        this.value = value || undefined;
        this.child = child || undefined;
    }
}

function scan(str) {
    let tokens = [];
    let stack = "";
    for (let token of str) {
        if (stack === ':') {
            tokens.push(stack);
            stack = "";
        } else if (token === ',' || token === '[' || token === '{') {
            stack === "" ? tokens.push(token) : tokens.push(stack);
            stack = "";
        } else if (token === ']' || token === '}' || token === ':') {
            tokens.push(stack);
            stack = token;
        } else if (token === ' ') {
            continue;
        } else {
            stack += token;
        }
    }
//     tokens.push(stack);
    return tokens;
}

function parse(str) {
    const tokens = scan(str);
    let result = [];
    let type = "", value = "", child = []; key = ""; objectStatus = false;

    for (let token of tokens) {
        if(token === '[' && objectStatus !== false){
            result[result.length - 1].value = 'array';
            result[result.length - 1].child = child;
        } else if(objectStatus === 'value' && token !== ':' && token[0] === "'" && token[token.length - 1] === "'"){
            result[result.length - 1].value = token;
        } else if(token === ']' && objectStatus !== false){
            continue;
        } else if (token === '[') {
            result.push(new Data('array', value, child));
        } else if (token === '{') {
            result.push(new Data('object', value, undefined, key));
            objectStatus = 'key';
        } else if (objectStatus === 'key'){
            key = token;
            objectStatus = 'value';
        } else if (objectStatus === 'value' && token === ':'){
            result[result.length - 1].key = key;
            key = "";
        } else if ((!isNaN(Number(token)))) {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('number', token));
            type = "", value = "", child = [];
        } else if (token === 'null') {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('null', token));
            type = "", value = "", child = [];
        } else if (token === 'true' || token === 'false') {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('boolean', token));
            type = "", value = "", child = [];
        } else if (token[0] === "'" && token[token.length - 1] === "'") {
            if (!countApostrophe(token)) {
                console.log(`${token}은 올바른 문자열이 아닙니다.`);
                return;
            }
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('string', token));
            type = "", value = "", child = [];
        } else if (token === ']' && result.length > 1) {
            const lastData = result.pop();
            const lastChild = result[result.length - 1].child;
            lastChild.push(lastData);
        } else if (token === '}') {
            const lastData = result.pop();
            const lastChild = result[result.length - 1].child;
            lastChild.push(lastData);
            objectStatus = false;
        } else {
            console.log(`${token}은 올바른 문자열이 아닙니다.`);
            return;
        }

    }
    return result;
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
// var str = "[123,[22,23,[11,[112233],112],55],33]";
// var str = "['d1',[22,23,[11,[112233],112],55],'3d3']"
// var str = "['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]";
var str = "[1,{key: [2,{a: 'a'}}]"
// console.log(scan(str))
// console.log(parse(str))
console.log(JSON.stringify(parse(str), null, 2));