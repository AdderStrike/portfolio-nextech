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
    initMainCanvasses
    QuickDesc: takes a color and a color set to give life to a hub piece
    parameters:
        2 required
            color, should be a hexCode
            colorArray, should be an array of hexCodes
    When called:
        1. rotationInc is declared as pi*0.4 and set as a const
        2. gradient is declared
        3. lineWidth is declared as x/100
        4. centerCan is declared as the first HTML Canvas Element with id ico-place
        5. centerCan's canvas width is set as width;
        6. centerCan's canvas height is set as width;
        7. centerHandler is declared as centerCan's 2D context
        8. centerHandler sets a clearRectangle with diagonal corner coordinates of (0,0) to (x,y)
        9. centerHandler begins its path
        10. centerHandler draws an arc with center coordinate (hx,hy), a radius of 40, and angle of 0 to 2*pi
            (Note:angles are drawn clockwise unless stated from here on out in this function)
        11. centerHandler's fillStyle is set to color
        12. centerHandler fills the path
        13. gradient is given a value: centerHandler's createRadialGradient with 
            start coordinate of (hx,hy), a start radius of 40, an end coordinate of (hx,hy),
            and an end radius of hy
        14. gradient adds a colorStop at 0% for color
        15. gradient adds a colorStop at 75% for color
        16. gradient adds a colorStop at 100% for a cssRGBCode of completely transparent black
        17. centerHandler's fillStyle is set to gradient;
        18. centerHandler fills a rectangle with diagonal coordinates of (0,0) and (x,y)
        See below for more steps
