let wave = [], x, y, startWidth, startHeight, mic, mode;
let buttonRainbow, buttonBlackAndWhite, buttonBoring, buttonFlower, buttonWesAnderson;
let logo, infoText_1, infoText_2, bottomText;
let colorR, colorG, colorB;

function preload(){
}

function setup() {
    // setup the canvas
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    canvas.position(0, 0);
    // start positions
    startWidth = windowWidth / 2;
    startHeight = windowHeight * 2 / 3;
    setupHeader();
    setupButtons();
    // text and line specs
    textFont('Calibri');
    // mic
    mic = new p5.AudioIn();
    mic.start();
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }  
}

function draw() {
    // mode specifications

    switch(mode){
        case 'rainbow':
            background(255, 255, 255);
            colorR = Math.random() * 255;
            colorG = Math.random() * 255;
            colorB = Math.random() * 255;
            stroke(colorR, colorG, colorB);
            logo.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            infoText_1.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            infoText_2.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            bottomText.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            break;
        case 'black-and-white':
            background(0, 0, 0);
            logo.style('color', 'rgb(255, 255, 255)');
            infoText_1.style('color', 'rgb(255, 255, 255)');
            infoText_2.style('color', 'rgb(255, 255, 255)');
            bottomText.style('color', 'rgb(255, 255, 255)');
            stroke(255, 255, 255);
            break;
        case 'flower':
            background(0, 0, 0);
            colorR = Math.random() * 255;
            colorG = Math.random() * 255;
            colorB = Math.random() * 255;
            logo.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            infoText_1.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            infoText_2.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            bottomText.style('color', 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')');
            break;
        case 'wes-anderson':
            background(138,174,191);
            stroke(240,211,154);
            logo.style('color', 'rgb(240, 211, 154)');
            infoText_1.style('color', 'rgb(240, 211, 154)');
            infoText_2.style('color', 'rgb(240, 211, 154)');
            bottomText.style('color', 'rgb(240, 211, 154)');
            break;
        default:
            background(255, 255, 255);
            stroke(0, 0, 0);
            logo.style('color', 'rgb(0, 0, 0)');
            infoText_1.style('color', 'rgb(0, 0, 0)');
            infoText_2.style('color', 'rgb(0, 0, 0)');
            bottomText.style('color', 'rgb(0, 0, 0)');
            break;
    }
    strokeWeight(2);
    // calc of the point
    x = startWidth;
    y = startHeight - (mic.getLevel() * startHeight);
    // add the current point values to the array
    wave.push([x, y]);
    if(wave.length === 0 || wave.length === 1);
    else {
        // draw everything
        for(let i = 0; i < wave.length; i++){
            wave[i][0] = (startWidth - wave.length + i);
            if(i === 0);
            else {
                if(i+1 === wave.length);
                else {
                    // this looks ugly but nothing to do about it right now
                    if(mode === 'flower')
                        stroke(Math.random() * 255, Math.random() * 255, Math.random() * 255);
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
    selector.position(140, 50);
    selector.option('lines');
    selector.option('circles');
    selector.option('triangles');
    selector.option('fractals');
    selector.option('stuff');
    selector.changed(() => {
        console.log(selector.value());
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

function setupButtons(){
    buttonRainbow = createButton('rainbow');
    buttonRainbow.position(30, 120, 65);
    buttonRainbow.mousePressed(() => { mode = 'rainbow'; }); 
    buttonBlackAndWhite = createButton('black-and-white');
    buttonBlackAndWhite.position(30, 150, 65);
    buttonBlackAndWhite.mousePressed(() => { mode = 'black-and-white'; }); 
    buttonBoring = createButton('boring');
    buttonBoring.position(30, 180, 65);
    buttonBoring.mousePressed(() => { mode = 'default'; });
    buttonFlower = createButton('flower');
    buttonFlower.position(30, 210, 65);
    buttonFlower.mousePressed(() => { mode = 'flower' ; });
    buttonWesAnderson = createButton('wes-anderson');
    buttonWesAnderson.position(30, 240, 65);
    buttonWesAnderson.mousePressed(() => { mode = 'wes-anderson';});
}