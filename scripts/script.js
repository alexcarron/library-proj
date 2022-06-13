let myLibrary = [];

// ! Book Constructor
class Book {
	constructor(title, author, total_pages, hasBeenRead) {
		this.title = title
		this.author = author
		this.total_pages = total_pages
		this.hasBeenRead = hasBeenRead
	}
	getBookInfo() {
		return `The ${this.title} by ${this.author} is ${this.total_pages} pages and has ${this.hasBeenRead ? `been read` : `not been read yet`}.`
	}
	toggleReadStatus() {
		this.hasBeenRead = !this.hasBeenRead
	}
	
}

// ! FUNCTION: Add book to library
function addBookToLibrary() {
	const add_book_inputs = document.querySelectorAll("section#add_book_section form input");
	
	let input_values = {},
		areInputsFilled = true;
	
	for (input of add_book_inputs) {
		if (input.type != "checkbox") {
			
			if (input.value === "") {
				areInputsFilled = false;
				break;
			} 
			else {
				input_values[input.getAttribute("name")] = input.value;
			}
			
		} else {
			input_values[input.getAttribute("name")] = input.checked;
		}
	}
	
	if (!areInputsFilled) {
		return alert("Please fill out all fields")
	}
	
	const book = new Book(
		input_values.book_title, 
		input_values.book_author, 
		input_values.book_total_pages, 
		input_values.book_hasBeenRead
	)

	myLibrary.push(book);
	
	displayBooksInLibrary(myLibrary);
}


// ! FUNCTION: Show all books on webpage
function displayBooksInLibrary(library) {
	let book_container = document.querySelector("div#book_container")
	
	book_container.innerHTML = ''
	
	for (book_index in library) {
		let book = library[book_index];
		
		book_container.innerHTML += `
			<div class="book" data-book-index="${book_index}">
				<div class="top_of_book_container">
					<h3 class="book_title"> ${book.title} </h3>
					<button class="remove_book_button" onclick="removeBook(this)">X</button>
				</div>
				<p class="book_author"> by ${book.author} </p>
				<div class="bottom_of_book_container">
					<p class="book_total_pages"> ${book.total_pages} pages </p>
					<p class="book_read_status ${book.hasBeenRead ? `read` : `not_read`}" onclick="toggle_read_status(this)"> ${book.hasBeenRead ? `Read` : `Not Read`} </p>
				</div>
			</div>
		`
	}
}



function removeBook(button_element) {
	let book_container = button_element.parentElement.parentElement;
	let book_index = book_container.getAttribute("data-book-index");
	
	book_container.remove()
	delete myLibrary[book_index];
	
	console.log(myLibrary);
}



function toggle_read_status(read_status_element) {
	let book_container = read_status_element.parentElement.parentElement;
	let book_index = book_container.getAttribute("data-book-index");
	let book = myLibrary[book_index];
	
	read_status_element.classList.remove(
		`${book.hasBeenRead ? `read` : `not_read`}`
	)
	
	myLibrary[book_index].toggleReadStatus();
	
	read_status_element.classList.add(
		`${book.hasBeenRead ? `read` : `not_read`}`
	)
	read_status_element.textContent = `
		${book.hasBeenRead ? `Read` : `Not Read`}
	`
	
	console.log(myLibrary)
}