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

module.exports = scan