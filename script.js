var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.getBoundingClientRect().width;
var height = canvas.getBoundingClientRect().height;

var scaley = height/width;

// create web audio api context
const audioCtx = new(window.AudioContext || window.webkitAudioContext)
audioCtx.resume()


var start = false;
function mouse_click(event){
  start = true;
}
function init() {
  
  canvas.addEventListener("click", mouse_click);

}
init()

var background_playing = false
var stars_playing = false
var background = new Image;
background.src = "background.png";
var star1 = new Image;
star1.src = "star1.png";
var star2 = new Image;
star2.src = "star2.png";
function gameLoop(){
	ctx.drawImage(background,0,0,2000,1000)
	frames++;
	average_new_per_second = Math.max(Math.sin(frames/300)/55, 0.001)
	if(Math.random() < average_new_per_second){
		var a = new element(Math.floor(Math.random() * 1.99), 0, 0)
		a.elementPlay()
		stars.push(a)
	}
	for(var i = 0; i < stars.length; i++){
		stars[i].draw()
		stars[i].rotation += 0.00654498469
		console.log(stars[i].ended)
	}
	window.requestAnimationFrame(gameLoop);
}
var average_new_per_second = 0;
var frames = 0;
var stars = []

class element{
	constructor(type, x, y){
		this.ended = false
		this.type = type
		this.rotation = 0;
		if(type === 0){
			this.file = 'background-1.mp3';
		}
		else if(type === 1){
			this.file = 'stars-1.mp3';
		}
		else{
			this.file = 'background-2.mp3';

			}
			this.x = Math.random() * width/4 + Math.random() * width/4;
			this.y = Math.random() * height/4 + Math.random() * height/4;
		}
	elementPlay(){
		this.audio = new Audio(this.file)
		this.audio.play()
	}
	draw(){
		ctx.translate(canvas.width/2, canvas.height/2)
		this.audio.onended = function() {
    		stars.shift()
		};
		if(this.type === 1){
			ctx.rotate(this.rotation);
			ctx.drawImage(star1, this.x, this.y, 75, 75);
			ctx.rotate(-this.rotation)

		}
		else{
			ctx.rotate(this.rotation);
			ctx.drawImage(star2, this.x, this.y, 75, 75);
			ctx.rotate(-this.rotation)
		}
		ctx.translate(-canvas.width/2, -canvas.height/2)
	}
}

gameLoop()

