//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately 
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
//When clicking on control list items
//This click method is binded only to list elements that we already on the page, won't work for NEW li elements (newColors)!!
 /* $(".controls li").click(function() {
        //Deselect sibling elements
        $(this).siblings().removeClass("selected");
        //Select clicked elements
        $(this).addClass("selected")
        //cache current color here
        color = $(this).css("background-color");
    });
  */

//Use this instead to define what will happen on a click for new li elements as well!
//Second parameter in "on" is the child element of the parent which in this case is the .controls class
$(".controls").on("click", "li", function() {
        //Deselect sibling elements
        $(this).siblings().removeClass("selected");
        //Select clicked elements
        $(this).addClass("selected")
        //cache current color here
        color = $(this).css("background-color");
    });

//When "new color" is pressed
$("#revealColorSelect").click(function () {
    changeColor();
    //Show color select or hide the color select
    $("#colorSelect").toggle();
});

//Update the new color span
function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

//When color sliders change
$("input[type=range]").on("input", changeColor);
    
//When "add color" is pressed
$("#addNewColor").click( function () {
    //Append the color to the controls
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    
    //Append the color to the ul list
    $(".controls ul").append($newColor);
    
    //Select the new color
    $newColor.click(); //You already defined how clicking on an li element within the .controls class works. Don't repeat yourself and just call click and the same code will run!
    //But there's a drawback! The click method is only bounded to elements that we already on the page! Make sure you use the "on" method to define the click for new li elements! 
    
    /*Could do the following, but don't have to repeat yourself. Just call the click() method!
    $newColor.siblings().removeClass("selected");
    $newColor.addClass("selected"); 
    */
});
     

////On mouse events on canvas, draw lines
$canvas.mousedown( function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    //draw lines
    if(mouseDown){
        context.beginPath(); //Need this to start
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY); //start drawing from
        context.lineTo(e.offsetX, e.offsetY); 
        context.strokeStyle = color; //Makes sure to update the color of the line!
        context.stroke(); //Actually draw what you specified from offsets    
    }
     lastEvent = e; //So that every time the mouse moves, it starts drawing a line from where the pen was before.
}).mouseup(function () {
    //Don't need event "e" here since we're using our mouseDown variable to check conditions for us.
    mouseDown = false;
}).mouseleave(function () {
    //This function detects when the mouse leaves a dom element
    //When leaving the "canvas" element, set mouseDown back to false so that mouseMove doesn't work when re-entering the pad while already holding down the mouse.
    $canvas.mouseup()
});













/*    //Draw lines
context.beginPath();
context.moveTo(10, 10); //where pen starts drawing
context.lineTo(20, 10);
context.lineTo(20, 20);
context.lineTo(10, 20);
context.closePath(); //automatically closes square for you!
context.stroke(); //actually draws the line for you

*/







