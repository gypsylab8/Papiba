let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let ear1X, ear1Y, ear2X, ear2Y;
let eye1X, eye1Y, eye2X, eye2Y;
let poses = [];
let skeletons = [];
let pg;
let pNoseX;
let pNoseY;
let pap;
let pap1;
let pap2;
let pap3;
let pap4;
let pap5;

var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;

function setup() {
  canvas = createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  pixelDensity(1);
  pg = createGraphics(width, height);
  
  img1 = createImg('aa_head.png');
  img2 = createImg('aa_backpipa.png');
  img3 = createImg('aa_backpipainv.png');
  img4 = createImg('bambole.png');
  img5 = createImg('aa_centro');
  img6 = createImg('pulodogrilo.png');
  img7 = createImg('regaflor.png');
  img8 = createImg('pipa1.png');
  img9 = createImg('aa_laban.png');
}

function preload(){
  
//preloading all the sounds needed to to be played once the model is ready
  pap1 = loadSound('pap1.mp3');
  pap2 = loadSound('pap2.mp3');
  pap3 = loadSound('pap3.mp3');
  pap4 = loadSound('pap4.mp3');
  pap5 = loadSound('pap5.mp3');
  coins1 = loadSound('int1.wav');
  coins2 = loadSound('int2.wav');
  coins3 = loadSound('coins3.wav');
  coins4 = loadSound('int4.wav');
  
  
}

function modelLoaded(){
  console.log('Model Is Ready');
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
    
    ear1X = poses[0].pose.keypoints[3].position.x;
    ear1Y = poses[0].pose.keypoints[3].position.y;
    
    ear2X = poses[0].pose.keypoints[4].position.x;
    ear2Y = poses[0].pose.keypoints[4].position.y;
        
    eye1X = poses[0].pose.keypoints[1].position.x;
    eye1Y = poses[0].pose.keypoints[1].position.y;
    
    eye2X = poses[0].pose.keypoints[2].position.x;
    eye2Y = poses[0].pose.keypoints[2].position.y;
  }
}

function draw() {
  
 //background(0,50);
  image(img2, 0, 0, width, height);
  image(pg, 0, 0, width, height);
  image(img9, 0, 0, width, height);
 //fill(noseY, noseY/2, noseX/2);
 // rect(noseX, noseY, noseX/2, noseY);	
 // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
 // drawSkeleton();
  posePlayer();  
 
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < min(poses.length, 1); i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if (j == 0) {
          noseX = keypoint.position.x;
          noseY = keypoint.position.y;

          pg.stroke(random(0,255), random(0,255), random(0,255));
          pg.strokeWeight(random(3,10));

          let angle = frameCount/120;
          
          //pg.noStroke();
          //pg.ellipse(noseX+cos(angle*10)*5, noseY+sin(angle*10)*width/50, height/20, width/20);
          //pg.ellipse(noseX+cos(angle*10)*190, noseY+sin(angle*10)*50, random(12,3), random(3,12));
          
          pNoseX = noseX;
          pNoseY = noseY;
          
          img1.position(noseX-80, noseY-100);

        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(noseX, noseY, noseX*noseY);
      strokeWeight(10);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y,);
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
}

function keyPressed() {
  pg.clear();
}

function modelReady() {
  select('#status').html('model Loaded');
}
  
function posePlayer()  {

// Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Seperating out the 17 keypoints posenet returns
    let nose = pose.keypoints[0];
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    let leftEar = pose.keypoints[3];
    let rightEar = pose.keypoints[4];
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];
    let leftKnee = pose.keypoints[13];
    let rightKnee = pose.keypoints[14];

    if (nose.score > 0.5) {      
// Nose playing
      
      if( nose.position.x > 200 && nose.position.x < 400 && nose.position.y > 400 && nose.position.y < 450 && !pap1.isPlaying()){
        img4.show();
        img5.hide();
        img6.hide();
        img7.hide();
        img8.hide();
        img9.hide();
        img4.position(noseX-200, noseY-300);
        pap1.play();
        image(pg, 0, 0, width, height);
      } else if( nose.position.x < 200 && nose.position.x > 400 && nose.position.y < 200 && pap1.isPlaying()) {
        pap1.stop();
        
      }
      // Nose playing condition 1
      if(nose.position.y > 0 && nose.position.y <= height/4 && !pap2.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, height/8, width, height/4);
        pap2.play();
        img4.hide();
        img5.hide();
        img6.hide();
        img7.hide();
        img8.show();
        img9.hide();
        img8.position(noseX-300, noseY);
        coins1.play();
        // drumLoopTwo.loop();
      } else if(nose.position.y > height/4 && nose.position.y < height && pap2.isPlaying()){
        coins1.stop();
        pap2.stop();
      }

      // Nose playing condition 2
      if(nose.position.y > height/4 && nose.position.y <= height/2 && !pap3.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 3*height/8, width, height/4);
        img4.hide();
        img5.hide();
        img6.show();
        img7.hide();
        img8.hide();
        img9.hide();
        img6.position(noseX-300, noseY-300);
        pap3.play();
        coins2.play();
        // drumLoopOne.loop();
      } else if(nose.position.y <= height/4 && nose.position.y > height/2 && nose.position.y < height && pap3.isPlaying()){
        pap3.stop();
        coins2.stop();
      }

      // Nose playing condition 3
      if(nose.position.y > height/2 && nose.position.y <= 3*height/4 && !pap4.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 5*height/8, width, height/4);
        img4.hide();
        img5.show();
        img6.hide();
        img7.hide();
        img8.hide();
        img9.hide();
        img5.position(noseX-200, noseY-300);
        pap4.play();
        coins3.play();
      } else if(nose.position.y < height/2 && nose.position.y > 3*height/4 && nose.position.y < height && pap4.isPlaying()){
        coins3.stop();
        pap4.stop();
      }


      // Nose playing condition 4
      //
      if(nose.position.y > 3*height/4 && nose.position.y <= height && !pap5.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 7*height/8, width, height/4);
        img4.hide();
        img5.hide();
        img6.hide();
        img7.show();
        img8.hide();
        img9.hide();
        img7.position(noseX-200, noseY-300);
        pap5.play();
        coins4.play();
      } else if(nose.position.y < 3*height/4 && nose.position.y > 0 && nose.position.y < height && pap5.isPlaying()){
        pap5.stop();
        coins4.stop();
      }

    }
  
  }
}
