/*
    This file is meant to be used with 6 corresponding canvas elements. Failure to do so will result in repeated errors about missing canvas

    This file is made so there can be things made in 3d in a 2d area and any canvas shapes
*/

// Custom Classes

/*
    Point class

    QuickDesc: The point class is merely to give a name to coordinates.
    Its only true function is to remember where its going and where it started

    init: 1 parameter required, 0 optional
        coord, should be an array of numbers
    
    on init:
        this.orgCoord and this.curCoord take a value of coord;
    
    functions:
        getCurCoords (self-explanatory)
        setCurCoords (self-explanatory)

*/ 
class Point{
    constructor(coord){
        this.orgCoord = coord;
        this.curCoord = coord;
    }
    getCurCoords = function(){
        return this.curCoord;
    }
    setCurCoords = function(coords){
        this.curCoord = coords;
    }
}

/*
    Polygon class

    QuickDesc: Is a list of coordinates. Also contains its color and borderColor

    init: 1 parameter required, 2 optional
        pointsList, should be a list of Points
        color, should be a hex code
        borderColor, should be a hex code
    
        defaults:
            color defaults to ""
            borderColor defaults to ""
    
    on init:
        this.pointsList takes a value of pointsList
        this.color takes a value of color
        this.borderColor takes a value of borderColor
    
    functions:
        setColor (partially-selfExplanatory):
            2 parameters required, 0 optional
        color, should be a hex code
        borderColor, should be a hex code
        steps:
            1. this.color takes a valiue of color
            2. this.borderColor takes a value of color

        getPointsList (self-explanatory)
        getColor (self-explanatory)
        getBorderColor (self-explanatory)

        getPriority
            0 parameters
            quickDesc: gives back the average y-coord value of its Points
        steps:
            1. sum is declared as the 2nd item of curCoord of the 1st element of the polygon's own pointsList
            2. sum is added to the 2nd item of curCoord of the 2nd element of the polygon's own pointsList
            3. sum is added to the 2nd item of curCoord of the 3rd element of the polygon's own pointsList
            4. sum is returned as itself;
        

*/ 
class Polygon{
    constructor(pointsList,color="",borderColor=""){
        this.pointsList=pointsList;
        this.color=color;
        this.borderColor=borderColor;
    }
    setColor = function(color,borderColor){
        this.color=color;
        this.borderColor=borderColor;
    }
    getPointsList = function(){
        return this.pointsList;
    }

    getColor = function(){
        return this.color;
    }
    getBorderColor = function(){
        return this.borderColor;
    }
    getPriority = function(){
        let sum = this.pointsList[0].getCurCoords()[1];
        sum += this.pointsList[1].getCurCoords()[1];
        sum += this.pointsList[2].getCurCoords()[1];
        return sum;
    }
}

/*
    Icosahedron class

    QuickDesc: Is a list of 20 polygons (preferably triangles)

    init: 1 parameter required, 0 optional
        polygons, should be a list of Polygons
    
    on init:
        this.polygons takes a value of polygons

    functions:
        setPolygonsList (self-explanatory):
        getPolygonsList (self-explanatory)

*/ 
class Icosahedron{
    constructor(polygons){
        this.polygons = polygons;
    }

    setPolygonList = function(polygons){
        this.polygons = polygons;
    }

    getPolygonList = function(){
        return this.polygons;
    }
}
let ico = new Icosahedron([]);

/*
    Vector class

    QuickDesc: Is a list of vector operations. Useful with vectors 
    (Point objects also work if and only if the vector is from the origin)
    PURELY STATIC (Kind of like the Math class)
*/ 
class Vector{
    //Basic Vector Operations

    /*
        crossProduct
        
        QuickDesc: This takes the plane of two vectors and gives a 3rd, perpendicular vector
        
        2 parameters required
            vector1, should be a vector
            vector2, should be a vector
        
        steps:
            1a. sector1a is the 2nd element of vector 1 times the 3rd element of vector2
            1b. sector1b is the 2nd element of vector 2 times the 3rd element of vector1
            1c. sector1b is subtracted from sector1a and stored as part1
            2a. sector2a is the 3rd element of vector 1 times the 1st element of vector2
            2b. sector2b is the 1st element of vector 1 times the 3rd element of vector2
            2c. sector2b is subtracted from sector2a and stored as part2
            3a. sector3a is the 1st element of vector 1 times the 2nd element of vector2
            3b. sector3b is the 2nd element of vector 1 times the 1st element of vector2
            3c. sector3b is subtracted from sector3a and stored as part3
            4. The vector [part1,part2,part3] is returned
    */
    static crossProduct(vector1,vector2){
        let part1 = vector1[1]*vector2[2]-vector2[1]*vector1[2];
        let part2 = vector1[2]*vector2[0]-vector2[2]*vector1[0];
        let part3 = vector1[0]*vector2[1]-vector2[0]*vector1[1];

        return [part1,part2,part3];
    }

