/*global abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world, createDiv,fullscreen,textAlign,TOP,BASELINE,BOTTOM,noSmooth,io,  colorMode ,RGB, redraw, randomGaussian,smooth,TWO_PI,rectMode,CORNER,loadFont,Particle,createVector,noise,PI,collideRectRect,noCursor
*/
//https://raw.githubusercontent.com/bmoren/p5.collide2D/master/p5.collide2d.js

// int num =20;
// float step, sz, offSet, theta, angle;

// void setup() {
//   size(600, 400);
//   
// 
// }

let shapes = [];
const MAXshapes = 20;

var step, sz, offSet, thetah, angle;
var socket = io();
var time = 0;
let lastRGB = null;
let Montserrat;
let t;
let theta;
let maxFrameCount = 200; // frameCount, change for faster or slower animation

let extraCanvas;
let gradientCanvas;
let extraGraphics;
let textCanvas;



var gradientType = ["X","Y"];


let RGB = {'color':{
  FromR : 200,
  ToR : 72,
 
  FromG : 165,
  ToG : 61,

  FromB : 32,
  ToB : 139
  }
}



let Message = { 
  'size': 66,
  'color': [255,255,255],
  'message' :"BYOB 19'"
}

let AnimationExtraCanvas = {
  x : 150,
  y :150,
  w : 100, 
  color:255,
  multiply : 20, // 20 -100
  
}

let AnimationExtragraphics ={
  'x': 250,  // 100 -400
  'y': 50,  // 50 - 200
  'frameCountGraphics' :400,  //150 - 300
  'offSet' :40,   // 40 - 80
  'size' : 120,  //20 -120
  'rgb' : [250,100,250]  //250 - 200  150-100
}


function ChangeColor(data,style){
      var from = color(data.color.FromR, data.color.FromG, data.color.FromB); 
      var to = color(data.color.ToR, data.color.ToG, data.color.ToB); 
      setGradient(0, 0, windowWidth, windowHeight, from, to, style);
}

// function drawWave() {
  
//   WaveCanvas.push();
//   WaveCanvas.strokeWeight(Wave.stroke);
//   WaveCanvas.translate(WaveCanvas.width/2, WaveCanvas*.75);
//   angle=0;
//   for (var i=0; i<20; i++) {
//     WaveCanvas.stroke(255);
//     WaveCanvas.noFill();
//     sz = i*Wave.step;
//     var offSet = TWO_PI/20*i;
//     var arcEnd = map(sin(thetah+offSet),-1,1, PI, TWO_PI);
//     WaveCanvas.arc(0, 0, sz, sz, PI, arcEnd);
//   }
//   // WaveCanvas.colorMode(RGB);
//   // WaveCanvas.colorMode(RGB);
//   WaveCanvas.resetMatrix();
//   theta += .0523;
//   WaveCanvas.pop();
// }

function drawExtraGraphics(){
    extraGraphics.push();
    extraGraphics.translate(extraGraphics.width/2, extraGraphics.height/2);
  
    t = frameCount/AnimationExtragraphics.frameCountGraphics;
    theta = TWO_PI*t;
    extraGraphics.noStroke();
    
    for ( var x= -175; x <= 175; x += 25) {
      for (var y= -100; y <= 155; y += 50) {
        
        var offSet = AnimationExtragraphics.offSet*x+y+y;   // play with offSet to change map below
        var x2 = map(cos(-theta+offSet), 0, 1, 0, AnimationExtragraphics.x); // map x position
        var y2 = map(cos(-theta+offSet), 0, 1, 25, AnimationExtragraphics.y); // map y position
        var sz2 = map(sin(-theta+offSet), 0, 1, 15, AnimationExtragraphics.size); // map size off the ellipse
        extraGraphics.fill(AnimationExtragraphics.rgb[0]-(x/2), AnimationExtragraphics.rgb[1]+(x/6), AnimationExtragraphics.rgb[2]-(y/2)); // color with gradient created 
        extraGraphics.ellipse(x+x2, y-y2, sz2, sz2);
      }
    }
    extraGraphics.pop();
    
}

