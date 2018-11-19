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
        if (token === ' ') {
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
            result.push(new Data('array', value, child));
            continue;
        } if (Number(token)) {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('number', token));
            type = "", value = "", child = [];
            continue;
        } if (token === 'null') {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('null', token));
            type = "", value = "", child = [];
            continue;
        } if (token === 'true' || token === 'false') {
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('boolean', token));
            type = "", value = "", child = [];
            continue;
        } if (token[0] === "'" && token[token.length - 1] === "'") {
            if (!countApostrophe(token)) {
                console.log(`${token}은 올바른 문자열이 아닙니다.`);
                return;
            }
            const lastChild = result[result.length - 1].child;
            lastChild.push(new Data('string', token));
            type = "", value = "", child = [];
            continue;
        } if (token === ']' && result.length > 1) {
            const lastData = result.pop();
            const lastChild = result[result.length - 1].child;
            lastChild.push(lastData);
            continue;
        }
        console.log(`${token}은 올바른 문자열이 아닙니다.`);
        return;

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
var str = "['1a3',[22,23,[11,[112233],112],55],'3d3']"
// console.log(parse(str))
console.log(JSON.stringify(parse(str), null, 2));