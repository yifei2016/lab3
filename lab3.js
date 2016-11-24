window.addEventListener('load', function() {
	let buttonMenu = document.getElementById('menu');
	let drawOptions = document.getElementById('drawOptions');
	drawOptions.style.display = 'none';
	
	buttonMenu.addEventListener('click',function(event){	
		if(drawOptions.style.display=='none'){
			drawOptions.style.display='block';
		}else{
			drawOptions.style.display='none';
		}
	});

	let drawOptionsChildren = drawOptions.children; //menu buttons
	let whatToDraw = "";
	let coordinates = [];
	
	for(let i = 0; i < drawOptionsChildren.length; i++){
		// where to update status bar
		
		drawOptionsChildren[i].addEventListener('click', function(event){
			//trigger click events when click menu buttons
			let selectedOption = event.target.innerHTML;
			let statusBar = document.getElementById('status');
			statusBar.innerHTML = selectedOption; // what to update status bar
			whatToDraw = selectedOption.split(" ")[1];
			coordinates = [];//when change mind to click next button, should update to empty
		});
	}

	function status(str) {
		let statusBar = document.getElementById('status');
		statusBar.innerText = str || "";
	}

	function getMousePos(canvas, event) {

		let rect = canvas.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;

		return { x: x, y: y };
	}

	let canvas = document.getElementById("myCanvas");

	canvas.addEventListener('mouseover', event => {
		// check if we are drwaing somthing
			// check what we are drawing 
				// update status accordenlty
		if(whatToDraw === "cirkel"){
			status('välj cirkelens mittpunkten');
		}else if(whatToDraw === "rektangel"){
			status('välj rektabgel övre vänster punkten');
		}else if(whatToDraw === "triangel"){
			status('välj triangelens först punkten');
		}
		
	});
	let drawed = [];
	// When to update status bar
	canvas.addEventListener('click',function(event){
		let coordinate = getMousePos(this,event);
		coordinates.push(coordinate);
		if(whatToDraw === "cirkel"){
			if(coordinates.length === 1 ){
				let statusBar = document.getElementById('status');
				statusBar.innerHTML = 'Klicka för välja cirkelens radie.'
				
			}else if (coordinates.length === 2){
				let d = Math.sqrt( (coordinates[0].x-coordinates[1].x)*(coordinates[0].x-coordinates[1].x) + (coordinates[0].y-coordinates[1].y)*(coordinates[0].y-coordinates[1].y) );
				let c = new Circle(coordinates[0].x, coordinates[0].y, d);
				c.draw(this);
				drawed.push(c);
				status('cirkel ritas ut');
				coordinates = [];
			}
		}else if(whatToDraw === "rektangel"){
			if(coordinates.length === 1 ){
				let statusBar = document.getElementById('status');
				statusBar.innerHTML = 'Klicka för välja rektangels nedre höger punkten.'
				
			}
			if(coordinates.length === 2 ){
				let rectangle = new Rectangle(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
				rectangle.draw(this);
				status('rektagel ritas ut');
				coordinates = [];
			}
		}else if(whatToDraw === "triangel"){
			if(coordinates.length === 1 ){
				let statusBar = document.getElementById('status');
				statusBar.innerHTML = 'Klicka för välja triangles den andra punkten.'
				
			}
			else if(coordinates.length === 2 ){
				let statusBar = document.getElementById('status');
				statusBar.innerHTML = 'Klicka för välja triangles den tredje punkten.'
				
			}
			else if(coordinates.length === 3 ){
				let triangle = new Triangle(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y,coordinates[2].x, coordinates[2].y);
				triangle.draw(this);
				status('triangel ritas ut');
				coordinates = [];
			}
		}
		
	});

	let select = document.getElementsByTagName('select')[0];
	select.addEventListener('change',function(event){
		let ctx = canvas.getContext("2d");
		ctx.strokeStyle = select.value;
	});
		
});

	



function changeColor(){
	let colorInput = document.getElementById('colorInput');
	let i = document.getElementsByName('color')[0];
	i.value = colorInput.value;
	let status = document.getElementById('status');
	status.innerHTML = 'You picked color with '+  i.value;
}
function clearCanvas(){
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}



