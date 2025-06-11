/*
    assist.js is the first javaScript file made for basic assists, such as color manipulation

    As per rules of js modules, NO GLOBAL VARIABLES
 */

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

//Custom Functions

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

function getDecimalTime(){
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    return (hours+minutes/60);
}

// Link to desmos to show concepts:
// https://www.desmos.com/calculator/quyaf8r8sd 


function redClock(time){
    let redTime=0;

    if ((time>=4&&time<=8)||(time>=16&&time<=20)) {
        redTime = time*Math.PI/4;
        redTime = Math.sin(redTime);
        redTime = Math.pow(redTime,2);
        redTime *= 12;
    }

    return (redTime+2)*16;
}

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
        greenTime += time;
        greenTime *= Math.PI/4;
        greenTime = Math.sin(greenTime);
        greenTime = Math.pow(greenTime,1/2);
        greenTime *= 13;
    }

    return (greenTime+1)*16;
}

function blueClock(time){
    blueTime = time*Math.PI/24;
    blueTime = Math.sin(blueTime);
    blueTime = Math.pow(blueTime,4);
    blueTime *= 13;
    blueTime += 3;

    return blueTime*16;
}

function colorTime(time){
    return rgbToHex([redClock(time),greenClock(time),blueClock(time)]);
}