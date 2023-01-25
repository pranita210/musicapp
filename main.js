song = "";
scoreRightWrist = 0;
scoreleftWrist = 0;
leftWristX = 0;
leftWristY = 0;
song1_status = 0;
song2_status = 0;

rightWristX = 0;
rightWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is Initialize');
}

function gotPoses(results) {
if(results.length > 0){
console.log(results);

scoreRightWrist = results[0].pose.keypoints[10].score;
scoreleftWrist = results[0].pose.keypoints[9].score;
console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rigthWrist.y;


console.log("rightWristX = "+ rightWristX + "rightWristY = "+ rigthWristY);


}
}

function draw() {
    Image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
	stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY,20);
        song.stop();

        if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}

}

    



function preload()  {
    song = loadSong("music.mp3")
}

function  play()  {
    song.play();
    song.setVolume(1);
    song.rate(1);
}