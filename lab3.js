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

	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	let select = document.getElementsByTagName('select')[0];
	select.addEventListener('change',function(event){
		let input = document.getElementsByName('color')[0];
		input.value = select.value;
		//let ctx = canvas.getContext("2d");
		ctx.strokeStyle = select.value;
	});	

	function status(str="") {
		let statusBar = document.getElementById('status');
		statusBar.innerText = str;
	}

	for(let i = 0; i < drawOptionsChildren.length; i++){
		drawOptionsChildren[i].addEventListener('click', function(event){
			//trigger click events when click menu buttons   where to update status bar
			let selectedOption = event.target.innerHTML;
			//let statusBar = document.getElementById('status');
			status(selectedOption); // what to update status bar
			whatToDraw = selectedOption.split(" ")[1];
			coordinates = [];//when change mind to click next button, should update to empty
		});
	}

	canvas.addEventListener('mouseover', event => {
		// check if we are drwaing somthing  check what we are drawing 
		// update status accordingly
		if(whatToDraw === "cirkel"){
			status('välj cirkelens mittpunkten');
		}else if(whatToDraw === "rektangel"){
			status('välj rektangel övre vänster punkten');
		}else if(whatToDraw === "triangel"){
			status('välj triangelens först punkten');
		}else if (whatToDraw === 'till') {
			status('du kommer att expotera objects till JSON');
		}else if(whatToDraw === 'handling'){
			status('du kommer att sluta rita');
		}

	});

	function getMousePos(canvas, event) {
		let rect = canvas.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		return { x: x, y: y };
	}
    let type = '';
    let drawed= [];
	canvas.addEventListener('click',function(event){
		let coordinate = getMousePos(this,event);//who call , this will be who, but only can be object
		coordinates.push(coordinate);

		if(whatToDraw === "cirkel"){
			if(coordinates.length === 1 ){
				//let statusBar = document.getElementById('status');
				status('Klicka för välja cirkelens radie, nu är position: x:' + getMousePos(this,event).x + ', ' + 'y:' + getMousePos(this,event).y + ' ,Viewport:x: ' + event.clientX + ', ' + 'y:' + event.clientY + ' ,antal klick: ' + coordinates.length); 	
			}else if (coordinates.length === 2){
				let d = Math.sqrt( (coordinates[0].x-coordinates[1].x)*(coordinates[0].x-coordinates[1].x) + (coordinates[0].y-coordinates[1].y)*(coordinates[0].y-coordinates[1].y) );
				let c = new Circle(coordinates[0].x, coordinates[0].y, d);
				c.draw(this);
				status('cirkel ritas ut');
				let object = {
					type: 'circle',
					color: ctx.strokeStyle,
					coordinates:coordinates
				};
				drawed.push(object);
				type = whatToDraw;
				coordinates = [];
			}
		}else if(whatToDraw === "rektangel"){
			if(coordinates.length === 1 ){
				//let statusBar = document.getElementById('status');
				status('Klicka för välja rektangels nedre höger punkten, nu är position: x:' + getMousePos(this,event).x + ', ' + 'y: ' + getMousePos(this,event).y + ' ,Viewport:x: ' + event.clientX + ', ' + 'y:' + event.clientY + ' ,antal klick: ' + coordinates.length);	
			}else if(coordinates.length === 2 ){
				let rectangle = new Rectangle(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
				rectangle.draw(this);
				status('rektagel ritas ut');
				let object = {
					type: 'rectangle',
					color: ctx.strokeStyle,
					coordinates:coordinates
				};
				drawed.push(object);
				type = whatToDraw;
				coordinates = [];
			}
		}else if(whatToDraw === "triangel"){
			if(coordinates.length === 1 ){
				status('Klicka för välja triangles den andra punkten, nu är position: x:' + getMousePos(this,event).x + ', ' + 'y:' + getMousePos(this,event).y + ' ,Viewport:x: ' + event.clientX + ', ' + 'y:' + event.clientY + ' ,antal klick: ' + coordinates.length); 
				
			}else if(coordinates.length === 2 ){
				//let statusBar = document.getElementById('status');
				status('Klicka för välja triangles den tredje punkten, nu är position: x:' + getMousePos(this,event).x + ', ' + 'y:' + getMousePos(this,event).y + ' ,Viewport:x: ' + event.clientX + ', ' + 'y:' + event.clientY + ' ,antal klick: ' + coordinates.length); 
				
			}else if(coordinates.length === 3 ){
				let trian = new Triangle(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y,coordinates[2].x, coordinates[2].y);
				trian.draw(this);
				status('triangel ritas ut');
				let object = {
					type: 'triangle',
					color: ctx.strokeStyle,
					coordinates:coordinates
				};
				drawed.push(object);//a list with drawed object
				type = whatToDraw;
				coordinates = [];
			}
		}	
		else if(whatToDraw === "handling"){
			coordinates = [];
		}	

	});	

	let expoteraButton = document.getElementById('export');
	expoteraButton.addEventListener('click',function(event){
		let expoterad = JSON.stringify(drawed);//it is a list with all drawed objects
		let jsonInput = document.getElementById('jsonInput');
		jsonInput.value = expoterad;
		//console.log(expoterad);
	});
});

function changeColor(){
	let colorInput = document.getElementById('colorInput');
	let color = document.getElementsByName('color')[0];
	color.value = colorInput.value;
	let newOption = document.createElement('option');
	newOption.text = colorInput.value;
	newOption.value = colorInput.value;
	let select = document.getElementsByTagName('select')[0];
	//select.appendChild(newOption);
	select.add(newOption);
	status('You picked color with '+  i.value);
}
function clearCanvas(){
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}