    /*
        dotProduct
        
        QuickDesc: This is the sum of equivalent elements multiplied
        
        2 parameters required
            vector1, should be a vector
            vector2, should be a vector
        
        steps:
            1. part1 is declared as the 1st element of vector 1 times the 1st element of vector 2
            2. part2 is declared as the 2nd element of vector 1 times the 2nd element of vector 2
            3. part3 is declared as the 3rd element of vector 1 times the 3rd element of vector 2
            4. The sum (part1+part2+part3) is returned
    */
    static dotProduct(vector1,vector2){
        let part1 = vector1[0]*vector2[0];
        let part2 = vector1[1]*vector2[1];
        let part3 = vector1[2]*vector2[2];

        return part1+part2+part3;
    }

    /*
        scalarProduct
        
        QuickDesc: This multiplies all components of a vector by a multiplier
        
        2 parameters required
            vector1, should be a vector
            multiplier, should be a number
        
        steps:
            1. part1 is declared as the 1st element of vector 1 times the multiplier
            2. part2 is declared as the 2nd element of vector 1 times the multiplier
            3. part3 is declared as the 3rd element of vector 1 times the multiplier
            4. The vector [part1,part2,part3] is returned
    */
    static scalarProduct(vector1,multiplier){
        let part1 = vector1[0]*multiplier;
        let part2 = vector1[1]*multiplier;
        let part3 = vector1[2]*multiplier;

        return [part1,part2,part3];
    }

    /*
        addition
        
        QuickDesc: This is the sum of vectors by adding thier components into a new vector
        
        2 parameters required
            vector1, should be a vector
            vector2, should be a vector
        
        steps:
            1. part1 is declared as the 1st element of vector 1 plus the 1st element of vector 2
            2. part2 is declared as the 2nd element of vector 1 plus the 2nd element of vector 2
            3. part3 is declared as the 3rd element of vector 1 plus the 3rd element of vector 2
            4. The vector [part1,part2,part3] is returned
    */
    static addition(vector1,vector2){
        let part1 = vector1[0]+vector2[0];
        let part2 = vector1[1]+vector2[1];
        let part3 = vector1[2]+vector2[2];

        return [part1,part2,part3];
    }

    /*
        subtraction
        
        QuickDesc: This is the difference of vectors by subtracting thier components into a new vector
        
        2 parameters required
            vector1, should be a vector
            vector2, should be a vector
        
        steps:
            1. part1 is declared as the 1st element of vector 1 minus the 1st element of vector 2
            2. part2 is declared as the 2nd element of vector 1 minus the 2nd element of vector 2
            3. part3 is declared as the 3rd element of vector 1 minus the 3rd element of vector 2
            4. The vector [part1,part2,part3] is returned
    */
    static subtraction(vector1,vector2){
        let part1 = vector1[0]-vector2[0];
        let part2 = vector1[1]-vector2[1];
        let part3 = vector1[2]-vector2[2];

        return [part1,part2,part3];
    }

    /*
        tripleCrossProduct
        
        QuickDesc: This is three different vectors coming together into one vector
        
        2 parameters required
            vector1, should be a vector
            vector2, should be a vector
            vector3, should be a vector
        
        steps:
            1. scalar1 is declared as the dotProduct of vector1 and vector3
            2. scalar2 is declared as the dotProduct of vector1 and vector2
            3. partialVector1 is declared as the scalarProduct between vector2 and scalar1
            4. partialVector2 is declared as the scalarProduct between vector3 and vector2
            5. The subtraction of partialVector2 from partialVector1 is taken and returned
    */
    static tripleCrossProduct(vector1,vector2,vector3){
        let scalar1 = this.dotProduct(vector1,vector3);
        let scalar2 = this.dotProduct(vector1,vector2);

        let partialVector1 = this.scalarProduct(vector2,scalar1);
        let partialVector2 = this.scalarProduct(vector3,scalar2);

        return this.subtraction(partialVector1,partialVector2);
    }

