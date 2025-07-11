/*
    assist.js is the first javaScript file made for basic assists, such as color manipulation

    In the event you see the word lexicograph-, think Unicode.
    
    If character A has a greater unicode char designation value than character B,
            then char A > char B is true and char A < char B is false
    Strings with multiple characters check one character at a time, with "" being the least value

    As per rules of js modules, NO GLOBAL VARIABLES, constants only!

    6/24/25, hey I made an exception for no global variables: PI
    6/27/25, changed the rules to allow constants
 */

let pi=Math.PI;

// Standard Functions

/*
    rgbToHex
        QuickDesc: takes in an RGB array and returns a hexadecimal color code

        Parameters: color, should be an RGB array

        When called:
        1.  color has its first 3 elements transformed into binary and stored as rgb
        2.  rgb is transformed into an 8-digit hex code for RGBcolor and returned
 */
function rgbToHex(color){
const rgb = (color[0] << 16) | (color[1] << 8) | (color[2] << 0);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

/*
    hexToRGB
        QuickDesc: takes in a hex code and returns an RGB array

        Parameters: color, should be a hex code

        When called:
        1.  color is thrown through a regex; any results are stored as an array called result
        2.  result is shortened to include only its 1st, 2nd, and 3rd elements
        3.  All elements of result are parsed as hexadecimal into base-10
        4.  result is returned as itself
 */
function hexToRGB(color){
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  
  result = result.slice(1,4);
  for (var i=0;i<result.length;i++) {
    result[i] = parseInt(result[i],16);
  }
  return result;
}

/*
    rgbCSSWarp
        QuickDesc: takes in a CSS RGB object and returns an RGB array

        Parameters: color, should be a CSS RGB object

        When called:
        1a. color is typed to raw object then string
        1b. color is split into an array by noted string ","
        1c. 1b's result is stored as fracArray
        2.  All elements in fracArray have all but digits removed then typed to Number
        3.  fracArray is returned as itself
 */
function rgbCSSWarp(color){
    let fracArray = JSON.stringify(color).split(",");

    for (var i =0;i<fracArray.length;i++){
        fracArray[i] = fracArray[i].replace(/\D/g,"");
        fracArray[i] = Number(fracArray[i]);
    }
    
    //console.log(fracArray);
    return fracArray;
}

/*
    getDecimalTime
        QuickDesc: takes in a Date object and returns how many hours (decimal) have passed since midnight

        Parameters: time, should be a Date object
            Defaults:
                time will be a new Date object

        When called:
        1. hours is called as how many hours have passed since midnight
        2. minutes is called as how many minutes have passed since the last full hour
        3. return hours as an int and minutes as a fraction combined
 */
function getDecimalTime(time = new Date()){
    let hours = time.getHours();
    let minutes = time.getMinutes();

    return (hours+minutes/60);
}

/*
    getCurrentTime
        QuickDesc: Takes in a number and gives the annotated time

        Parameters: time, should be a number
            Defaults:
                time will be from getDecimalTime's default

        When called:
        1. hours is called as how many hours have passed since midnight
        2. minutes is called as how many minutes have passed since the last full hour
        3. timing is declared
        4. If hours is 0, then hours is 12 and timing is AM
        5. Else if hours is greater than 12, timing is PM and 12 is subtracted from hours
        6. Else timing is AM
        7. If minutes is less than 10, minutes has a leading zero
        8. Return the annotated time
 */
function getCurrentTime(time=getDecimalTime()){
    let hours = Math.floor(time%24);
    let minutes = Math.floor((time%1)*60);
    let timing;

    if (hours===0){
        hours=12;
        timing = "AM";
    } else if(hours===12){
        timing = "PM";
    } else if (hours>12) {
        timing = "PM";
        hours-=12;
    } else {
        timing = "AM";
    }

    if (minutes<10) {
        minutes = "0"+minutes;
    }

    return hours+":"+minutes+" "+timing;
}

//Custom Functions

// Link to desmos to show concepts for sunset colors:
// https://www.desmos.com/calculator/6maxcmbysb

/*
    sineColor
        QuickDesc: takes in 1-4 parameters and gives a number back

        Parameters: 
            item, should be a number
            period, should be a number
            power, should be a number
            amplitude, should be a number
        Defaulting parameters:
            period defaults to 1
            power defaults to 1
            amplitude defaults to 1

        When called:
        1. item is multiplied by period and stored as tempItem
        2. The sine of tempItem is taken and stored as tempItem
        3. tempItem is taken to the power of power and stored as tempItem
        4. tempItem is returned as tempItem * amplitude
 */
function sineColor(item,period=1,power=1,amplitude=1){
    let tempItem = item*period;
    tempItem = Math.sin(tempItem);
    tempItem = Math.pow(tempItem,power);
    return tempItem*amplitude;
}

/*
    finalizeRGBVal
        QuickDesc: Takes in 1-2 numbers and outputs a number between 0-255

        Parameters: 
            item, should be a number
            additive, should be a number
        Defaulting parameters:
            additive defaults to 0

        When called:
        1. item is summed with additive and stored as tempItem
        2. tempItem is multiplied by 16
        3. tempItem has 1 subtracted from it
        4. tempItem is rounded for RGB reasons and returned
 */
function finalizeRGBVal(item,additive=0){
    let tempItem = item+additive;
    tempItem *= 16;
    tempItem -= 1;
    return Math.round(tempItem);
}

/*
    blueShift
        QuickDesc: takes in an object and determines the RGB array for it, then
                    modifies the color to make it more of a sky-blue
                    and returns a hex code for the new color;

        Parameters: color, unknown on what it could be

        Custom Error: 
            BlueShift Error:
                BlueShift has encountered an uncomputed color error and is not prepared.

        When called:
        1.  color is typed to raw object, then string and is determined whether
            hexToRGB should be used or rgbCSSWarp should be used.
                Note: It is possible to cause an exception by using an incorrect string
        2.  After the result is returned as an RGB array called color, the first element is multiplied by 3/4
        3.  The second element checks for if it is in the correct range and adjusts itself towards it
        4.  The third element is adjusted towards a maximum of 255
        5.  All elements in color are rounded for regex purposes
        6.  color is returned as a hex code of itself
 */
function blueShift(color) {
    //console.log("Starting Color for Blue Shift: "+JSON.stringify(color)[1]);
    if (JSON.stringify(color)[1]=="#"){
        //console.log("Choosing HEXER");
        color = hexToRGB(color);
    } else if (JSON.stringify(color)[1]=="r") {
        //console.log("Choosing WARPER");
        color = rgbCSSWarp(color);
    } else {
        throw("BlueShift Error:BlueShift has encountered an uncomputed color error and is not prepared.")
    }

    color[0]*=3/4;

    if (color[1]<128-color[0]/4){
        color[1] += color[0]/4;
    } else if (color[1]>128+color[0]/4){
        color[1] -= color[0]/4;
    }

    if (color[2]+color[0]/4>=255){
        color[2]=255;
    } else {
        color[2]+=color[0]/4;
    }

    for (var i=0;i<color.length;i++){
        color[i]=Math.round(color[i]);
    }
  //console.log(color);

  return rgbToHex(color);

}

/*
    redClock
        QuickDesc: Takes in a number of how many hours (decimal) have been since midnight
         and returns how much r should be in a RGB color of the sky

        Parameters: time, should be a number

        When called:
        1. redTime is declared as 0
        2. If time is between 4 and 8 or time is between 16 and 20
        2a. sineColor with respect to time, pi/4, 2, and 12 is taken and stored as redTim
        3. finalizeRGBVal with respect to redTime and 2 is taken and returned
 */
function redClock(time){
    let redTime=0;

    if ((time>=4&&time<=8)||(time>=16&&time<=20)) {
        redTime = sineColor(time,pi/4,2,12);
    }

    return finalizeRGBVal(redTime,2);
}

/*
    greenClock
        QuickDesc: Takes in a number of how many hours (decimal) have been since midnight
         and returns how much g should be in a RGB color of the sky

        Parameters: time, should be a number

        When called:
        1. greenTime is declared as 0
        2. If time is between 5 and 8, 3 is added to greenTime
        3. Else if time is between 16 and 19, 1 is added to greenTime
        4. Else is time is between 8 and 16, 10 is added to greenTime
        5. If time is between 5 and 8 OR time is between 16 and 19
        5a. sineColor with repect to greenTime+time, pi/4, 1/2, and 13 is taken and stored as greenTime
        6. finalizeRGBVal with respect to greenTime and 1 is taken and returned
 */
function greenClock(time){
    let greenTime = 0;

    if (time>=5&&time<=8) {
        greenTime += 3;
    } else if (time>=16&&time<=19){
        greenTime ++;
    } else if (time>=8&&time<=16){
        greenTime += 10;
    }

    if ((time>=5&&time<=8)||(time>=16&&time<=19)){
        greenTime = sineColor(greenTime+time,pi/4,1/2,13);
    }

    return finalizeRGBVal(greenTime,1);
}

/*
    blueClock
        QuickDesc: Takes in a number of how many hours (decimal) have been since midnight
         and returns how much b should be in a RGB color of the sky

        Parameters: time, should be a number

        When called:
        1. sinColor with respect to time, pi/24, 4, and 13 is taken and stored as blueTime
        2. finalizeRGBVal with respect to blueTime and 3 is taken and returned
 */
function blueClock(time){
    let blueTime = sineColor(time,pi/24,4,13);
    return finalizeRGBVal(blueTime,3);
}

/*
    grayClock
        QuickDesc: Takes in a number of how many hours (decimal) have been since midnight
         and returns what the color of the navbar is to correlate
        Parameters: time, should be a number

        When called:
        1. sinColor with respect to time, pi/24, 2, and 8 is taken and stored as grayTime
        2. finalizeRGBVal with respect to grayTime and 8 is taken and stored as grayTime
        3. A hexcode is returned from an RGB array with r, g, and b all being grayTime
 */
function grayClock(time){
    let grayTime = sineColor(time,pi/24,2,8);
    grayTime = finalizeRGBVal(grayTime,8);
    return rgbToHex([grayTime,grayTime,grayTime]);
}

/*
    fullGrayClock
        QuickDesc: Takes in a number of how many hours (decimal) have been since midnight
         and returns what the color of the centerpiece is to correlate
        Parameters: time, should be a number

        When called:
        1. sineColor with respect to time, pi/24, 2, and 16 is taken and stored as grayTime
        2. finalizeRGBVal with respect to grayTime is taken and stored as grayTime;
        3. In the event that grayTime is negative, set grayTime to 0
        4. A hexcode is returned from an RGB array with r, g, and b all being grayTime
 */
function fullGrayClock(time){
    let grayTime = sineColor(time,pi/24,2,16);
    grayTime = finalizeRGBVal(grayTime);
    if (grayTime<0) grayTime=0;
    return rgbToHex([grayTime,grayTime,grayTime]);
}

/*
    panClock
        QuickDesc: takes in time and gives an array of what the hub colors should be

        Parameters: 
            time, should be a number

        When called:
        1. sineColor with respect to time, pi/24, 2, and -4 is taken and stored as fftobb
        2. finalizeRGBVal with respect to fftobb, and 16 is taken and stored as fftobb
        3. sineColor with respect to time, pi/24, 2, and -4 is taken and stored as eight8to44
        4. finalizeRGBVal with respect to eight8to44, and 8 is taken and stored as eight8to44
        5. sineColor with respect to time, pi/24, 2, and -8 is taken and stored as ffto88
        6. finalizeRGBVal with respect to ffto88, and 16 is taken and stored as ffto88
        7. rgbToHex with only fftobb as its red and 0s else is taken and stored as redColor
        8. rgbToHex with fftobb as red and eight8to44 as green and 0 as blue is taken and stored as orangeColor
        9. rgbToHex with fftobb as red and ffto88 as green and 0 as blue is taken and stored as yellowColor
        10. rgbToHex with only fftobb as green and 0s else is taken and stored as greenColor
        11. rgbToHex with only fftobb as blue and 0s else is taken and stored as blueColor
        12. An array is declared with [redColor,greenColor,orangeColor,blueColor,yellowColor] and returned
        (Note:the array is arranged for contrasting purposes)
 */
function panClock(time){
    //Basics
    let fftobb = sineColor(time,pi/24,2,-4);
    fftobb = finalizeRGBVal(fftobb,16);

    let eight8to44 = sineColor(time,pi/24,2,-4);
    eight8to44 = finalizeRGBVal(eight8to44,8);

    let ffto88 = sineColor(time,pi/24,2,-8);
    ffto88 = finalizeRGBVal(ffto88,16);

    //RedPan
    //Day   - #BB0000
    //Night - #FF0000
    let redColor = rgbToHex([fftobb,0,0]);

    //OrangePan
    //Day   - #BB4400
    //Night - #FF8800
    let orangeColor = rgbToHex([fftobb,eight8to44,0]);

    //YellowPan
    //Day   - #BB8800
    //Night - #FFFF00
    let yellowColor = rgbToHex([fftobb,ffto88,0]);

    //GreenPan
    //Day   - #00BB00
    //Night - #00FF00
    let greenColor = rgbToHex([0,fftobb,0]);

    //BluePan
    //Day   - #0000BB
    //Night - #0000FF
    let blueColor = rgbToHex([0,0,fftobb]);

    return [redColor,greenColor,orangeColor,blueColor,yellowColor];
}

/*
    colorTime
        QuickDesc: Takes in a number of how many hours (decimal) have been since midnight
         and returns a hexcode of what the color of the sky might be

        Parameters: time, should be a number

        When called:
        1. An unamed array is declared and stores the result of redClock, greenClock, and blueClock with respect to time
        2. A hexcode is returned from the array and returned to the caller
 */
function colorTime(time){
    return rgbToHex([redClock(time),greenClock(time),blueClock(time)]);
}

/*
    navCompatCreate
        QuickDesc: changes the color of each navbar and related elements to a more desirable color

        Parameters: time, should be a number
        In default paramters:
            time = 0

        When called:
        1. navList is declared and stores all instances of the class navbar and class slider-container;
        2. For each item in navList...
        2a. The background color is given by grayClock with respect to the current hours and time
 */
function navCompatCreate(time=0){
    let navList = [...document.querySelectorAll(".navbar"),...document.querySelectorAll('.slider-container')];

    navList.forEach(function(element){
        element.style.backgroundColor = grayClock(time%24);
    });
}

/*
    skyCompatCreate
        QuickDesc: changes the color of each navbar and related elements to a more desirable color

        Parameters: time, should be a number
        In default paramters:
            time = 0

        When called:
        1. skyColor is declared as the color of the sky from the current hours and time
        2. For 10 times iterated with i as counter
        2a. If i is 0
        2aa. The element with the class sky-start's background color is skyColor
        2ab. The first element with the class sky-piece's background color is blueShift in skyColor
        2b. If i is not 0
        2ba. The given element out of an array with all elements of class sky-piece's background color is the blueShift in the background color of the element before in the array
 */
function skyCompatCreate(time=0){
    let skyColor = colorTime(time%24); 
    for (var i=0;i<10;i++){
        if (i==0){
            document.querySelector(".sky-start").style.backgroundColor = skyColor;
            document.querySelectorAll(".sky-piece")[i].style.backgroundColor = blueShift(skyColor);
        } else {
            document.querySelectorAll(".sky-piece")[i].style.backgroundColor = blueShift(document.querySelectorAll(".sky-piece")[i-1].style.backgroundColor);
        }
    }
}

/*
    hubTextColorUpdate
        QuickDesc: changes the text color and background color of the links to other places in the hub

        Parameters: color, should be a hex code

        When called:
        1. textColor is declared as the hex code #000000
        2. If color has a greater lexicographical value than #808080, then textColor stores #FFFFFF instead
        3. For all instances of .hub-text and an iterated instance called element
        3a. element's style's value for color is textColor
        3b. element's style's value for backgroundColor is color
 */
function hubTextColorUpdate(color){
    let textColor = "#000000";
    if (color<"#808080") textColor = "#FFFFFF";
    document.querySelectorAll(".hub-text").forEach(function(element){
        element.style.color = textColor;
        element.style.backgroundColor = color;
    });
}

/*
    createSky
        QuickDesc: Creates the background that is in all websites by manipulating divs

        Parameters: time, should be a number
        In default parameters:
            time=0

        When called:
        1. skyGivenHeight is declared as the screen's height
        2. The next few steps are repeated 10 times, using i as a tracker
        2a. skyPiece is declared as a div element
        2b. skyPiece has the class sky-piece
        2c. skyGivenHeight is multiplied by 2/3
        2d. If i is 0, follow here
        2da. skyStart is declared as the element with a class sky-start
        2db. skyPiece's height is given as skyGivenHeight as pixels;
        2dc. skyStart adds skyPiece to the end
        2e. If i is not 0, follow here
        2ea. prevSky is declared as the item before current in an array with all elements with class sky-piece
        2eb. skyPiece's height is given as skyGivenHeight as pixels
        2ec. preSky adds skyPiece to the end
        3. skyCompatCreate with respect to time for color


 */
function createSky(time=0){
    let skyGivenHeight = window.innerHeight; 
    for(var i=0;i<10;i++){ 
        let skyPiece = document.createElement("div");
        skyPiece.setAttribute("class","sky-piece");
        
        skyGivenHeight*=2/3;
        if (i==0){
            let skyStart = document.querySelector(".sky-start");
            skyPiece.style.height = skyGivenHeight+"px";
            //console.log(skyPiece.style.height);
            skyStart.appendChild(skyPiece);
            
        } else {
            let prevSky = document.querySelectorAll(".sky-piece")[i-1];
            //console.log(skyHeight);
            skyPiece.style.height = skyGivenHeight+"px";
            prevSky.appendChild(skyPiece);
            //console.log(skyPiece.style.backgroundColor);
        }

    }
    skyCompatCreate(time);
}

// Event Listeners - after loading, please
document.addEventListener("DOMContentLoaded",function(){

    /*
        Slider bar's oninput
        QuickDesc: Updates the color theme

        Parameters: event, the event itself

        When called:
        1. The element with class hours-after's innerHTML is now the event's target value
        2. Update navbar coloring with the event's target value
        3. Update background coloring with the event's target value


    */
    document.querySelector(".slider").addEventListener("input",function(event){
        document.querySelector(".hours-after").innerHTML = getCurrentTime(event.target.value);
        navCompatCreate(event.target.value);
        skyCompatCreate(event.target.value);
    });

    // Cookie Handler for slider
    document.querySelector(".slider").addEventListener("change",function(event){
        document.cookie = "timeAdder:"+event.target.value;
    });
});

//Cookie Handler (No, they're not chocolate chip sorry)
// Looks for a cookie and resorts to default if its not there
function findTime(){
    var start = document.cookie.indexOf("timeAdder:");

    if (start===-1){
        return getDecimalTime();
    }

    var stop = document.cookie.length;

    return Number(document.cookie.substring(start+10,stop));
}

// Cookie Reset
function cookieReset(){
    document.cookie="hello!";
}
//cookieReset();