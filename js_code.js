//changeable elements
var canvasWidth = 1500; //don't forget to change the width and height value in <canvas>
var canvasHeight = 1500;
var a = 0;

//center of solor system
var midX = 1 / 2 * canvasWidth;
var midY = 1 / 2 * canvasHeight;

//get canvas
var ctx = myCanvas.getContext("2d");

//get images
var sun = new Image();
sun.src = "sun.png";

var mercury = new Image();
mercury.src = "mercury.png";

var venus = new Image();
venus.src = "venus.png";

var earth = new Image();
earth.src = "earth.png";

var mars = new Image();
mars.src = "mars.png";

var jupiter = new Image();
jupiter.src = "jupiter.png";

var saturn = new Image();
saturn.src = "saturn.png";

var uranus = new Image();
uranus.src = "uranus.png";

var neptune = new Image();
neptune.src = "neptune.png";
//This is the background image
var background = new Image();
background.src = "sky.png";
//Downloads the images and wait until it's done
gaidaAtteluIeladi(done, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, background);

//setting variables
var mercuryLoc = venusLoc = earthLoc = marsLoc = jupiterLoc = saturnLoc = uranusLoc = neptuneLoc = 0; //radians of angles
//size of planets
var planetR = {
    "sun": 80,
    "mercury": 36,
    "venus": 36,
    "earth": 48,
    "mars": 48,
    "jupiter": 96,
    "saturn": 96,
    "uranus": 72,
    "neptune": 72
};
//the distance between planet and the sun
var planetD = {
    "mercury": 70,
    "venus": 120,
    "earth": 215,
    "mars": 300,
    "jupiter": 400,
    "saturn": 500,
    "uranus": 600,
    "neptune": 700
};
//the speed of each planet
//How I got those numbers:
//1) s(the long numbers) = (2 * PI * r(distance to sun)) / time(for completing a revolution period, in days)
//2) this number is the distance on its orbit it has to go by one turn
//3) so to get the radians in for it, you have to divide this number by the planet's distance to sun(r)
//4) because s / (2 * PI * r) = Δα / 2 * PI
//5) Then you can get the final result
//6*) This whole thing can be simplified as --> s = 2 * PI / time(for completing a revolution period, in days)
var planetS = {
    "mercury": 4.9996624038029086477133741318865 / planetD["mercury"], // 2D / ((430PI / 4.1) * (Revol.Per. / 365.26)) Ps. Revol.Per. in days
    "venus": 3.3554317461731911709740147943125 / planetD["venus"],
    "earth": 3.6984566947265399610848955832313 / planetD["earth"],
    "mars": 2.7438230391295483645442838142824 / planetD["mars"],
    "jupiter": 0.58007500123145474681078849925011 / planetD["jupiter"],
    "saturn": 0.29198604345843261075723565702771 / planetD["saturn"],
    "uranus": 0.12284233605978629394022125275566 / planetD["uranus"],
    "neptune": 0.0730717089208274371119106320874 / planetD["neptune"],
    //"neptune": 0.004819 //1 / 679.55
};

//console.log(2 * planetD["neptune"] / ((2 * planetD["earth"] * 4.1) * (60191.1954 / 365.26)));
//basically does nothing
//but gives a console log when all images all loaded
function done() {
    console.log("Images loaded!")
}

//runs the main function once so that it draws the background image and the planets
//then use the pause function to stop it
function setUp() {
    //This following line is needed because the variable "delay" should has a value before using it
    //Without this line, when you run this programme, the default "delay" is 1(I thinks so)
    delay = document.getElementById("delay").value;
    start();
    pause();
}

//Checks the change of delay while mouse is on slider
function delayCheckStart() {
    delay = document.getElementById("delay").value;
    if (delay == 101)(
        delay = 500
    );
    delayCheck = setTimeout(delayCheckStart, 10);
}

//Stops checking the change of delay
//as the mouse left
function delayCheckEnd() {
    delay = document.getElementById("delay").value;
    if (delay == 101)(
        delay = 500
    );
    clearTimeout(delayCheck);
}

//starts the programme
function start() {
    solarSystem();
    //This is needed so that there is only one button not two(start and pause)
    document.getElementById("switch").onclick = pause;
    document.getElementById("switch").innerHTML = "pause";
}

