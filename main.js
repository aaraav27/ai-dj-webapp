song1 = "";
song2 = "";
scoreleftwrist = 0;
scorerightwrist = 0;
song1_status = "";
song2_status = "";
leftWristx = 0;
leftwristy = 0;
rightwristx= 0;
rightwristy = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet  = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotposes);
}

function gotposes(result){
if(result.length > 0.1){
	console.log(result);
	scoreleftwrist = result[0].pose.keypoints[9].score;
	console.log(scoreleftwrist);

	scorerightwrist = result[0].pose.keypoints[10].score;
	console.log(scorerightwrist);


	leftwristx = result[0].pose.leftWrist.x;
	leftwristy = result[0].pose.leftWrist.y;
	console.log("leftwristx = "+ leftwristx + "leftwristy ="+ leftwristy);


	rightwristx = result[0].pose.rightWrist.x;
	rightwristy = result[0].pose.rightWrist.y;
	console.log("rightwristx = "+ rightwristx + "rightwristy ="+ rightwristy);
}

}


function modelLoaded(){
	console.log("model is initialized")
}

function draw() {
	image(video, 0, 0, 600, 500);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();	
fill("red");
stroke("green");
if(scoreleftwrist>0.1){
	circle(leftWristx , leftwristy, 20);
	song2.stop();

	if(song1_status == false){
		song1.play();
		document.getElementById("span").innerHTML = "playing harry porter theme song";
	}
}

if(scorerightwrist>0.1){
	circle(rightwristx , rightwristy, 20);
	song1.stop();

	if(song2_status == false){
		song2.play();
		document.getElementById("span").innerHTML = "playing peter pan";
	}
}


}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
	
}
