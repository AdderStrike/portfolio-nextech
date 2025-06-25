function initMainCanvasses(color,redColor,greenColor,orangeColor,blueColor){
    let width = window.innerWidth*1/2;
    //console.log(width);
    let x=width,y=width;
    let hx=x/2,hy=y/2;
    const pi = Math.PI;

    let centerCan = document.querySelector("canvas#ico-place");
    centerCan.width = width;
    centerCan.height = width;

    let centerHandler = centerCan.getContext("2d");
    centerHandler.clearRect(0,0,x,y);

    centerHandler.beginPath();
    centerHandler.arc(hx,hy,40,0,2*pi);
    centerHandler.fillStyle = color;
    centerHandler.fill();

    let gradient = centerHandler.createRadialGradient(hx,hy,40,hx,hy,hy);
    gradient.addColorStop(0.0,color);
    gradient.addColorStop(0.75,color);
    gradient.addColorStop(1,"rgb(0 0 0 / 0%)");
    centerHandler.fillStyle = gradient;
    centerHandler.fillRect(0,0,x,y);

    //Day   - #BB0000
    //Night - #FF0000
    let redPan = document.querySelector("#pan-1");
    let redHandler = redPan.getContext("2d");

    //Day   - #00BB00
    //Night - #00FF00
    let greenPan = document.querySelector("#pan-2");
    let greenHandler = greenPan.getContext("2d");

    //Day   - #BB4400
    //Night - #FF8800
    let orangePan = document.querySelector("#pan-3");
    let orangeHandler =orangePan.getContext("2d");

    //Day   - #0000BB
    //Night - #0000FF
    let bluePan = document.querySelector("#pan-4");
    let blueHandler = bluePan.getContext("2d");

    //Day   - #BB8800
    //Night - #FFFF00
    let yellowPan = document.querySelector("#pan-5");
    let yellowHandler = yellowPan.getContext("2d");
}