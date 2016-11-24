function Circle(centerX, centerY, radius){
	this.centerX = centerX; 
	this.centerY = centerY; 
	this.radius = radius;
	this.draw = function(canvas) {
		let ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI); // 2*PI motsvarar 360 grader
		ctx.stroke();
		ctx.fillStyle = "red";
		ctx.fill();
	}
}