*/
function initMainCanvasses(color,colorArray){
    const rotationInc = pi*0.4;
    let gradient;
    let lineWidth = x/100;

    let centerCan = document.querySelector("canvas#ico-place");
    centerCan.width = width;
    centerCan.height = width;

    let centerHandler = centerCan.getContext("2d");
    centerHandler.clearRect(0,0,x,y);

    centerHandler.beginPath();
    centerHandler.arc(hx,hy,40,0,2*pi);
    centerHandler.fillStyle = color;
    centerHandler.fill();

    gradient = centerHandler.createRadialGradient(hx,hy,40,hx,hy,hy);
    gradient.addColorStop(0.0,color);
    gradient.addColorStop(0.75,color);
    gradient.addColorStop(1,"rgb(0 0 0 / 0%)");
    centerHandler.fillStyle = gradient;
    centerHandler.fillRect(0,0,x,y);

    /*
        See above for previous steps
        
        When called (con't):
            19. redPan is called as the first element with id pan-1
            20. greenPan is called as the first element with id pan-2
            21. orangePan is called as the first element with id pan-3
            22. bluePan is called as the first element with id pan-4
            23. yellowPan is called as the first element with id pan-5
            24. panArray is declared as the array [redPan,greenPan,orangePan,bluePan,yellowPan]
                (Note: this array is setup as it is for contrast reasons)
            25. For each value in panArray, take the current value as element and index and inc.
            25a. handler is declared as the element's 2D context
            25b. The element's width and height are declared to be width
            25c. handler's lineWidth is saved as lineWidth
            25d. handler sets up a clearRectangle with diagonalCoordinates of (0,0) and (x,y)
            25e. gradient is set as handler's createRadialGradient with
                start coordinates (hx,hy), a start radius of dividerStart,
                end coordinates (hx,hy), and an end radius of hy
            25f. gradient adds a color stop at 0% for the item at index in colorArray
            25g. gradient adds a color stop at 10% for the item at index in colorArray
            25h. gradient adds a color stop at 75% for a cssRGBCode of transparent black
            25i. handler's strokeStyle is set as gradient
            25j. handler begins its path
            25k. givenAngle is declared as pi*3/2-rotationInc*index
            25l. aligner is declared as givenAngle-rotationInc/2
            25m. supplement is declared as givenAngle-rotationInc
            25n. handler draws an arc with centerCoordinates (hx+Math.cos(aligner)*lineWidth,hy-Math.sin(aligner)*lineWidth),
                a radius of dividerStart, a start angle of givenAngle, an end angle of supplement, and have it counterclockwise
            25o. handler draws an arc with centerCoordinates (hx+Math.cos(aligner)*lineWidth/2,hy-Math.sin(aligner)*lineWidth/2),
                a radius of hy, a start angle of supplement, and an angle of givenAngle
            25pa. xPart1 = hx
            25pb. xPart2 = dividerStart*Math.cos(givenAngle)
            25pc. xPArt3 = lineWidth*0.5*Math.cos(aligner)
            25pd. yPart1 = hy
            25pe. yPart2 = dividerStart*Math.cos(givenAngle)
            25pf. yPArt3 = lineWidth*0.5*Math.cos(aligner)
            25pg. handler draws a line to (xPart1+xpart2+xPart3,yPart1+yPart2+yPart3)
            25q. handler executes a stroke

    */
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

    let panGradient = [false,false,false,false,false];
    let prevI=-1;

    function panHover(event){
            let panToBe;
            let boundRect = centerCan.getBoundingClientRect();
            let handlerX = event.clientX-(boundRect.right-boundRect.left);
            let handlerY = (event.clientY-(boundRect.bottom-boundRect.top))*-1;
            let angleDeterminer = Math.atan2(-1*handlerY,-1*handlerX)+pi;
            angleDeterminer *= 180/pi;
            angleDeterminer -= 90;
            if(angleDeterminer<=0)angleDeterminer+=360;
            let i;
            for (i=0;i<5;i++){
                if (angleDeterminer<=(i+1)*72&&angleDeterminer>=i*72){
                    panToBe = panArray[i];
                    break;
                }
            }
            if (prevI!==i||prevI===-1){
                panGradient[prevI] = false;
                if (prevI!==-1) {
                    let givenAngle = pi*3/2-rotationInc*prevI;
                    let aligner = givenAngle-rotationInc/2;
                    let supplement = givenAngle-rotationInc;

                    let handler = panArray[prevI].getContext("2d");
                    handler.beginPath();
                    handler.arc(hx+Math.cos(aligner)*lineWidth,hy+Math.sin(aligner)*lineWidth,dividerStart,givenAngle,supplement,true);
                    handler.arc(hx+Math.cos(givenAngle)*lineWidth/2,hy+Math.sin(givenAngle)*lineWidth/2,hy,supplement,givenAngle);
                    handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth/2*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth/2*Math.sin(aligner));
                    gradient = handler.createRadialGradient(hx,hy,dividerStart,hx,hy,hy);
                    gradient.addColorStop(0.0,color);
                    gradient.addColorStop(0.75,color);
                    gradient.addColorStop(1,"rgb(0 0 0 / 0%)");
                    handler.fillStyle = gradient;
                    handler.fill();
                }

                prevI = i;
                //console.log(prevI===i);
            }
            if (!panGradient[i]){
                let givenAngle = pi*3/2-rotationInc*i;
                let aligner = givenAngle-rotationInc/2;
                let supplement = givenAngle-rotationInc;

                let handler = panToBe.getContext("2d");
                handler.beginPath();
                handler.arc(hx+Math.cos(aligner)*lineWidth,hy+Math.sin(aligner)*lineWidth,dividerStart,givenAngle,supplement,true);
                handler.arc(hx+Math.cos(givenAngle)*lineWidth/2,hy+Math.sin(givenAngle)*lineWidth/2,hy,supplement,givenAngle);
                handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth/2*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth/2*Math.sin(aligner));
                gradient = handler.createRadialGradient(hx,hy,dividerStart,hx,hy,hy);
                gradient.addColorStop(0.0,colorArray[i]);
                gradient.addColorStop(0.75,"rgb(0 0 0 / 0%)");
                handler.fillStyle = gradient;
                handler.fill();

                panGradient[i] = true;
            }
        }
    function formHover(){
        let targetPan = document.querySelector("#pan-5");
        targetPan.addEventListener("mouseenter",function(event){
            targetPan.addEventListener("mousemove",panHover);
            targetPan.addEventListener("mouseleave",function easyLeave(event){
                targetPan.removeEventListener("mousemove",panHover);
                targetPan.removeEventListener("mouseleave",easyLeave);
            });

        });
    }
    panArray.forEach(function(element,index) {
        document.removeEventListener("DOMContentLoaded",formHover);
        let handler = element.getContext("2d");
        element.width = width;
        element.height = width;

        handler.lineWidth = lineWidth;
        handler.clearRect(0,0,x,y);
        gradient = handler.createRadialGradient(hx,hy,dividerStart,hx,hy,hy);
        gradient.addColorStop(0.0,color);
        gradient.addColorStop(0.1,color);
        gradient.addColorStop(0.75,"rgb(0 0 0 / 0%)");
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

        document.addEventListener("DOMContentLoaded",formHover());       
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
    icoCanvas.width = width;
    icoCanvas.height = width;
    let icoHandler = icoCanvas.getContext("2d");

    icoHandler.clearRect(0,0,x,y);

    let axis = [Math.cos(axisAngle*pi/180),0,Math.sin(axisAngle*pi/180)];

    icoHandler.strokeStyle = ico.getPolygonList()[0].getBorderColor();
    icoHandler.lineWidth = 1;
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