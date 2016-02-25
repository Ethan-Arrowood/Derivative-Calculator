//Having trouble getting key recognition to work
//Leaving code here for reference later
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

function evaluatefx() {
    fxText = $("#functionInput").html(); //raw string of function
    fxLength = fxText.length; //length of function text
    
    fxFinal = $(".functionField"); //get the div where we will place info/better formatted function
    
    termCount = 1; //These two variables will be for multiple terms and exponents
    exponentCount = 1;
    
    fxTermArray = []; //These arrays will be used to store terms and exponents
    fxExpArray = [];
    //maybe make one list where the key is the term and the value is the exponent?
    
    var termPatt = /(\d*\w{1}\d*)/ //regex for terms
    var expPatt = /\^{1}\u0028(.*)\u0029/ //regex for exponents
    var termResult = termPatt.exec(fxText).pop(); //get the term from fxText
    //var result = fxText.match(termPatt).pop(); //does the same as above
    var expResult = expPatt.exec(fxText).pop(); //get the exponent from fxText
    //var result = fxText.match(expPatt).pop(); //does the same as above
    console.log("Function: " + fxText +
                "\nTerm 1: " + termResult +
                "\nExponent 1: " + expResult) //log the info
    
    fxFinal.html("<u>Function:</u> " + fxText +
                " <u>Term 1:</u> " + termResult +
                " <u>Exponent 1:</u> " + expResult) //send the info to the front end
}


