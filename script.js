$(document).ready(function () {
    $(".functionField").keydown(function (event) {
        //the event is a key 
        which = event.which; //ASCii value
        key = event.key //Actual key as a string

        console.log("Which: " + which +
            "\nKey: " + key);
        
        isShift = event.shiftKey; //bool true if shift key is pressed
        if (isShift) {
            switch (which) {
            case 16: // ignore shift key
                break;
            default: // everything else goes here
                if( key == "^" ) {
                    //do stuff for tested key string
                    console.log("The ^ key was pressed");
                }
                break;
            }
        }

    });
});