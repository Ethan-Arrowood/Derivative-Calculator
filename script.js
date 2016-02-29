//Derivative Calculator - Project Lead: Ethan Arrowood
// Started: February 14th 2016

/* Things to add:
1. Better function support
 - Evaluate expressions within the coefficient and exponent
 - let Coeff and Exp have paranthesis and other math symboles like + - \ * within 
2. Add support for negative terms - Completed 2/28/2016 (needs testing)
3. Better error handling
(not possible in javascript) 4. Redo object so it has an overloaded constructor. The find methods are ok, but it would be better if the constructor class was smart enough to it all and not need the assistance from the other classes
5. Actually begin building calculator aspect
*/

//Having trouble getting key recognition to work
//Leaving code here for reference later
//This is only for asthetics and nicer looking function display - deffinately not a priority
/* 
$(document).ready(function () {
        $(".functionField").keydown(function (event) {
           //the event is a key 
           which = event.which; //ASCii value
           key = event.key || String.fromCharCode(which) //Actual key as a string

           console.log("Which: " + which +
               "\nKey: " + key);


       });
       $(".functionField").keyup(function (event) {
           if (!event.shiftKey) {
               fstring = $(".functionField").html();
               lastChar = fstring.substring(fstring.length - 1);
               if (lastChar == "^") {
                   $(".functionField").html(fstring += "()")
               }
               console.log(lastChar);
           }

       })
       $("#functionInput").keyup(function () {
           fxInput = $("#functionInput");
           console.log(fsInput.val());
       })
    
});
*/

var fxVariable; //global scope variable for Term object purposes
var fxBase;
function getVariable(fx) { //Calculator cannot do Implicit yet; functions must only have one variable!
    var re = /([a-zA-Z])/g; //regex searches for a letter
    var m;
    var charArray = [];
    while ((m = re.exec(fx)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        charArray.push(m[1]); //push all characters found within function charArray
    }

    var divWithInfo = document.getElementById("functionInfo");

    if (charArray.length < 1) { //if the charArray is empty then there are no variables; default to 'x'
        fxVariable = "x";
        divWithInfo.innerHTML += "No variable found, defaulting to 'x' for object constructor purposes.";
        return true;
    } else {
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i] != charArray[0]) { 
            //compare all characters within list to the first item, if any differ we alert the user
                divWithInfo.innerHTML += "Please enter a function containing only ONE variable!";
                return false;
            }
        }
        fxVariable = charArray[0]; //if all is good set the global scope variable
        return true;
    }
}

function evaluatefx() {
    
    var divWithInfo = document.getElementById("functionInfo");
    divWithInfo.innerHTML = "";

    fxText = $("#functionInput").html(); //raw string of function
    fxText = fxText.replace(/\&nbsp;/g,''); //remove all 'space' characters
    fxText = fxText.replace(/\s+/g,''); //remove all whitespace
    console.log("fxText: " + fxText);
    fxLength = fxText.length; //length of function text

    /*By executing the getVariable() method, we are setting the global scope fxVariable*/
    if (fxLength < 1 || !getVariable(fxText) ) { //simple error handling --needs update
        return false;
    }

    fxTermArray = []; //these arrays are for the terms found using regex
    fxTermOBJArray = [];

    var re = /(^\w+\^\(-?\d+\)|^\w+|[+-]\w+\^\(\d+\)|[+-]\w+)/g; //regex looking for terms
    /* 
    Check for beginning of string, or either operator ( '+' '-' )
    Then include anything following it, up to another operator, or the end of the string
    */
    var m;

    while ((m = re.exec(fxText)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

        fxTermArray.push(m[1]); //push all the terms (as strings) to this array
    }

    for (var term in fxTermArray) {
        var x = fxTermArray[term];
        console.log("Term: " + fxTermArray[term])
        setBase(x);
        fxTermOBJArray.push(new Term(x, fxBase, setSign(fxBase), setCoeff(fxBase), setExp(x))); //create a Term object and push it to the array
    }
    console.log(fxTermOBJArray);


    for (var n in fxTermOBJArray) {

        divWithInfo.innerHTML += "<p><u>Term: <span style='color:blue'>" + fxTermOBJArray[n].term +
            "</span></u><br>Base: " + fxTermOBJArray[n].base +
            "<br>Sign: " + fxTermOBJArray[n].sign +
            "<br>Coefficient: " + fxTermOBJArray[n].coeff +
            "<br>Exponent: " + fxTermOBJArray[n].exp +
            "<br>Variable: " + fxTermOBJArray[n].variable +
            "</p>";
    } //'pretty print' loop for the array of Term objects
}

function Term(term, base, sign, coefficient, exponent, variable) { //Term object constructor 
    this.term = term; //for display purposes
    this.base = base; //for sign and coefficient
    this.sign = sign; //either + -
    this.coeff = coefficient; //will be a positive integer or float    
    this.exp = exponent; //will be a positive or negative, integer or float
    this.variable = fxVariable; //all terms will have the predetermined variable
}


function setBase(term) { //finds the Base of the term
    var basePatt = /(?!\()(\d+|[+-]\d*)(?!\))/; //regex for base 
    //matches operator, and the following coeffecient
    var base = basePatt.exec(term);
    fxBase = base.pop();
}
function setSign(term) {
    if (term[0] != "+" && term[0] != "-") { //this occurs when the first term is positive
        return "+"; 
    } else {
        return term[0];
    }
}
function setCoeff(term) { //finds the Coefficient of the term
    var coeffPatt = /(\d+)/; //regex for coefficient
    // finds any number
    var coeff = coeffPatt.exec(term);
    if (coeff) {
        return coeff.pop();
    } else { // if the coeff is null, it evaluates false and we default to "1";
        return "1";
    }
}
function setExp(term) { //finds the Exponent of the term
    var expPatt = /\^{1}\((.*)\)/; //regex for exponents
    // finds the contents of all exponents, which would be indicated by a '^(', and then a ')' 
    var exp = expPatt.exec(term);
    
    var re = new RegExp(fxVariable);
    if (exp) {
        return exp.pop();
    } else if (re.test(term)) { //if the variable is there, the power is 1
        return "1";
    } else { //else the variable is technically there, but has a power of 0
        return "0";
    }
}