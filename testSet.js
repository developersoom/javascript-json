const testSet = {
testObj : {
    testValue: undefined,
    toBe(targetValue){
        this.targetValue = targetValue;
        if(this.testValue === targetValue) return 'OK'
        return 'FAIL'
    },
    // toBeSameObj(TestObj, resultObj){
    //         const type = Objec.
    //     return true;
    // }
},
  
expect(testValue) {
    this.testObj.testValue = testValue;
    return this.testObj;
},
  
test(msg, fn){
    const result = fn();
    const printMsg = `${msg} : ${result} (testValue is ${this.testObj.testValue}, targetValue is ${this.testObj.targetValue})`;
    console.log(printMsg);
   }
}

module.exports = testSet;