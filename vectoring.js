const width = window.innerWidth*1/2;
const x=width,y=width;
const hx=x/2,hy=y/2;
const dividerStart = hx/5;
//const pi = Math.PI;


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

    panArray.forEach(function(element,index) {
        let handler = element.getContext("2d");
        element.width = width;
        element.height = width;

        handler.lineWidth = lineWidth;
        handler.clearRect(0,0,x,y);
        gradient = handler.createRadialGradient(hx,hy,dividerStart,hx,hy,hy);
        gradient.addColorStop(0.0,colorArray[index]);
        gradient.addColorStop(0.1,colorArray[index]);
        gradient.addColorStop(0.75,"rgb(0 0 0 / 0%)");
        handler.strokeStyle = gradient;
        //handler.strokeStyle = colorArray[index];
        handler.beginPath();

        let givenAngle = pi*3/2-rotationInc*index;
        if (givenAngle>=rotationInc) givenAngle+=2*pi;

        let aligner = givenAngle-rotationInc/2
        let supplement = givenAngle-rotationInc;

        handler.arc(hx+Math.cos(aligner)*lineWidth,hy+Math.sin(aligner)*lineWidth,dividerStart,givenAngle,supplement,true);
        //handler.lineTo(x*Math.cos(supplement),y*Math.sin(supplement));
        handler.arc(hx+Math.cos(givenAngle)*lineWidth/2,hy+Math.sin(givenAngle)*lineWidth/2,hy,supplement,givenAngle);
        handler.lineTo(hx+(dividerStart)*Math.cos(givenAngle)+lineWidth/2*Math.cos(aligner),hy+dividerStart*Math.sin(givenAngle)+lineWidth/2*Math.sin(aligner));
        handler.stroke();
    });
    
}

class Point{
    constructor(coord){
        this.orgCoord = coord;
        this.curCoord = coord;
    }
    getCoords = function(){
        return this.curCoord;
    }
    setCoords = function(coords){
        this.curCoord = coords;
    }
}

class Polygon{
    constructor(pointsList,color="",borderColor=""){
        this.pointsList=pointsList;
        this.color=color;
        this.borderColor=borderColor;
    }

    getPointsList = function(){
        return this.pointsList;
    }

    setColor = function(color,borderColor){
        this.color=color;
        this.borderColor=borderColor;
    }
    getColor = function(){
        return this.color;
    }
    getBorderColor = function(){
        return this.borderColor;
    }
    getPriority = function(){
        let sum = this.pointsList[0].getCoords()[1];
        sum += this.pointsList[1].getCoords()[1];
        sum += this.pointsList[2].getCoords()[1];

        sum/=3;

        return sum;
    
    }
}

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
let degreeAmount = 0;

class Vector{
    static crossProduct(vector1,vector2){
        let part1 = vector1[1]*vector2[2]-vector2[1]*vector1[2];
        let part2 = vector1[2]*vector2[0]-vector2[2]*vector1[0];
        let part3 = vector1[0]*vector2[1]-vector2[0]*vector1[1];

        return [part1,part2,part3];
    }

    static dotProduct(vector1,vector2){
        let part1 = vector1[0]*vector2[0];
        let part2 = vector1[1]*vector2[1];
        let part3 = vector1[2]*vector2[2];

        return part1+part2+part3;
    }

    static scalarProduct(vector1,multiplier){
        let part1 = vector1[0]*multiplier;
        let part2 = vector1[1]*multiplier;
        let part3 = vector1[2]*multiplier;

        return [part1,part2,part3];
    }

    static addition(vector1,vector2){
        let part1 = vector1[0]+vector2[0];
        let part2 = vector1[1]+vector2[1];
        let part3 = vector1[2]+vector2[2];

        return [part1,part2,part3];
    }

    static subtraction(vector1,vector2){
        let part1 = vector1[0]-vector2[0];
        let part2 = vector1[1]-vector2[1];
        let part3 = vector1[2]-vector2[2];

        return [part1,part2,part3];
    }

    static tripleCrossProduct(vector1,vector2,vector3){
        let scalar1 = this.dotProduct(vector1,vector3);
        let scalar2 = this.dotProduct(vector1,vector2);

        let partialVector1 = this.scalarProduct(vector2,scalar1);
        let partialVector2 = this.scalarProduct(vector3,scalar2);

        return this.subtraction(partialVector1,partialVector2);
    }

    static vectorParallelTo(vector1,vectorAxis){
        let scalarNum = this.dotProduct(vector1,vectorAxis);
        let scalarDenom = this.dotProduct(vectorAxis,vectorAxis);
        let scalar1 = scalarNum/scalarDenom;

        return this.scalarProduct(vectorAxis,scalar1);
    }

    static vectorPerpendicularTo(vector1,vectorAxis){
        let antiVectorAxis = this.scalarProduct(vectorAxis,-1);

        return this.tripleCrossProduct(antiVectorAxis,vectorAxis,vector1);
    }

    static keyedVector(vector1,vectorAxis){
        return this.crossProduct(vectorAxis,vector1);
    }

    static rotateVector(vector1,vectorAxis,angle){
        let radianAngle = angle*pi/180;

        let part1 = this.vectorParallelTo(vector1,vectorAxis);
        let part2 = this.scalarProduct(this.vectorPerpendicularTo(vector1,vectorAxis),Math.cos(radianAngle));
        let part3 = this.scalarProduct(this.keyedVector(vector1,vectorAxis),Math.sin(radianAngle));

        return this.addition(part1,this.addition(part2,part3));
    }

}

