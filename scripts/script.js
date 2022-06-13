let myLibrary = {};


// ! Book Constructor
function Book(title, author, total_pages, hasBeenRead) {
	this.title = title
	this.author = author
	this.total_pages = total_pages
	this.hasBeenRead = hasBeenRead
}

Book.prototype.getBookInfo = function() {
	return `The ${this.title} by ${this.author} is ${this.total_pages} pages and has ${this.hasBeenRead ? `been read` : `not been read yet`}.`
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

	myLibrary[book.title] = book;
	
	displayBooksInLibrary(myLibrary);
}


// ! FUNCTION: Show all books on webpage
function displayBooksInLibrary(library) {
	let book_container = document.querySelector("div#book_container")
	
	book_container.innerHTML = ''
	
	for (book_property in library) {
		let book = library[book_property];
		
		console.log( {library, book_property, book})
		
		book_container.innerHTML += `
			<div class="book">
				<div class="top_oc_book_container">
					<h3 class="book_title"> ${book.title} </h3>
					<button onclick="removeBook()">
				</div>
				<p class="book_author"> by ${book.author} </p>
				<div class="bottom_of_book_container">
					<p class="book_total_pages"> ${book.total_pages} pages </p>
					<p class="book_read_status ${book.hasBeenRead ? `read` : `not_read`}"> ${book.hasBeenRead ? `Read` : `Not Read`} </p>
				</div>
			</div>
		`
	}
}