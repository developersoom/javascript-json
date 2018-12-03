class Data {
    constructor(type, value, child) {
        this.type = type;
        this.value = value;
        this.child = child;
    }
}

const parseToken = {
    executeStartToken(result, tokenType){
        result.push(new Data(tokenType, "", []));
        if(tokenType === 'object') objectStatus = true;
    },
    executeOtherToken(result, tokenType, token, objectKeyName){
        const lastChild = result[result.length - 1].child;
        if(tokenType === 'objectKey') lastChild.push(new Data(tokenType, objectKeyName));
        else lastChild.push(new Data(tokenType, token));
    },
    executeEndToken(result, tokenType){
        const lastData = result.pop();
        const lastChild = result[result.length - 1].child;
        lastChild.push(lastData);
        if(tokenType === 'object') objectStatus = false;
    }
}

module.exports = parseToken