function drawExtraCanvas(){
     for(var i = 0; i < 360; i+=3){//180 240 360
      
      var x = cos(radians(i)) * AnimationExtraCanvas.x+ width / 2;
      var y = sin(radians(i)) * AnimationExtraCanvas.y + height / 2;
      var w = sin(radians(time+i )) * AnimationExtraCanvas.w;
      w = abs(w);
      var col=map(i,0,360,120,255);
      // extraCanvas.blendMode(LIGHTEST);
      extraCanvas.fill(col,col,col);
      extraCanvas.noStroke();
      extraCanvas.fill(col,0,AnimationExtraCanvas.color,AnimationExtraCanvas.multiply);
      extraCanvas.ellipse(x, y, w, w);
    }
    time++;
    
  
}

function drawText(){
  //textCanvas.
   textSize(Message.size);
    //noStroke();
    textAlign(CENTER, BOTTOM);
    fill(255);
    //smooth();
    textFont(Montserrat);
    text(Message.message, 0, height/2, width);
    textFont("Arial");
  // extraCanvas.background(100,20);
    // extraCanvas.background(0);
}




function preload() {
  Montserrat = loadFont('/assets/montserrat-bold.ttf');
}

function setup() {
   noCursor();
   createCanvas(windowWidth, windowHeight);
   //ChangeColor(RGB,"Y");
    
   extraCanvas = createGraphics(windowWidth, windowHeight);
   extraCanvas.clear();
  
   gradientCanvas = createGraphics(windowWidth, windowHeight);
   gradientCanvas.clear();
   
   textCanvas = createGraphics(windowWidth, windowHeight);
   textCanvas.clear();
  
   extraGraphics = createGraphics(windowWidth, windowHeight);
   extraGraphics.clear();
   
  
   //background(164,56,234);
  

   socket.on("Gradient",function UpdateRGB(data){ 
       shapes = [];
       ChangeColor(data,gradientType[Math.floor(Math.random()*gradientType.length)]);
      }
    );
  
   socket.on("ExtraCanvas",function UpdateExtraCanvas(){
      
     extraCanvas.clear();
     AnimationExtraCanvas.x = random(60,200);
     AnimationExtraCanvas.y = random(60,200);
     AnimationExtraCanvas.w = random(60,200);
     AnimationExtraCanvas.color = random(150,255);
     AnimationExtraCanvas.multiply = random(20,80);
     
   })
  
   socket.on("ExtraGraphics",function UpdateExtraCanvas(){

     extraGraphics.clear();
     AnimationExtragraphics.x = random(100,400);
     AnimationExtragraphics.y = random(50,200);
     AnimationExtragraphics.frameCountGraphics = random(150,300);
     AnimationExtragraphics.offSet = random(40,80);
     AnimationExtragraphics.size = random(20,120);
     AnimationExtragraphics.rgb = [random(200,250),random(100,150),random(200,250)];

 });
  socket.on("Emoji", function RandomizeEmoji(){
    shapes = [];
    for (var i = 0; i < MAXshapes; i++) {
      shapes.push(new Shape(i));
    }
  })
  socket.on("customText",function CustomText(data){
    console.log(data)
    // Message.message = data.chat.first_name + ": " + data.text
    Message.message =  data.text
  })
  socket.on("Text", function UpdateText(){    
    Message.message = "Привет мир!"
});
}






function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) { 
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      gradientCanvas.stroke(c);
      gradientCanvas.line(x, i, x+w, i);
    }
  }  
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      gradientCanvas.stroke(d);
      gradientCanvas.line(j, y, j, y+h);
    }
  }
}





