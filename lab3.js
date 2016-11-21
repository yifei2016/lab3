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

	let drawArray = document.getElementById("drawOptions").children;
	
	for(let i=0; i<drawArray.length; i++){
		drawArray[i].addEventListener('click', function(event){
			let selectedOption = event.target.innerHTML;
			let status = document.getElementById('status');
			status.innerHTML = selectedOption;
		})
	}
			
	let canvas = document.getElementById("myCanvas");
	canvas.addEventListener('click',function(event){
		let coordinate = getMousePos(canvas,event);
		let c = new Circle(coordinate.x, coordinate.y, 50);
		c.draw(canvas);
	});
	
});

function getMousePos(canvas, event) {

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    	
    return { x: x, y: y };
}

function changeColor(){
	let colorInput = document.getElementById('colorInput');
	let i = document.getElementsByName('color')[0];
	i.value = colorInput.value;
	let status = document.getElementById('status');
	status.innerHTML = 'You picked color with '+  i.value;
}
