class Book{

	constructor(title,author,isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}

}

class UI{

	addBookToList(book){
		const list = document.getElementById('book-list');
		// create element
		const row = document.createElement('tr');
		// insert columns
		row.innerHTML = `
		<td class='text-center'>${book.title}</td>
		<td class='text-center'>${book.author}</td>
		<td class='text-center'>${book.isbn}</td>
		<td class='text-center'><a href= "#" class="delete"> X </a></td>`
		;
		list.appendChild(row);
	}

	deleteBook(target){
		if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
		}
	}

	clearFields(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}

	showAlert(msg, className){

		// <div class="alert alert-danger">error	</div>

		let t= '';
		if (className == 'error') {
			t += 'alert-danger';
		}
		if (className == 'success') {
			t += 'alert-success';
		}


		// create element
		const div = document.createElement('div');
		div.className = `alert ${t}`;
		div.appendChild(document.createTextNode(msg));

		// get parent
		const container = document.querySelector('#parent_show_message');
		// get form
		const form = document.querySelector('#book-form');
		container.insertBefore(div,form);


		// remove after 3  sec
		setTimeout(function(){
			document.querySelector('.alert').remove();
		},2000)
	}
}

class Store{

	static getBooks(){
		let books

		if (localStorage.getItem('books') === null) {
			books = [];
		}else{
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static addBook(books){
		const getBooks = Store.getBooks();
		getBooks.push(books);
		localStorage.setItem('books', JSON.stringify(getBooks));
	}


	static displayBooks(){
		const getBooks = Store.getBooks();

		getBooks.forEach(function(book){
			const ui = new UI();
			ui.addBookToList(book);
		})

	}

	static removeBook(target){
		const getBooks = Store.getBooks();
		const Deletetarget = target.parentElement.previousElementSibling.textContent;

		if ( target.className === 'delete') {
			getBooks.forEach(function(book,index){
				if (book.isbn ===  Deletetarget) {
					getBooks.splice(index , 1 );
				}
			})
			localStorage.setItem('books', JSON.stringify(getBooks));
		}
	}

}

// load dom content


document.addEventListener('DOMContentLoaded'  , Store.displayBooks());


// add book Event Listener
document.getElementById('book-form').addEventListener('submit' , function(e){
	// get form values
	e.preventDefault();

	const title = document.getElementById('title').value,
	      author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;
	// instantiate book
	const book = new Book(title,author,isbn);
	// instantiate UI
	const ui = new UI();

	// form validate
	if (title === '' || author === '' || isbn === '') {
		// show alert
		ui.showAlert('Please  Fill in all fields' , 'error');
	}else{
		// add book to list
		ui.addBookToList(book);
		// add to localstorage
		Store.addBook(book)
		// show alert
		ui.showAlert('Success Add Book' , 'success');
		// clear fields
		ui.clearFields();		
	}
})

// delete form listener
document.getElementById('book-list').addEventListener('click', function(e){
	e.preventDefault();
	const ui = new UI();
	ui.deleteBook(e.target);

	Store.removeBook(e.target);
	// Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	ui.showAlert('Remove Success' , 'success');
})