function draw() {
    //extraGraphics.background(0);
    
    drawExtraCanvas();
    
    drawExtraGraphics();
    // drawWave();
    drawText();
    image(gradientCanvas, 0, 0); //Градиент

    
    
    
      
    
         for (let i = 0; i < shapes.length; i++) {
      shapes[i].display();
      if (shapes[i].isSmaller()) {
        shapes[i].relocate();
      }
    }
    
    image(extraGraphics, 0,0); // Круг
    image(extraCanvas, 0, 0); // 

    // image(WaveCanvas, 0, 0); //Волны
    
    // Draw text
    // textAlign(CENTER, BOTTOM);
    push();
    translate(windowWidth/2, windowHeight/2);
    let bbox = Montserrat.textBounds(Message.message, 0, 0, Message.size);
    fill(0);
    //stroke(0);
    rect(bbox.x-14, bbox.y-19, bbox.w+16, bbox.h+36);
    fill(0);
    noStroke();
    textSize(Message.size);
    //noStroke();
    fill(255);
    //smooth();
    //textFont(Montserrat);
    text(Message.message, 0, 0);
    textFont("Helvetica");
    pop();
  // extraCanvas.background(100,20);
    // extraCanvas.background(0);
  
  
  
  // extraCanvas.clear();
  extraGraphics.clear();
  
}







function keyPressed() {
  if (keyCode == 70) {
     let fs = fullscreen();
     fullscreen(!fs);
    }
  
  if (keyCode == 81) {
    RGB.color.FromR =random(255);
    RGB.color.FromG =random(255);
    RGB.color.FromB =random(255);
    
    RGB.color.toR =random(255);
    RGB.color.toG =random(255);
    RGB.color.toB =random(255);
    // gradientType[Math.floor(Math.random()*gradientType.length)]);
    ChangeColor(RGB,gradientType[Math.floor(Math.random()*gradientType.length)]);
    socket.emit("Gradient" ,RGB);
        textAlign(LEFT, TOP);
    shapes = [];
    for (let i = 0; i < MAXshapes; i++) {
      shapes.push(new Shape(i));
    }
    }
  
  // if(keyCode == 65){
  //   fcc(RGB, "X");
  // }
  // if(keyCode == 82){
  //   ChangeExtraCanvas()
  // }
  if(keyCode == 84){
    Message.size = 89;
    //setGradient(0, 0, windowWidth, windowHeight, from, to, "Y");
    //noStroke();
    Message.color[0]=random(200,255);
    Message.color[1]=random(200,255);
    Message.color[2]=random(200,255);
    //textAlign(CENTER, BOTTOM);
    Message.message="Привет мир!";
    //ChangeText(textA);
    console.log("Send text data");
    socket.emit("Text" ,Message);
  }
}

function Shape(id) {
  this.pos = createVector(random(width), random(height));
  this.size = width > height ? random(50, 100) : random(50, 200);
  this.id = id;
  this.emojiCode = random(10) > 7.75 ? floor(random(128512, 128592)) : floor(random(127744, 128318));
  this.emoji = String.fromCodePoint(this.emojiCode);
  this.hit = false;

  this.isSmaller = function () {
    
    for (let i = 0; i < shapes.length; i++) {
      if (i != this.id) {
        this.hit = collideRectRect(this.pos.x, this.pos.y, this.size, this.size,
          shapes[i].pos.x, shapes[i].pos.y, shapes[i].size, shapes[i].size);

        if (this.hit && this.size < shapes[i].size) {
          return true;
        }
      }
    }
    return false;
  }

  this.relocate = function () {
    this.pos = createVector(random(width), random(height));
    this.size *= random(0.3, 0.9);
  }
  

  this.display = function () {
    // rect(this.pos.x, this.pos.y,this.size,this.size);
    textSize(this.size);
    text(this.emoji, this.pos.x, this.pos.y + this.size * 0.05);
  }
}


function mousePressed() {
  shapes = [];
  for (var i = 0; i < MAXshapes; i++) {
    shapes.push(new Shape(i));
  }
}