    // Rotational Operations
    /*
        vectorParallelTo
        
        QuickDesc: This takes the parallel vector to an axis out of a vector
        
        2 parameters required
            vector1, should be a vector
            vectorAxis, should be a vector
        
        steps:
            1. scalarNum is declared as the dotProduct between vector1 and vectorAxis
            2. scalarDenom is declared as the dotProduct between vectorAxis and vectorAxis
            3. scalar1 is declared as scalarNum divded by scalarDenom
            4. The scalarProduct between vectorAxis and scalar1 is taken and returned
    */
    static vectorParallelTo(vector1,vectorAxis){
        let scalarNum = this.dotProduct(vector1,vectorAxis);
        let scalarDenom = this.dotProduct(vectorAxis,vectorAxis);
        let scalar1 = scalarNum/scalarDenom;

        return this.scalarProduct(vectorAxis,scalar1);
    }

    /*
        vectorPerpendicularTo
        
        QuickDesc: This takes the perpendicular vector to an axis out of a vector
        
        2 parameters required
            vector1, should be a vector
            vectorAxis, should be a vector
        
        steps:
            1. antiVectorAxis is declared as the scalarProduct between vectorAxis and -1
            2. The tripleCrossProduct with respect to antiVectorAxis, vectorAxis, and vector1 and returned
    */
    static vectorPerpendicularTo(vector1,vectorAxis){
        let antiVectorAxis = this.scalarProduct(vectorAxis,-1);

        return this.tripleCrossProduct(antiVectorAxis,vectorAxis,vector1);
    }

    /*
        keyedVector
        
        QuickDesc: This takes the perpendicular vector to an axis out of a vector that is specifically perpendicular in certain planes
        
        2 parameters required
            vector1, should be a vector
            vectorAxis, should be a vector
        
        steps:
            1. The crossProduct of vectorAxis and vector1 is taken and returned
    */
    static keyedVector(vector1,vectorAxis){
        return this.crossProduct(vectorAxis,vector1);
    }

    /*
        rotateVector
        
        QuickDesc: This gives a rotated vector given an angle and the axial vector
        
        3 parameters required
            vector1, should be a vector
            vectorAxis, should be a vector
            angle, should be a number (in degrees)
        
        steps:
            1. radianAngle is taken as angle*pi/180 for Math related reasons
            2. part1 is taken as the parallel vector to vectorAxis from vector1
            3. part2 is taken as the scalarProduct between the perpendicular vector to vectorAxis from vector1 and the cosine of radianAngle
            4. part3 is taken as the scalarProduct between the keyed vector to vectorAxis from vector1 and the sine of radianAngle
            5. The sum of part1, part2, and part3 is taken and returned
    */
    static rotateVector(vector1,vectorAxis,angle){
        let radianAngle = angle*pi/180;

        let part1 = this.vectorParallelTo(vector1,vectorAxis);
        let part2 = this.scalarProduct(this.vectorPerpendicularTo(vector1,vectorAxis),Math.cos(radianAngle));
        let part3 = this.scalarProduct(this.keyedVector(vector1,vectorAxis),Math.sin(radianAngle));

        return this.addition(part1,this.addition(part2,part3));
    }

}

// constants and incrementers (Yes, these let statements are out of place. No, Im not moving them because of scope reasons)
const width = window.innerWidth*1/2;
const x=width,y=width;
const hx=x/2,hy=y/2;
const dividerStart = hx/5;
//const pi = Math.PI;
let degreeAmount = 0;
let axisAngle = 90;

/* 
    initMainCanvasses is a nester function,
    
    I wont go into too much detail here due to its complexity

    This is the function responsible for making all of the hub except for text (which is handled by a CSS function)
    It is also responsible for making the hub responsive for hovering and clicking on it

    The nested functions are used only in the nester function and require a scope found in the nester function

    */
