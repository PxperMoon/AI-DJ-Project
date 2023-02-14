function preload() {

}

function setup() {
    canvas = createCanvas(700, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 200, 200, 250, 200);
    

    rect(30, 175, 10, 250);
    rect(670, 175, 10, 250);
    rect(42, 160, 625, 10);
    rect(42, 427, 625, 10);
}