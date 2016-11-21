function Circle(centerX, centerY, radius){
	this.centerX = centerX; 
	this.centerY = centerY; 
	this.radius = radius;
	
	this.area = function(){
		return 	Math.PI * this.radius * this.radius;
	};
	this.move = function(dx,dy){
		this.centerX = 	this.centerX + dx;
		this.centerY = 	this.centerY + dy;
	};
	this.points = function(){
		return [{x:this.centerX, y:this.centerY}];
	};
	this.distanceTo = function(otherCircle){
		let x1 = this.centerX;
		let x2 = otherCircle.centerX;
		let y1 = this.centerY;
		let y2 = otherCircle.centerY;
		let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		let distance = d - this.radius - otherCircle.radius;
		if(distance <= 0){
			return 0;
		}
		return distance;
	};
	this.boundingBox = function(){
		let x1 = this.centerX - this.radius;
		let y1 = this.centerY + this.radius;
		let x2 = this.centerX + this.radius;
		let y2 = this.centerY - this.radius;
		let rectangle = new Rectangle(x1,y1,x2,y2);
		return rectangle;
	};
	this.toString = function(){
		return "Jag är en cirkel med mittpunkt (" + this.centerX + "," + this.centerY + ") och radie" + this.radius + ".";
	};
	this.draw = function(canvas) {
		let ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI); // 2*PI motsvarar 360 grader
		ctx.stroke();
	}
}
