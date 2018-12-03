function scan(str) {
    let tokens = [];
    let stack = "";
    let stringOpened = false;
    for (let token of str) {
        if (token === '[' && stringOpened === false || token === '{' && stringOpened === false) {
            stack === "" ? tokens.push(token) : tokens.push(stack);
            stack = "";
        } else if (token === "'") {
            stack += token;
            if (stringOpened === true) stringOpened = false;
            else if (stringOpened === false) stringOpened = true;
        } else if (token === ',' && stringOpened === false) {
            if (stack !== "") tokens.push(stack);
            stack = "";
        } else if (token === ']' && stringOpened === false || token === '}' && stringOpened === false || token === ':') {
            if (stack !== "") tokens.push(stack)
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