function initMainCanvasses(color,colorArray){
    // Necessay variables and constants
    const rotationInc = pi*0.4;
    let gradient;
    let lineWidth = x/100;
    let colorRGB = hexToRGB(color);
    let panGradient = [false,false,false,false,false];
    let prevI=-1;

    // These hex codes are what the colors should be at 12:00 PM and 12:00 AM

    //Day   - #BB0000
    //Night - #FF0000
    let redPan = document.querySelector("#pan-1");
    //Day   - #00BB00
    //Night - #00FF00
    let greenPan = document.querySelector("#pan-2");
    //Day   - #BB4400
    //Night - #FF8800
    let orangePan = document.querySelector("#pan-3");
    //Day   - #0000BB
    //Night - #0000FF
    let bluePan = document.querySelector("#pan-4");
    //Day   - #BB8800
    //Night - #FFFF00
    let yellowPan = document.querySelector("#pan-5");

    let panArray = [redPan,greenPan,orangePan,bluePan,yellowPan];

    /*
        findPointer
        QuickDesc: locates the pointer relative to the center of the canvas 
            and provides the supposed pan and index for where the pointer is

        Parameters: event, an Event

        When called:
        1. panTobe is declared
        2. boundRect is declared as the first HTMLElement that is a canvas element with id ico-place's ClientRectBounds
        3. handlerX is declared as the difference between event's clientX, boundRect's left value, and hx
        4. handlerY is declared as the negation of the difference between event's clientY, boundRect's top value, and hy
        5. angleDeterminer is declared as the sum of arctangent from origin to coord (-1*handlerX,-1*handlerY) and pi
        6. angleDeterminer is converted from radians to degrees
        7. 90 degrees is subtracted from angleDeterminer
        8. is angleDeterminer is negative, 360 is added to it
        9. i is declared now for scope reasons
        10. For 5 times with i as iterator starting at 0
        10a. If angleDeterminer is less than (i+1)*72 and angleDeterminer is greater than i*72
        10aa. panTobe is saved as the item in panArray as item i
        10ab. break for loop started in step 10
        10b. An array of [panToBe,i] is returned

    */
    function findPointer(event){
        let panToBe;
        let boundRect = document.querySelector("canvas#ico-place").getBoundingClientRect();
        let handlerX = event.clientX-boundRect.left-hx;
        let handlerY = (event.clientY-boundRect.top-hy)*-1;
        let angleDeterminer = Math.atan2(-1*handlerY,-1*handlerX)+pi;
        angleDeterminer *= 180/pi;
        angleDeterminer -= 90;
        if(angleDeterminer<=0)angleDeterminer+=360;
        //console.log((event.clientY-boundRect.top)*-1+hy);
        let i;
        for (i=0;i<5;i++){
            if (angleDeterminer<=(i+1)*72&&angleDeterminer>=i*72){
                panToBe = panArray[i];
                break;
            }
        }
        return [panToBe,i];
    }

    /*
        transparentGradient
        QuickDesc: creates a fading gradient and returns it

        Parameters: 
            8 required
                handler, should be a 2d Context
                xPos, should be a number
                yPos, should be a number
                radius1, should be a number
                radius2, should be a number
                color, should be a hex code
                stepMid, should be a number between 0 and 1
                stepEnd, should be a number between 0 and 1

        When called:
        1. gradient is declared as a radialGradient with respect to xPos, yPos, radius1, and radius2
        2. gradient adds a color stop at 0% with color color
        3. gradient adds a color stop at stepMid with color color
        4. gradient adds a color stop at stepEnd with a CSS RGB code of colorRGB / 0%
        5. gradient is returned as itself

    */

    function transparentGradient(handler,xPos,yPos,radius1,radius2,color,stepMid,stepEnd){
        let gradient = handler.createRadialGradient(xPos,yPos,radius1,xPos,yPos,radius2);
        gradient.addColorStop(0.0,color);
        gradient.addColorStop(stepMid,color);
        gradient.addColorStop(stepEnd,`rgb(${colorRGB[0]} ${colorRGB[1]} ${colorRGB[2]} /0%)`);
        return gradient;
    }

    /*
        clickTo
        QuickDesc: Takes an event and sends the user to a specified page

        Parameters: event, should be an Event

        When called:
        1. i is declared as the corresponder item from findPointer with respect to event
        2. i is on a switch
        2a. case 0: open aboutme.html
        2b. case 1: open adventures.html
        2c. case 2: open coding.html
        2d. case 3: open mrp.html
        2e. case 4: open nextech.html

    */
    function clickTo(event){
        let [,i] = findPointer(event);
        switch (i) {
            case 0:
                window.open("aboutme.html","_self");
                break;
            case 1:
                window.open("adventures.html","_self");
                break;
            case 2:
                window.open("coding.html","_self");
                break;
            case 3:
                window.open("mrp.html","_self");
                break;
            case 4:
                window.open("nextech.html","_self");
                break;   
        }
    }

    /*
        panHover
        QuickDesc: When the mouse is moved, this function activates is the pointer is in the canvas

        Parameters: event, should be an Event

        When called:
        1. panToBe and i are declared from the results of findPointer with respect to event
        2. givenAngle is declared as the difference between pi*3/2 and rotationInc*prevI
        3. aligner is declared as the difference between givenAngle and rotationInc/2
        4. supplement is declared as the difference between givenAngle and rotationInc
        5. If prevI is not equal to i OR prevI is equal to -1
        5a. The item in panGradient at index prevI is now false
        5b. If prevI is not equal to -1
        5ba. handler is declared as the item in panArray at index prevI's 2D Context;
        5bb. handler's globalCompositeOperation is set to destination-out (carver functions)
        5bc. Next steps repeated twice:
        5bca. handler forms an arc at center coordinates (<givenX>,<givenY>), and with a radius of dividerStart, an angle range from givenAngle to supplement and force counterclockwise
        5bcb. handler is forced to draw a line from steps 2bfa to 2bfc
        5bcc. handler forms an arc at center coordinates (<givenX>,<givenY>), and with a radius of hy, and an angle range from supplement to givenAngle
        5bcd. handler draws a line from (<givenX1>,<givenY1>) to (<givenX2>,<givenY2>)
        5bce. handler's fillStyle is set to the result of transparentGradient with respect to handler, hy, hy, dividerStart+lineWidth,hy,color,0.75,and 1
        5bcf. handler fills the path
        5bd. handler's globalCompositeOperation is set to source-over (draw-over functions)
        5c. prevI is set to i
        6. If the item panGradient at index i is NOT true
        6a. handler is declared as panToBe's 2D Context
        6b. handler forms an arc at center coordinates (<givenX>,<givenY>), and with a radius of dividerStart, an angle range from givenAngle to supplement and force counterclockwise
        6c. handler is forced to draw a line from steps 2bfa to 2bfc
        6d. handler forms an arc at center coordinates (<givenX>,<givenY>), and with a radius of hy, and an angle range from supplement to givenAngle
        6e. handler draws a line from (<givenX1>,<givenY1>) to (<givenX2>,<givenY2>)
        6f. handler's fillStyle is set to the result of transparentGradient with respect to handler, hy, hy, dividerStart+lineWidth,hy,colorArray[i],0.75,and 1
        6g. handler fills the path
        6h. The item in panGradient is set to true
    */
    function panHover(event){
        let [panToBe,i] = findPointer(event);
        let givenAngle = pi*3/2-rotationInc*prevI;
        let aligner = givenAngle-rotationInc/2;
        let supplement = givenAngle-rotationInc;
        //console.log(prevI+","+i);
        if (prevI!==i||prevI===-1){
            panGradient[prevI] = false;
            if (prevI!==-1) {

                let handler = panArray[prevI].getContext("2d");
                handler.globalCompositeOperation = "destination-out";
                for (var j=0;j<2;j++){
                    //arcHandler(handler,hx,hy,dividerStart,hy,givenAngle,supplement,aligner,lineWidth*3/2,color,"rgb(0 0 0 / 0%)",0.1,0.75,1);
                    handler.arc(hx+Math.cos(aligner)*lineWidth*3/2,hy+Math.sin(aligner)*lineWidth*3/2,dividerStart,givenAngle,supplement,true);
                    handler.arc(hx+Math.cos(givenAngle)*lineWidth/1,hy+Math.sin(givenAngle)*lineWidth,hy,supplement,givenAngle);
                    handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth*Math.sin(aligner));
                    handler.fillStyle = transparentGradient(handler,hx,hy,dividerStart+lineWidth,hy,color,0.75,1);
                    handler.fill();
                }
                handler.globalCompositeOperation = "source-over";
            }

            prevI = i;
            //console.log(prevI===i);
        }
        if (!panGradient[i]){

            let handler = panToBe.getContext("2d");
            handler.arc(hx+Math.cos(aligner)*lineWidth*3/2,hy+Math.sin(aligner)*lineWidth*3/2,dividerStart,givenAngle,supplement,true);
            handler.arc(hx+Math.cos(givenAngle)*lineWidth*1,hy+Math.sin(givenAngle)*lineWidth*1,hy,supplement,givenAngle);
            handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth*1*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth*1*Math.sin(aligner));
            handler.fillStyle = transparentGradient(handler,hx,hy,dividerStart+lineWidth,hy,colorArray[i],0.0,0.75);
            handler.fill();

            panGradient[i] = true;
        }
    }

    /*
        formHover
        QuickDesc: When the mouse is in the canvas an does any action, this function handles it
            Includes mouse hovering, mouse clicking, and the mouse moving in, out, and within

        Parameters: none

        When called:
        1. targetPan is declared as the first HTMLElement with id pan-5
        2. targetPan is given a new EventListener that looks for the mouse entering targetPan and does the following with the Event as parameter event:
        2a. targetPan is given a new EventListener that looks for the mouse moving within targetPan and calls panHover with respect to event
        2b. targetPan is given a new EventListener that looks for the mouse clicking on targetPan and calls clickTo with respect to event
        2c. targetPan is given a new EventListener that looks for the mouse leaving targetPan and calls easyLeave, which does the following:
        2ca. targetPan has the EventListener made in step 2a removed
        2cb. targetPan has the EventListener made in step 2b removed
        2cc. targetPan has the EventListener made in step 2c removed
        2cd. panToBe and i are declared as the results of findPointer with respect to event
        2ce. givenAngle is declared as the difference between pi*3/2 and rotationInc*prevI
        2cf. aligner is declared as the difference between givenAngle and rotationInc/2
        2cg. supplement is declared as the difference between givenAngle and rotationInc
        2ch. handler is declared as panToBe's 2D Context;
        2ci. handler's globalCompositeOperation is set to destination-out (carver functions)
        2cj. Next steps repeated twice:
        2cja. handler forms an arc at center coordinates (<givenX>,<givenY>), and with a radius of dividerStart, an angle range from givenAngle to supplement and force counterclockwise
        2cjb. handler is forced to draw a line from steps 2bfa to 2bfc
        2cjc. handler forms an arc at center coordinates (<givenX>,<givenY>), and with a radius of hy, and an angle range from supplement to givenAngle
        2cjd. handler draws a line from (<givenX1>,<givenY1>) to (<givenX2>,<givenY2>)
        2cje. handler's fillStyle is set to the result of transparentGradient with respect to handler, hy, hy, dividerStart+lineWidth,hy,color,0.75,and 1
        2cjf. handler fills the path
        2bk. handler's globalCompositeOperation is set to source-over (draw-over functions)
    */
    function formHover(){
        let targetPan = document.querySelector("#pan-5");
        targetPan.addEventListener("mouseenter",function (event){
            targetPan.addEventListener("mousemove",panHover);
            targetPan.addEventListener("click", clickTo);
            targetPan.addEventListener("mouseleave",function easyLeave(){
                targetPan.removeEventListener("mousemove",panHover);
                targetPan.removeEventListener("click",clickTo);
                targetPan.removeEventListener("mouseleave",easyLeave);
                let [panToBe,i] = findPointer(event);
                let givenAngle = pi*3/2-rotationInc*i;
                let aligner = givenAngle-rotationInc/2;
                let supplement = givenAngle-rotationInc;

                let handler = panToBe.getContext("2d");
                handler.globalCompositeOperation = "destination-out";
                for (var j=0;j<2;j++){
                    //arcHandler(handler,hx,hy,dividerStart,hy,givenAngle,supplement,aligner,lineWidth*10,color,"rgb(0 0 0 / 0%)",0.1,0.75,1);
                    handler.arc(hx+Math.cos(aligner)*lineWidth*3/2,hy+Math.sin(aligner)*lineWidth*3/2,dividerStart,givenAngle,supplement,true);
                    handler.arc(hx+Math.cos(givenAngle)*lineWidth/1,hy+Math.sin(givenAngle)*lineWidth,hy,supplement,givenAngle);
                    handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth*Math.sin(aligner));
                    gradient = handler.createRadialGradient(hx,hy,dividerStart,hx,hy,hy);
                    gradient.addColorStop(0.0,color);
                    gradient.addColorStop(0.75,color);
                    gradient.addColorStop(1,`rgb(${colorRGB[0]} ${colorRGB[1]} ${colorRGB[2]} / 0%)`);
                    handler.fillStyle = gradient;
                    handler.fill();
                }
                handler.globalCompositeOperation = "source-over";
            });

        });
    }
    
    // The main part of the nester function: Activates the basic outlines 
    let centerCan = document.querySelector("canvas#ico-place");
    centerCan.width = width;
    centerCan.height = width;

    let centerHandler = centerCan.getContext("2d");
    centerHandler.clearRect(0,0,x,y);
    centerHandler.beginPath();
    centerHandler.arc(hx,hy,40,0,2*pi);
    centerHandler.fillStyle = color;
    centerHandler.fill();
    centerHandler.fillStyle = transparentGradient(centerHandler,hx,hy,40,hy,color,0.75,1);
    centerHandler.fillRect(0,0,x,y);

    // This line deactivates and reactivates formHover
    document.removeEventListener("DOMContentLoaded",formHover);
    document.addEventListener("DOMContentLoaded",formHover);  

    // The line-maker
    panArray.forEach(function(element,index) {
        let handler = element.getContext("2d");
        element.width = width;
        element.height = width;

        handler.lineWidth = lineWidth;
        handler.clearRect(0,0,x,y);
        gradient = handler.createRadialGradient(hx,hy,dividerStart,hx,hy,hy);
        gradient.addColorStop(0.0,colorArray[index]);
        gradient.addColorStop(0.1,colorArray[index]);
        gradient.addColorStop(0.75,`rgb(${colorRGB[0]} ${colorRGB[1]} ${colorRGB[2]}  / 0%)`);
        handler.strokeStyle = gradient;
        //handler.strokeStyle = colorArray[index];
        handler.beginPath();

        let givenAngle = pi*3/2-rotationInc*index;
        let aligner = givenAngle-rotationInc/2;
        let supplement = givenAngle-rotationInc;

        handler.arc(hx+Math.cos(aligner)*lineWidth,hy+Math.sin(aligner)*lineWidth,dividerStart,givenAngle,supplement,true);
        //handler.lineTo(x*Math.cos(supplement),y*Math.sin(supplement));
        handler.arc(hx+Math.cos(givenAngle)*lineWidth/2,hy+Math.sin(givenAngle)*lineWidth/2,hy,supplement,givenAngle);
        handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth/2*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth/2*Math.sin(aligner));
        handler.stroke();

     
    });
    
    
}

