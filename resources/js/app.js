// variable all

	let submitBtn = document.getElementById('submit');
	let Taskinput = document.getElementById('task');
	let Filter = document.getElementById('filter');
	let ul = document.querySelector('ul.list-group');
	let form = document.getElementById('form-task');
	let clearBtn = document.getElementById('Clear');

	// load all function

	loadAllEvents();

	function loadAllEvents(){
		// load dom content
		document.addEventListener('DOMContentLoaded', getTask)
		form.addEventListener('submit', addTask);
		ul.addEventListener('click', removeTask);
		clearBtn.addEventListener('click', ClearAllTask);
		filter.addEventListener('keyup', filterTask);
	}
	
	function getTask(task){
		let taskStorage ;
		if (localStorage.getItem('taskStorage') === null) {
			taskStorage = [];
		}else{
			taskStorage = JSON.parse(localStorage.getItem('taskStorage'))
		}
		
		taskStorage.forEach(function(task){
			let li = document.createElement('li');
			li.className ='list-group-item';
			li.appendChild(document.createTextNode(task.toLowerCase()));
			let link = document.createElement('a');
			link.className='glyphicon glyphicon-remove text-right';
			li.appendChild(link)
			ul.appendChild(li);
			
		})

	}


	function addTask(e){
		e.preventDefault();
		if (Taskinput.value ==='') {
			ShowError('Please Insert Task!');
		}else{
			let li = document.createElement('li');
			li.className ='list-group-item';
			li.appendChild(document.createTextNode(Taskinput.value.toLowerCase()));
			let link = document.createElement('a');
			link.className='glyphicon glyphicon-remove text-right';
			li.appendChild(link)
			ul.appendChild(li);

			storeinLocalStorage(Taskinput.value.toLowerCase())
		}
		Taskinput.value ='';
	}
	function ShowError(Error){
	// Create Elements
	const errorDiv = document.createElement('div');
	const PanelBody = document.querySelector('.col-md-6');
	const FormTask = document.querySelector('.panel');
	errorDiv.className = 'alert alert-danger';
	errorDiv.appendChild(document.createTextNode(Error));
	PanelBody.insertBefore(errorDiv,FormTask);

	setTimeout(clearError,3000)

	}
	function clearError(){
		document.querySelector('.alert').remove();
	}



	function storeinLocalStorage(tasks){
		let taskStorage ;

		if (localStorage.getItem('taskStorage') === null) {
			taskStorage = [];
		}else{
			taskStorage = JSON.parse(localStorage.getItem('taskStorage'))
		}
		taskStorage.push(tasks)
		localStorage.setItem('taskStorage',JSON.stringify(taskStorage))


	}

	function removeTask(e){
		
		if (e.target.classList.contains('glyphicon')) {
			if (confirm('are you sure you want to delete ?')) {
				e.target.parentElement.remove();
				RemoveFromLS(e.target.parentElement);
			}
		}
	}
	function RemoveFromLS(taskItem){
		let taskStorage;
		if (localStorage.getItem('taskStorage') === null) {
			taskStorage = [];
		}else{
			taskStorage = JSON.parse(localStorage.getItem('taskStorage'))
		}

		taskStorage.forEach(function(task,index){
			if (taskItem.textContent===task) {
				taskStorage.splice(index,1);
			}
		})

		localStorage.setItem('taskStorage', JSON.stringify(taskStorage));


	}

	function ClearAllTask(e){
		e.preventDefault();
		if (ul.childElementCount===0) {
			alert('Empty List!');
		}else{
			if (confirm('are you sure you want to delete ?')) {
				ul.innerHTML='';
			}
		}

		clearAllTaskFromLS();
	
	}

	function clearAllTaskFromLS(){
		localStorage.clear();

	}



	function filterTask(e){
		// set input values to lowercase

		const Inputvalue = e.target.value.toLowerCase();
		const LiElements = document.querySelectorAll('.list-group-item');

		LiElements.forEach(function(task,i){
			const item = task.firstChild.textContent;
			if (item.toLowerCase().indexOf(Inputvalue) === 0) {
				task.style.display='block';
			}else{
				task.style.display='none';
			}

		})

		

	}

document.body.style.color='white';
// document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1503480207415-fdddcc21d5fc?ixlib=rb-0.3.5&s=3e6faf79a71272055368540511024a7b&auto=format&fit=crop&w=750&q=80')";
// document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1532304854-4248635f2cb5?ixlib=rb-0.3.5&s=8503a6176e6c27722d56af840b156769&auto=format&fit=crop&w=400&q=60')";

document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1526116241176-e1788a3c83e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d783f82d38bc158d0b717f488f686aa&auto=format&fit=crop&w=667&q=80')";
document.body.style.backgroundRepeat="no-repeat";
document.body.style.backgroundSize="cover";
// document.body.style.backgroundPosition="center";





 /* ------------------------     GUESS NUMBER SCRIPT     -----------------------------   */




// Game Values
let min = 1,
	max = 10,
	winningNum = getRandom(min,max),
	guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
	  minNum  = document.querySelector('.minNum'),
	  maxNum  = document.querySelector('.maxNum'),
	  guessBtn  = document.querySelector('#gameBtn'),
	  guessInput  = document.querySelector('#input'),
	  Message  = document.querySelector('#message');

// Assign Min and max

minNum.textContent = min;
maxNum.textContent = max;

// add event
	game.addEventListener('mousedown', function(e){
		if (e.target.classList.contains('play-again')) {
			window.location.reload();
		}
	})


	guessBtn.addEventListener('click',function(){
		let guess = parseInt(guessInput.value);
		// validate
		if (isNaN(guess) || guess<min || guess>max) {
			setMessage(`Please Enter a Number Between ${min} and ${max}`,'red')
			return false;
		}

		if (guess === winningNum) {
			gameOver(true,`The Winning number is : ${winningNum} YOU WIN!`);
		}else{
			// wrong answer
			// guessLeft = guessLeft -1;
			// short hand 
			   guessLeft -=1;
			   if (guessLeft === 0) {
			   		gameOver(false,`Game Over!, You Lost The winning number was ${winningNum}`);
			   }else{
					guessInput.style.borderColor = 'red';
					guessInput.value = '';
					setMessage(`${guess} is not Correct, ${guessLeft} guess left`,'red');
			   }
		}
	})
	function getRandom(min,max){
		return Math.floor(Math.random(min,max)*(max-min+1)+min);

	}
	function gameOver(won,msg){
		let color;
		won === true ? color = 'green' : color = 'red';
		// game over lost
		guessInput.disabled = true;
		// bordercolor if win
		guessInput.style.borderColor = color;

		message.style.color = color;
		// message
		setMessage(msg);

		// play again?
		guessBtn.value ='Play Again?';
		// append class since already have a class
		guessBtn.className +=' play-again';
	}

	function setMessage(msg,color){
		message.textContent = msg;
		message.style.color= color;
	}


 /* ------------------------     END GUESS NUMBER SCRIPT     -----------------------------   */




