document.getElementById('get').addEventListener('click', function(){
	document.querySelector('#loader').style.display='block';
	setTimeout(jokes,2000)

});
document.getElementById('remove').addEventListener('click',remove)

	function jokes(){
		let jokenum = document.querySelector('input[type="number"]').value;
		if (jokenum !=''){
			const xhr = new XMLHttpRequest();
			xhr.open('GET',`https://api.icndb.com/jokes/random/${jokenum}`,true);
			xhr.onload = function(){
				if (this.status ===200 ){
					document.querySelector('#resultjokes').style.display='block';
					document.querySelector('#loader').style.display='none';

					const result = JSON.parse(this.responseText)
					let output = '';
					if (result.type==='success') {
						// get joke with property of value
						result.value.forEach(function(resjoke){
							output +=`<div> ${resjoke.joke}</div><br><hr>`;
						})
					}else{
						output +=`
						<div> Something went Wrong</div><br>`;
					}
					document.querySelector('.alert').innerHTML =output
				}
			}
			xhr.send();
			document.querySelector('input[type="number"]').value ='';
		}else{
			document.querySelector('#loader').style.display='none';
			alert('Please! Required Fields');
		}	
	}

	function remove(){
		document.querySelector('#resultjokes').innerHTML ='';
		document.querySelector('#resultjokes').style.display ='none';

	}