//pauses the programme
function pause() {
    clearTimeout(running);
    //This is needed so that there is only one button not two(start and pause)
    document.getElementById("switch").onclick = start;
    document.getElementById("switch").innerHTML = "start";
}

//calculate the middle of planet
function getMid(imgName, x, y) {
    var width = planetR[imgName];
    var midP = {
        "x": x - 1 / 2 * width,
        "y": y - 1 / 2 * width
    };
    return midP;
}

//draws the sun
function drawSun() {
    var middle = getMid("sun", midX, midY);
    ctx.drawImage(sun, middle["x"], middle["y"]);
}

//draws the planets
function planets(planetImg, planetName, i) {
    //get the distance between planet and sun(midpoint)
    var r = planetD[planetName];
    //get the speed of revolutionary period
    var s = planetS[planetName];
    //The planet's orbit
    //Calculates the x and y coordinates as if the center is (0;0)
    //Then add the real midpoint's x and y value(x;y) to the result
    pointAngleInRadians = i;
    var x = Math.cos(pointAngleInRadians) * r + midX;
    var y = Math.sin(pointAngleInRadians) * r + midY;
    //get the midponi coordinate andn draw the planet
    var middle = getMid(planetName, x, y);
    //Draws the planet
    ctx.drawImage(planetImg, middle["x"], middle["y"]);
    //Add 1/8 radians to the planet's angle
    i += s * 10;
    //As 2Pi radians = 0 radians
    if (i >= 2 * Math.PI) {
        i -= 2 * Math.PI;
    }

    /*if (planetName == "neptune") {
        if (i >= 2 * Math.PI) {
            console.log(earthLoc)
        };
    };*/
    //Returns the radians of planet
    return i;

}

//combines everything together
function solarSystem() {
    //clear canvas for redrawing
    const ctx = myCanvas.getContext('2d');
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    //draws the background
    ctx.drawImage(background, 0, 0);
    //draws the solar system
    drawSun();
    mercuryLoc = planets(mercury, "mercury", mercuryLoc);
    venusLoc = planets(venus, "venus", venusLoc);
    earthLoc = planets(earth, "earth", earthLoc);
    marsLoc = planets(mars, "mars", marsLoc);
    jupiterLoc = planets(jupiter, "jupiter", jupiterLoc);
    saturnLoc = planets(saturn, "saturn", saturnLoc);
    uranusLoc = planets(uranus, "uranus", uranusLoc);
    neptuneLoc = planets(neptune, "neptune", neptuneLoc);
    running = setTimeout(solarSystem, delay);
}





// Skolotāja funkcija attēlu gaidīšanai
// Funkcijai gaida, kad norādītie attēli ir ielādējušies no tīkla un tad izsauc pirmajā parametrā norādīto funkciju.
// Gaidīšanas laikā lapas apakšā (pēc visiem elementiem) uzrādās "Attēlu ielāde ...", kas pazūd brīdī, kad visi attēli ir ielādēti.
// Autors:: 2018-2019 Ojārs Krūmiņš
// Versija 1.3
function gaidaAtteluIeladi() {
    var images = [].slice.call(arguments);
    var num = arguments.length;
    var l = document.createElement('div');
    l.id = "loading_div";
    l.innerHTML = "Attēlu ielāde ";
    document.body.appendChild(l);
    var lcount = 1;
    var interval = setInterval(function() {
        var n = 1;
        for (var i = 1; i < images.length; i++) {
            if (images[i].complete) {
                n++;
            }
        }
        if (n == num) {
            clearInterval(interval);
            document.getElementById("loading_div").remove();
            images[0]();
        }
        lcount = (lcount + 1) % 50 + 1;
        l.innerHTML = "Attēlu ielāde " + ".".repeat(lcount / 10);
    }, 10);
}
//https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAMAZING-WALL-Adhesive-Wallpaper-15-7x198inch%2Fdp%2FB07S9WW93Z&psig=AOvVaw0c3DvkOPVNE8ZQV2OsOAPz&ust=1603378569212000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCIDkyeT4xewCFQAAAAAdAAAAABAE