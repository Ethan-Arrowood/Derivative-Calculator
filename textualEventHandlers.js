$(document).ready(function () {
    $('.entryField').on("focus", function () {
        console.log($(this).html());
        $(this).empty();
    }).on("focusout", function () {
        var textContent = $(this).html();
        console.log(textContent);
        if (textContent == "<br>") {
            $(this).text("Enter Function Here!");
        }
    })

    $('td').bind("click", getTitle);
})

var getTitle = function (t) {
    console.log($(this).attr("title"))
}

var getTitleForInvTrigFx = function (t) {
    var trigFxName = $(this).attr("title");
    console.log("a" + trigFxName[0] + trigFxName[2]);
}

var invtrig = function (c) {
    if (c == "t") {
        $('.tinvtrig').addClass('finvtrig').removeClass('tinvtrig');
        $('.trigFx').bind("click", getTitle);
        $('.trigFx').unbind("click", getTitleForInvTrigFx);
        $('.base').text("x").attr("title", "bas");
    } else {
        $('.finvtrig').addClass('tinvtrig').removeClass('finvtrig');
        $('.trigFx').unbind("click", getTitle);
        $('.trigFx').bind("click", getTitleForInvTrigFx);
        $('.base').html("&pi;").attr("title", "pi_");
    }


}