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
var background2 = new Image;
background2.src = "background-2.png";
var star1 = new Image;
star1.src = "star1.png";
var star2 = new Image;
star2.src = "star2.png";
var start = false;
var types = [0,1,1,3,3,1,1,3,3,0,1,1,3,3,1,1,3,3,4,4,4]
function gameLoop(){
	if(start){
	start = false;	
	//ctx.drawImage(background,0,0,2000,1000)
	}
	var coeff = document.getElementById("lname").value;
	frames++;
	average_new_per_second = coeff*Math.max(Math.sin(frames/300)/55, 0.001)
	if(Math.random() < average_new_per_second){
		var a = new element(types[Math.floor(Math.random() * types.length)], 0, 0)
		a.elementPlay()
		stars.push(a)
	}
	for(var i = 0; i < stars.length; i++){
		stars[i].draw()
		stars[i].rotation += 0.00654498469
	}
	//ctx.drawImage(background2, 0,0,2000,1000)
	window.requestAnimationFrame(gameLoop);
}
var average_new_per_second = 0;
var frames = 0;
var stars = []

var palletes = [["#2A2B2A", "#706C61","#F8F4E3","#E5446D","#FF8966"],
				["#BA7BA1", "#C28CAE","#D0ABA0","#DEC4A1","#EDCF8E"],
				["#401F3E", "#3F2E56","#453F78","#759AAB","#FAF2A1"]
]
var this_pallete = Math.floor(Math.random() * palletes.length)

class element{
	constructor(type, x, y){
		this.ended = false
		this.type = type
		this.rotation = 0;
		this.color = palletes[this_pallete][this.type];
		if(type === 0){
			this.file = 'background-1.mp3';
		}
		else if(type === 1){
			this.file = 'bass.mp3';
		}
		else if(type === 2){
			this.file = 'stars12.mp3';

			}
		else if(type === 3){
			this.file = 'bassoon.mp3';

			}
		else if(type === 4){
			this.file = 'stars13.mp3';

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
		ctx.rotate(this.rotation);
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, 5, 5)
		
		ctx.rotate(-this.rotation)
		ctx.translate(-canvas.width/2, -canvas.height/2)
	}
}

gameLoop()

