let wave = [], x, y, startWidth, startHeight, mic;
let logo, infoText_1, infoText_2, bottomText;
let colorR, colorG, colorB;
let selectedLineMode = 0, selectedVisualMode = 0;
let buttons = [];
const visualModes = ['lines', 'circles [😐]', 'triangles [😐]', 'fractals [😐]', 'experimential [😐]'];
const lineModes = 
    [{
        name: 'boring', 
        position: [30, 180, 65],
        colorOption: 'static',
        colors: [0,0,0],
        bg: [255, 255, 255],
        textColorOption: 'static',
        textColors: [0, 0, 0]
    },
    { 
        name: 'rainbow', 
        position: [30, 120, 65],
        colorOption: 'random',
        bg: [255, 255, 255], 
        textColorOption: 'dynamic'
    },
    {
        name: 'black-and-white', 
        position: [30, 150, 65],
        colorOption: 'static',
        colors: [255, 255, 255],
        bg: [0, 0, 0],
        textColorOption: 'static',
        textColors: [255, 255, 255]
    },
    {
        name: 'flower', 
        position: [30, 210, 65],
        colorOption: 'random-every-line',
        bg: [0, 0, 0],
        textColorOption: 'dynamic'
    },
    {
        name: 'wes-anderson', 
        position: [30, 240, 65],
        colorOption: 'static',
        colors: [240, 211, 154],
        bg: [138, 174, 191],
        textColorOption: 'static',
        textColors: [240, 211, 154]
    },
    {
        name: 'fifty-shades-of-white',
        position: [30, 270, 65],
        colorOption: 'fading',
        bg: [0, 0, 0],
        textColorOption: 'static',
        textColors: [255, 255, 255]
    }];

function setup() {
    // setup the canvas
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    canvas.position(0, 0);
    textFont('Calibri');
    // start positions
    startWidth = windowWidth / 2;
    startHeight = windowHeight * 2 / 3;
    setupHeader();
    setupLineOptions();
    // mic stuff
    mic = new p5.AudioIn();
    mic.start();
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }  
}

function draw() {
    switch(selectedVisualMode){
        case 0:
            drawLineMode();
            break;
        case 1:
            drawCircleMode();
            break;
        case 2:
            drawTriangleMode();
            break;
        case 3:
            drawFractalMode();
            break;
        case 4:
            drawExperimentialMode();
            break;
        default:
            break;
    }
}

function drawLineMode(){
    let { bg, colorOption, colors, textColors, textColorOption } = lineModes[selectedLineMode];
    background(bg[0], bg[1], bg[2]);
    if(colorOption === 'random' || colorOption === 'random-every-line' || colorOption == 'fifty-shades-of-white'){
        colorR = Math.random() * 255;
        colorG = Math.random() * 255;
        colorB = Math.random() * 255;
    } else if(colorOption === 'static'){
        colorR = colors[0];
        colorG = colors[1];
        colorB = colors[2];
    }
    if(textColorOption === 'static'){
        setLogoAndTextColor(textColors[0], textColors[1], textColors[2]);
    } else {
        setLogoAndTextColor(colorR, colorG, colorB);
    }
    stroke(colorR, colorG, colorB);
    strokeWeight(2);
    // calc of the point
    x = startWidth;
    y = startHeight - (mic.getLevel() * startHeight);
    // add the current point values to the array
    wave.push([x, y]);
    if(wave.length === 0 || wave.length === 1);
    else {
        for(let i = 0; i < wave.length; i++){
            wave[i][0] = (startWidth - wave.length + i);
            if(i === 0);
            else {
                if(i+1 === wave.length);
                else {
                    // this looks ugly but nothing to do about it right now
                    if(colorOption === 'random-every-line')
                        stroke(Math.random() * 255, Math.random() * 255, Math.random() * 255);
                    if(colorOption === 'fading'){
                        let iVar = (255 / startWidth) * (wave.length - i)
                        stroke(iVar, iVar, iVar);
                    }
                    line(wave[i][0], wave[i][1], wave[i+1][0], wave[i+1][1]);
                }
            }
        }
    }
    // if full, just pop
    if(wave.length === startWidth){
        wave.shift();
    }
}

function drawFractalMode(){

}

function drawTriangleMode(){

}

function drawCircleMode(){

}

function drawExperimentialMode(){

}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

function setupHeader(){
    // akanji logo
    logo = createSpan('akanji');
    logo.position(30, 30);
    logo.style('font-size', '40px');
    // akanji type selector
    selector = createSelect();
    selector.position(170, 50);
    visualModes.forEach((element) => {
        selector.option(element);
    });
    selector.changed(() => {
        let selection = selector.value();
        selectedVisualMode = visualModes.indexOf(selection);
        resetUI();
    });
    // akanji informing content
    infoText_1 = createSpan('you need to give access to your microphone for akanji to start.');
    infoText_1.position(30, 80);
    infoText_1.style('font-size', '10px');
    infoText_2 = createSpan('also, touch/click on the screen it isn\'t working.');
    infoText_2.position(30, 95);
    infoText_2.style('font-size', '10px');
    bottomText = createSpan('made with p5.js by <a href="https://github.com/caglarbozkurt">Çağlar Bozkurt</a> 👨🏻‍🚀');
    bottomText.position(30, windowHeight - 45);
    bottomText.style('font-size', '10px');
}

function resetUI(){
    background(255, 255, 255);
    logo.style('color', 'rgb(0, 0, 0)');
    infoText_1.style('color', 'rgb(0, 0, 0)');
    infoText_2.style('color', 'rgb(0, 0, 0)');
    bottomText.style('color', 'rgb(0, 0, 0)');
    buttons.forEach((element, i) => {
        element.remove();
    })
    buttons = [];
    switch(selectedVisualMode){
        case 0:
            setupLineOptions();
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            setupLineOptions();
            break;
    }
}

// create buttons for users to select line options
function setupLineOptions(){
    let tempButton;
    lineModes.forEach((element, i) => {
        tempButton = createButton(element.name)
        tempButton.position(element.position[0], element.position[1], element.position[2]);
        tempButton.mousePressed(() => { selectedLineMode = i; }) 
        buttons.push(tempButton);
    });
}

function setLogoAndTextColor(colorR, colorG, colorB){
    logo.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
    infoText_1.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
    infoText_2.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
    bottomText.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
}