//changeable elements
let canvasWidth = 1500; //don't forget to change the width and height value in <canvas>
let canvasHeight = 1500;
let minSpeed = 1;
let maxSpeed = 100;

//center of solor system
let midX = 1 / 2 * canvasWidth;
let midY = 1 / 2 * canvasHeight;

//get canvas
let ctx = myCanvas.getContext("2d");

//get images
let sun = new Image();
sun.src = "sun.png";

let mercury = new Image();
mercury.src = "mercury.png";

let venus = new Image();
venus.src = "venus.png";

let earth = new Image();
earth.src = "earth.png";

let mars = new Image();
mars.src = "mars.png";

let jupiter = new Image();
jupiter.src = "jupiter.png";

let saturn = new Image();
saturn.src = "saturn.png";

let uranus = new Image();
uranus.src = "uranus.png";

let neptune = new Image();
neptune.src = "neptune.png";
//This is the background image
let background = new Image();
background.src = "sky.png";
//Downloads the images and wait until it's done
gaidaAtteluIeladi(done, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, background);

//setting variables
let mercuryLoc = venusLoc = earthLoc = marsLoc = jupiterLoc = saturnLoc = uranusLoc = neptuneLoc = 0; //radians of angles

//size of planetSpeed
let planetSize = {
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
let planetDistance = {
    "mercury": 70,
    "venus": 120,
    "earth": 215,
    "mars": 300,
    "jupiter": 400,
    "saturn": 500,
    "uranus": 600,
    "neptune": 700
};

//planetSpeed' revolution period(in days)
//Ps. All the infos are from Wikipedia
let daysOfPlanets = {
    "mercury": 87.970534004061384,
    "venus": 224.704984007334792,
    "earth": 365.256363004,
    "mars": 686.98147266518328,
    "jupiter": 4332.670977953448,
    "saturn": 10759.3932106451284,
    "uranus": 30689.022247777582,
    "neptune": 60190.59605942916
};

//the speed of each planet(in radians)
//How does this works:
//1) s = (2 * PI * r(distance to sun)) / time(for completing a revolution period, in days)
//2) this number is the distance on its orbit it has to go by one turn
//3) so to get the radians(Δα) in for it, you have to divide this number by the planet's distance to sun(r)
//4) because s / (2 * PI * r) = Δα / 2 * PI
//5) Then you can get the final result
//6*) This whole thing can be simplified as --> Δα = 2 * PI / time(for completing a revolution period, in days)
let planetSpeed = {
    "mercury": 2 * Math.PI / daysOfPlanets["mercury"],
    "venus": 2 * Math.PI / daysOfPlanets["venus"],
    "earth": 2 * Math.PI / daysOfPlanets["earth"],
    "mars": 2 * Math.PI / daysOfPlanets["mars"],
    "jupiter": 2 * Math.PI / daysOfPlanets["jupiter"],
    "saturn": 2 * Math.PI / daysOfPlanets["saturn"],
    "uranus": 2 * Math.PI / daysOfPlanets["uranus"],
    "neptune": 2 * Math.PI / daysOfPlanets["neptune"],
};

//basically does nothing
//but gives a console log when all images all loaded
function done() {
    console.log("Images loaded!")
}

//runs the main function once so that it draws the background image and the planetSpeed
//then use the pause function to stop it
function setUp() {
    //This following line is needed because the variable "delay" should has a value before using it
    //Without this line, when you run this programme, the default "delay" is 1(I thinks so)
    speed = document.getElementById("speed").value;
    //The  slider is for speed changing, but the setTimeOut is using delay
    //To change from speed to delay, you need this line of code
    //This line is also used in some other place(delayCheckStart, delayCheckEnd, etc.).
    delay = minSpeed + maxSpeed - speed;
    start();
    pause();
}

//Checks the change of delay while mouse is on slider
function delayCheckStart() {
    speed = document.getElementById("speed").value;
    if (speed == 1) {
        delay = 500
    } else {
        delay = minSpeed + maxSpeed - speed;
    }
    delayCheck = setTimeout(delayCheckStart, 10);
}

//Stops checking the change of delay
//as the mouse left
function delayCheckEnd() {
    speed = document.getElementById("speed").value;
    if (speed == 1) {
        delay = 500
    } else {
        delay = minSpeed + maxSpeed - speed;
    }
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
    let width = planetSize[imgName];
    let midP = {
        "x": x - 1 / 2 * width,
        "y": y - 1 / 2 * width
    };
    return midP;
}

//draws the sun
function drawSun() {
    let middle = getMid("sun", midX, midY);
    ctx.drawImage(sun, middle["x"], middle["y"]);
}

//draws the planetSpeed
function planetMovement(planetImg, planetName, i) {
    //get the distance between planet and sun(midpoint)
    let r = planetDistance[planetName];
    //get the speed of revolutionary period
    let s = planetSpeed[planetName];
    //The planet's orbit
    //Calculates the x and y coordinates as if the center is (0;0)
    //Then add the real midpoint's x and y value(x;y) to the result
    pointAngleInRadians = i;
    let x = Math.cos(pointAngleInRadians) * r + midX;
    let y = Math.sin(pointAngleInRadians) * r + midY;
    //get the midponi coordinate andn draw the planet
    let middle = getMid(planetName, x, y);
    //Draws the planet
    ctx.drawImage(planetImg, middle["x"], middle["y"]);
    //Add 1/8 radians to the planet's angle
    i += s * 10;
    //As 2Pi radians = 0 radians
    if (i >= 2 * Math.PI) {
        i -= 2 * Math.PI;
    };
    //This thing here check if the ratio is still right, using earth and neptune as samples
    //The first result should be 1035..... something like that
    //Don't forget to turn off the IF check above
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
    mercuryLoc = planetMovement(mercury, "mercury", mercuryLoc);
    venusLoc = planetMovement(venus, "venus", venusLoc);
    earthLoc = planetMovement(earth, "earth", earthLoc);
    marsLoc = planetMovement(mars, "mars", marsLoc);
    jupiterLoc = planetMovement(jupiter, "jupiter", jupiterLoc);
    saturnLoc = planetMovement(saturn, "saturn", saturnLoc);
    uranusLoc = planetMovement(uranus, "uranus", uranusLoc);
    neptuneLoc = planetMovement(neptune, "neptune", neptuneLoc);
    running = setTimeout(solarSystem, delay);
}





// Skolotāja funkcija attēlu gaidīšanai:
// Funkcijai gaida, kad norādītie attēli ir ielādējušies no tīkla un tad izsauc pirmajā parametrā norādīto funkciju.
// Gaidīšanas laikā lapas apakšā (pēc visiem elementiem) uzrādās "Attēlu ielāde ...", kas pazūd brīdī, kad visi attēli ir ielādēti.
// Autors:: 2018-2019 Ojārs Krūmiņš
// Versija 1.3
function gaidaAtteluIeladi() {
    let images = [].slice.call(arguments);
    let num = arguments.length;
    let l = document.createElement('div');
    l.id = "loading_div";
    l.innerHTML = "Attēlu ielāde ";
    document.body.appendChild(l);
    let lcount = 1;
    let interval = setInterval(function() {
        let n = 1;
        for (let i = 1; i < images.length; i++) {
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