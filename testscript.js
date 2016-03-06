var globalVariable;

function calledMethod(){
    setGlobalVariable("Global Variable Text");
    var test = new TestObject(globalVariable, setB(globalVariable));
    console.log(test);
}

function TestObject(a, b) {
    this.a = a;
    this.b = b;
}

function setGlobalVariable(text) {
    globalVariable = text;
}


function setB(text) {
    return text + "BBB";
}

calledMethod();