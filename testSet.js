const testSet = {
testObj : {
    targetValue: undefined,
    toBe(resultValue){
        this.resultValue = resultValue;
        if(this.targetValue === resultValue) return 'OK'
        return 'FAIL'
    }
},
  
expect(targetValue) {
    this.testObj.targetValue = targetValue;
    return this.testObj;
},
  
test(msg, fn){
    const result = fn();
    const printMsg = `${msg} : ${result} (targetValue is ${this.testObj.targetValue}, resultValue is ${this.testObj.resultValue})`;
    console.log(printMsg);
   }
}

module.exports = testSet;