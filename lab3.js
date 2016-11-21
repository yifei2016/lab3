window.addEventListener('load', function() {
	console.log(event.target)
	let b = document.getElementById('menu');
	let l = document.getElementById('lis');
	l.style.display = 'none';
	//b.onclick = function() {	
	//}
	b.addEventListener('click',function(event){	
		if(l.style.display=='none'){
			l.style.display='block';
		}else{
			l.style.display='none';
		}
	});
	
	let canvas = document.getElementById("myCanvas");
	let context = canvas.getContext('2d');

	let status = document.getElementById('status');
	//window.addEventListener('click', function(event){
		
	//})


})
function changeColor(){
	let colorInput = document.getElementById('colorInput');
	let i = document.getElementsByName('color')[0];
	i.value = colorInput.value;
	let status = document.getElementById('status');
	status.innerHTML = 'You picked color with '+  i.value;
}
function selectedOption(event){
	let selectedOption = event.target.innerHTML;
	let status = document.getElementById('status');
	status.innerHTML = selectedOption;
}