function ySort(a,b){
    let sumA=0;
    let sumB=0;

    a.getPointsList().forEach(function(element){
        sumA+=element.getCoords()[1];
    });
    b.getPointsList().forEach(function(element){
        sumB+=element.getCoords()[1];
    });
    //console.log(sumA+","+sumB);
    return sumA-sumB;
}

function initIcosahedron(color){

    let plusConst = 5+Math.sqrt(5);
    let minusConst = 5-Math.sqrt(5);
    let zScaler = 5/Math.sqrt(10*minusConst);

    let const2 = Math.sqrt(2/minusConst);
    let minusConst2 = 1/Math.sqrt(2*minusConst);
    let advConst = minusConst2*(1+Math.sqrt(5))/(2);
    let subConst = minusConst2*(-1+Math.sqrt(5))/(2);
    let plussusConst = 0.5*Math.sqrt(plusConst/minusConst);

    let p1 = new Point([0,0,zScaler]);
    let p2 = new Point([const2,0,minusConst2]);
    let p3 = new Point([subConst,plussusConst,minusConst2]);
    let p4 = new Point([-1*advConst,1/2,minusConst2]);
    let p5 = new Point([-1*advConst,-1/2,minusConst2]);
    let p6 = new Point([subConst,-1*plussusConst,minusConst2]);
    //let p7 = new Point([advConst,-1/2,-1*minusConst2]);
    //let p8 = new Point([advConst,1/2,-1*minusConst2]);
    //let p9 = new Point([-1*subConst,plussusConst,-1*minusConst2]);
    //let p10 = new Point([-1*subConst,-plussusConst,-1*minusConst2]);
    //let p11 = new Point([-1*const2,0,-1*minusConst2]);
    //let p12 = new Point([0,0,-1*zScaler]);

    let poly1 = new Polygon([p1,p2,p3]);
    let poly2 = new Polygon([p1,p3,p4]);  
    let poly3 = new Polygon([p1,p4,p5]);
    let poly4 = new Polygon([p1,p5,p6]);
    let poly5 = new Polygon([p1,p2,p6]);
    /*let poly6 = new Polygon([p2,p7,p8]);
    let poly7 = new Polygon([p2,p3,p8]);
    let poly8 = new Polygon([p3,p8,p9]);
    let poly9 = new Polygon([p3,p4,p9]);
    let poly10 = new Polygon([p4,p9,p10]);
    let poly11 = new Polygon([p4,p5,p10]);
    let poly12 = new Polygon([p5,p10,p11]);
    let poly13 = new Polygon([p5,p6,p11]);
    let poly14 = new Polygon([p2,p7,p11]);
    let poly15 = new Polygon([p2,p6,p11]);
    let poly16 = new Polygon([p7,p8,p12]);
    let poly17 = new Polygon([p8,p9,p12]);  
    let poly18 = new Polygon([p9,p10,p12]);
    let poly19 = new Polygon([p10,p11,p12]);
    let poly20 = new Polygon([p7,p11,p12]);*/

    ico.setPolygonList([poly1,poly2,poly3,poly4,poly5/*,poly6,poly7,
        poly8,poly9,poly10,poly11,poly12,poly13,poly14,poly15,poly16,
        poly17,poly18,poly19,poly20*/]);
    
    ico.getPolygonList().forEach(function(element){
        element.getPointsList().forEach(function(item){
            item.orgCoord[0]=item.orgCoord[0]/zScaler;
            item.orgCoord[1]=item.orgCoord[1]/zScaler;
            item.orgCoord[2]=item.orgCoord[2]/zScaler;

            item.setCoords(item.orgCoord);
        });
    });
    
    icoColorUpdate(color);
    setInterval(formIco,1000/60);
    formIco();
}

function icoColorUpdate(color) {
    let borderColor="#000000";
    if (color<"#808080") borderColor = "#FFFFFF";
    ico.getPolygonList().forEach(function(element){
        element.setColor(color,borderColor);
    });
}


function formIco(){
    let icoCanvas = document.querySelector("#ico");
    icoCanvas.width = width;
    icoCanvas.height = width;
    let icoHandler = icoCanvas.getContext("2d");

    icoHandler.clearRect(0,0,x,y);

    let axisAngle = 90;
    let axis = [Math.cos(axisAngle*pi/180),0,Math.sin(axisAngle*pi/180)];

    icoHandler.strokeStyle = ico.getPolygonList()[1].getBorderColor();
    icoHandler.fillStyle = ico.getPolygonList()[1].getColor();

    ico.getPolygonList().forEach(function(element){
        element.getPointsList().forEach(function(item){
            item.curCoord = Vector.rotateVector(item.orgCoord,axis,degreeAmount);
        });
    });
    ico.setPolygonList(ico.getPolygonList().sort(ySort));
    ico.getPolygonList().forEach(function(element){
        if (element.getPriority()<0){return;}
        let x1 = hx+element.getPointsList()[0].getCoords()[0]*dividerStart*2/3;
        let y1 = hy-element.getPointsList()[0].getCoords()[2]*dividerStart*2/3;
        let x2 = hx+element.getPointsList()[1].getCoords()[0]*dividerStart*2/3;
        let y2 = hy-element.getPointsList()[1].getCoords()[2]*dividerStart*2/3;
        let x3 = hx+element.getPointsList()[2].getCoords()[0]*dividerStart*2/3;
        let y3 = hy-element.getPointsList()[2].getCoords()[2]*dividerStart*2/3;


        icoHandler.moveTo(x1,y1);
        icoHandler.lineTo(x2,y2);
        icoHandler.lineTo(x3,y3);
        icoHandler.lineTo(x1,y1);

        icoHandler.fill();
        icoHandler.stroke();

    });

    degreeAmount += 1;
}