/*
    initIcosahedron
    QuickDesc: forms the framing for the icosahedron

    Parameters: color, should be a hex code

    When called:
    1. plusConst is declared as 5+Math.sqrt(5)
    2. minusConst is declared as 5-Math.sqrt(5)
    3. zScaler is declared as 5/Math.sqrt(10*minusConst)
        (Note, zScaler forces the icosahedron to fit into a unit circle. Should you not force zScaler, the length of vertex to vertex is one but unusable to unit sphere based vector rotations)
    4. const2 is declared as Math.sqrt(2/minusConst) (zScaler force fit)
    5. minusConst2 is declared as 1/(Math.sqrt(2*minusConst)) (zScaler force fit)
    6. advConst is declared as minusConst2*(1+Math.sqrt(5))/2 (zScaler force fit)
    7. subConst is declared. zScaler force fit allows subConst to equal 1-advConst
    8. plussusConst = 0.5*Math.sqrt(plusConst/minusConst) (zScaler force fit)
    9-20. Points declared for the icosahedron
    21-40. Polygons declared for the icosahedron
    41. ico's polygonList is set as all the Polygons declared
    42. icoColorUpdate with respect to color
    43. An interval is set every 1/60 of a second for formIco
    44. formIco is called

*/
function initIcosahedron(color){

    let plusConst = 5+Math.sqrt(5);
    let minusConst = 5-Math.sqrt(5);
    let zScaler = 5/Math.sqrt(10*minusConst);

    let const2 = Math.sqrt(2/minusConst)/zScaler;
    let minusConst2 = 1/(Math.sqrt(2*minusConst)*zScaler);
    let advConst = minusConst2*(1+Math.sqrt(5))/(2);
    let subConst = 1-advConst;
    let plussusConst = 0.5*Math.sqrt(plusConst/minusConst)/zScaler;

    let p1 = new Point([0,0,1]);
    let p2 = new Point([const2,0,minusConst2]);
    let p3 = new Point([subConst,plussusConst,minusConst2]);
    let p4 = new Point([-1*advConst,1/2,minusConst2]);
    let p5 = new Point([-1*advConst,-1/2,minusConst2]);
    let p6 = new Point([subConst,-1*plussusConst,minusConst2]);
    let p7 = new Point([advConst,-1/2,-1*minusConst2]);
    let p8 = new Point([advConst,1/2,-1*minusConst2]);
    let p9 = new Point([-1*subConst,plussusConst,-1*minusConst2]);
    let p10 = new Point([-1*const2,0,-1*minusConst2]);
    let p11 = new Point([-1*subConst,-1*plussusConst,-1*minusConst2]);
    let p12 = new Point([0,0,-1]);

    let poly1 = new Polygon([p1,p2,p3]);
    let poly2 = new Polygon([p1,p3,p4]);
    let poly3 = new Polygon([p1,p4,p5]);
    let poly4 = new Polygon([p1,p5,p6]);
    let poly5 = new Polygon([p1,p2,p6]);
    let poly6 = new Polygon([p2,p7,p8]);
    let poly7 = new Polygon([p2,p3,p8]);
    let poly8 = new Polygon([p3,p8,p9]);
    let poly9 = new Polygon([p3,p4,p9]);
    let poly10 = new Polygon([p4,p9,p10]);
    let poly11 = new Polygon([p4,p5,p10]);
    let poly12 = new Polygon([p5,p10,p11]);
    let poly13 = new Polygon([p5,p6,p11]);
    let poly14 = new Polygon([p6,p7,p11]);
    let poly15 = new Polygon([p2,p6,p7]);
    let poly16 = new Polygon([p7,p8,p12]);
    let poly17 = new Polygon([p8,p9,p12]);  
    let poly18 = new Polygon([p9,p10,p12]);
    let poly19 = new Polygon([p10,p11,p12]);
    let poly20 = new Polygon([p7,p11,p12]);

    ico.setPolygonList([poly1,poly2,poly3,poly4,poly5,
        poly6,poly7,poly8,poly9,poly10,poly11,poly12,poly13,poly14,poly15,
        poly16,poly17,poly18,poly19,poly20]);
    
    icoColorUpdate(color);
    setInterval(formIco,1000/60);
    formIco();
}

