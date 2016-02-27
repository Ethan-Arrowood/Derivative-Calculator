//Derivative Calculator - Project Lead: Ethan Arrowood
// Started: February 14th 2016

/* Things to add:
1. Better function support
 - Evaluate expressions within the coefficient and exponent
 - let Coeff and Exp have paranthesis and other math symboles like + - \ * within 
2. Add support for negative terms
3. Better error handling
4. Redo object so it has an overloaded constructor. The find methods are ok, but it would be better if the constructor class was smart enough to it all and not need the assistance from the other classes
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

var fxBase; //global scope variable for Term object purposes

function testForOneVariable(fx) { //Calculator cannot do Implicit yet; functions must only have one variable!
    var re = /([a-zA-Z])/g; //regex searches for a letter
    var m;
    var charArray = [];
    while ((m = re.exec(fx)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        charArray.push(m[1]); //push all characters found within function to this array
    }
    for (var i = 0; i < charArray.length; i++) {
        if (charArray[i] != charArray[0]) { //compare all characters within list to the first item, if any differ we alert the user
            alert("Please enter a function containing only ONE variable!");
            return false;
        }
    }
    fxBase = charArray[0]; //if all is good set the global scope variable
    return true;
}

function evaluatefx() {
    fxText = $("#functionInput").html().toString(); //raw string of function
    
    if(fxText.length < 1 || !testForOneVariable(fxText)) { //simple error handling --needs update
        return false;
    }
    
    fxLength = fxText.length; //length of function text

    fxTermArray = []; //these arrays are for the terms found using regex
    fxTermOBJArray = [];

    var re = /(?:[\+\-\*\\]|^)(\w+|\d*\w+\^\(\d+\))(?=[\+\-\*\\]|$)/g; 
    //regex looking for terms. Start by checking for either start of string, or one of the operators. then get all content up to either the end of string, or one of the operators.
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
        fxTermOBJArray.push(new Term(x, findCoeff(x), findBase(x), findExp(x))); //create a Term object and push it to the array
    }
    console.log(fxTermOBJArray);
    
    var divWithInfo = document.getElementById("functionInfo");
    for (var n in fxTermOBJArray) {
        divWithInfo.innerHTML += "<p>Term: <span style='color:blue'>" + fxTermOBJArray[n].term + "</span><br>Base: " + fxTermOBJArray[n].base + "<br>Coefficient: " + fxTermOBJArray[n].coeff + " <br>Exponent: " + fxTermOBJArray[n].exp + "</p>";
    } //kinda a 'pretty print' loop for the array of Term objects
}

function Term(term, coefficient, base, exponent) { //Term object constructor 
    this.term = term;
    this.coeff = coefficient;
    this.base = base;
    this.exp = exponent;
} 

function findCoeff(term) { //finds the Coefficient of the term
    console.log(term);
    var coeffPatt = /(?!\()(\d+)(?!\))/; //regex for coefficient
    // finds any number, not in an exponent, meaning it has to be a coefficient
    var coeff = coeffPatt.exec(term);
    if (coeff) { 
        return coeff.pop();
    } else { // if the coeff is null, it evaluates false and we default to "1";
        return "1";
    }
}

function findBase(term) { //finds the Base of the term
    var basePatt = /(?!\()([a-zA-Z])(?!\))/g; //regex for base - essentially looks for letters
    // above maybe uneccesary, we already find the variable of the function which will be the base for every term so yeah uneccesary?
    var base = basePatt.exec(term);
    if (base) {
        return base.pop();
    } else { // same as coeff, if null, set default to the global variable fxBase
        return fxBase;
    }
}

function findExp(term) { //finds the Exponent of the term
    var expPatt = /\^{1}\((.*)\)/g; //regex for exponents
    // finds the contents of all exponents, which would be indicated by a '^(', and then a ')' 
    var exp = expPatt.exec(term);
    if (exp) {
        return exp.pop();
    } else { //same deal, if null, set default to zero.
        return "0";
    }
}