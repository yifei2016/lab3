window.addEventListener('load', function() {
	console.log(event.target)
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

	let drawArray = document.getElementsByClassName("draw");
	
	for(let i=0; i<drawArray.length; i++){
		drawArray[i].addEventListener('click', function(event){
			let selectedOption = event.target.innerHTML;
			let status = document.getElementById('status');
			status.innerHTML = selectedOption;
		})
	}
			
	let canvas = document.getElementById("myCanvas");
	let context = canvas.getContext('2d');
	let status = document.getElementById('status');


})
function changeColor(){
	let colorInput = document.getElementById('colorInput');
	let i = document.getElementsByName('color')[0];
	i.value = colorInput.value;
	let status = document.getElementById('status');
	status.innerHTML = 'You picked color with '+  i.value;
}
