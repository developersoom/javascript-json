class Data {
    constructor(type, value, child) {
        this.type = type;
        this.value = value;
        this.child = child
    }
}

function scan(str) {
    let tokens = [];
    for (let i = 0; i < str.length; i++) {
        tokens.push(str[i])
    }
    return tokens;
}

function checkType(tokens) {
    if (tokens[0] === '[' && tokens[tokens.length - 1] === ']') {
        return 'array';
    }
    if (Number(tokens)) {
        return 'number';
    }
}

function divideTokens(str) {
    const tokens = scan(str);
    let values = [];
    let emptyArr = [];
    let stack = [];
    let nested = [];
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '['){
           stack.push(1);
        }

        if (tokens[i] === ']'){
            stack.pop();
        }

        if (stack.length){
            nested.push(tokens[i]);
            continue;
        }

        if (stack.length === 0 && nested.length !== 0){
            nested.push(']')
            values.push(nested.join(''));
            nested = [];
            continue;
        }
        
        if (i === tokens.length - 1) {
            emptyArr.push(tokens[i]);
            values.push(emptyArr.join(''));
            break;
        }

        if (tokens[i] === ','){
            if (tokens[i-1] !== ']'){
            values.push(emptyArr.join(''));
            emptyArr = [];
            }
            continue;
        }

        emptyArr.push(tokens[i]);
    }
    return values
}

function removeBrackets(str) {
    let stringToArr = str.split('');
    stringToArr.pop();
    stringToArr.shift();
    return stringToArr.join('');
}


function parse(str) {
    let type = checkType(str);
    let child = [];
    let value = null;
    if (type === 'array') {
        str = removeBrackets(str);
        child = divideTokens(str);
        let data = new Data(type, value, child);
        return data;
    }
    if (type === 'number') {
        value = divideTokens(str).join('');
        let data = new Data(type, value, child);
        return data;
   }
}

//test
function printResult(){
    let str = "[123,[22,23,[11,[112233],112],55],33]";
    let result = [parse(str)];
    for(let i = 0; i < result.length; i++){
        if(result[i].child !== []){
            for(let j = 0; j < result[i].child.length; j++){
                                            debugger;
                result[i].child[j] = parse((result[i].child[j]))
            }
        }
    }
        console.log(result)
}

printResult()


// function getResult(str) {
//     let result = parse(str);
//     if (result.child !== []) {
//         for (let i = 0; i < result.child.length; i++) {
//             result.child[i] = parse(result.child[i]);
//         }
//     }
//     for (let i = 0; i < result.child.length; i++) {
//         if (result.child[i].type === 'array') {
//             result.child[i].child = parse(result.child[i].child)
//         }
//     }
//     return result;
// }