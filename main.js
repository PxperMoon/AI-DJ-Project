song = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

status = "";
status2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(400, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized.");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 400, 500);

    status = song.isPlaying();
    status2 = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        
        console.log(song);

        song2.stop();

        if(status == false) {
            song1.play();

            document.getElementById("songname").innerHTML = "Song #1 is playing.";
        }
    }

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        
        console.log(song2);

        song.stop();

        if(status2 == false) {
            song2.play();

            document.getElementById("songname").innerHTML = "Song #2 is playing.";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}