/*
    icoColorUpdate
    QuickDesc: Updates the color theme for the icosahedron

    Parameters: color, should be a hex code

    When called:
    1. borderColor is declared as #000000
    2. By lexigraphical comparison, if color is less than #808080, than border color is #FFFFFF
    3. For each item in ico's polygonList, set the color and border color of the item


*/
function icoColorUpdate(color) {
    let borderColor="#000000";
    if (color<"#808080") borderColor = "#FFFFFF";
    ico.getPolygonList().forEach(function(element){
        element.setColor(color,borderColor);
    });


}

setInterval(function(){axisAngle--;},5000);

/*
    formIco
    QuickDesc: draws the icosahedron

    Parameters: none

    When called:
    1. icoCanvas is declared as the first HTML Element with id ico
    2. icoCanvas's width and height is set to width
    3. icoHandler is declared as icoCanvas's 2D context
    4. icoHandler fills a clearRectangle with diagonal coordinates of (0,0) and (x,y)
    5. axis is declared as a vector with axial magnitude of <Math.cos(axisAngle*pi/180),0,Math.sin(axisAngle*pi/180)>
    6. icoHandler's stroke style is set as the border color of the Polygons
    7. icoHandler's lineWidth is set as 1
    8. icoHandler's fillStyle is set as the color of the Polygons
    9. For each element in ico's polygonList:
    9a. For each item in element's pointsList:
    9aa. The curCoord of item is the rotatedVector with respect to the orgCoord of item, the axis, and degreeAmount;
    10. ico polygonList is set to sorting ico's polygonList by polygonal priority
    11. For each element in ico's polygonList:
    11a. If the element's priority is lower than 0, return
    11b. x1 is declared as the element's first point's first value * icoRadius
    11c. y1 is declared as the element's first point's third value * icoRadius
    11d. x2 is declared as the element's second point's first value * icoRadius
    11e. y2 is declared as the element's second point's third value * icoRadius
    11f. x3 is declared as the element's third point's first value * icoRadius
    11g. y3 is declared as the element's third point's third value * icoRadius
    11h. icoHandler is moved to coordinate (x1,y1)
    11i. icoHandler draws a line to coordinate (x2,y2)
    11j. icoHandler draws a line to coordinate (x3,y3)
    11k. icoHandler draws a line to coordinate (x1,y1)
    11l. icoHandler fills the path
    11m. icoHandler executes the stroke
    12. degreeAmount is incremented


*/
function formIco(){
    let icoCanvas = document.querySelector("#ico");
    let axis = [Math.cos(axisAngle*pi/180),0,Math.sin(axisAngle*pi/180)];
    icoCanvas.width = width;
    icoCanvas.height = width;
    let icoHandler = icoCanvas.getContext("2d");
    icoHandler.clearRect(0,0,x,y);

    icoHandler.strokeStyle = ico.getPolygonList()[0].getBorderColor();
    icoHandler.lineWidth = x/500;
    icoHandler.fillStyle = ico.getPolygonList()[0].getColor();

    ico.getPolygonList().forEach(function(element){
        element.getPointsList().forEach(function(item){
            item.curCoord = Vector.rotateVector(item.orgCoord,axis,degreeAmount);
        });
    });
    ico.setPolygonList(ico.getPolygonList().sort(function(a,b){return a.getPriority()-b.getPriority()}));
    ico.getPolygonList().forEach(function(element){
        if (element.getPriority()<0){return;}
        let icoRadius = dividerStart*4/5;

        let x1 = hx+element.getPointsList()[0].getCurCoords()[0]*icoRadius;
        let y1 = hy-element.getPointsList()[0].getCurCoords()[2]*icoRadius;
        let x2 = hx+element.getPointsList()[1].getCurCoords()[0]*icoRadius;
        let y2 = hy-element.getPointsList()[1].getCurCoords()[2]*icoRadius;
        let x3 = hx+element.getPointsList()[2].getCurCoords()[0]*icoRadius;
        let y3 = hy-element.getPointsList()[2].getCurCoords()[2]*icoRadius;

        icoHandler.moveTo(x1,y1);
        icoHandler.lineTo(x2,y2);
        icoHandler.lineTo(x3,y3);
        icoHandler.lineTo(x1,y1);

        icoHandler.fill();
        icoHandler.stroke();

    });

    degreeAmount += 1;
}