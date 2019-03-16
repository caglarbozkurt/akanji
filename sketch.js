let wave = [], x, y, startWidth, startHeight, mic, mode;
let buttonRainbow, buttonBlackAndWhite, buttonBoring, buttonFlower, buttonWesAnderson;

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
    // button config
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
            stroke(Math.random() * 255, Math.random() * 255, Math.random() * 255);
            break;
        case 'black-and-white':
            background(0, 0, 0);
            stroke(255, 255, 255);
            break;
        case 'flower':
            background(0, 0, 0);
            break;
        case 'wes-anderson':
            background(138,174,191);
            stroke(240,211,154);
            break;
        default:
            background(255, 255, 255);
            stroke(0, 0, 0);
            break;
    }
    // logo
    textSize(40);
    strokeWeight(2);
    text('akanji', 30, 60);
    strokeWeight(1);
    textSize(15);
    text('you need to give access to your microphone for akanji to start.', 30, 85);
    text('also, touch/click on the screen it isn\'t working.', 30, 100);
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