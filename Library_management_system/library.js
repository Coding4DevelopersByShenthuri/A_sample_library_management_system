// Define classes

// Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isIssued = false; // Initially, book is not issued
    }
}

// Member class
class Member {
    constructor(name, memberId) {
        this.name = name;
        this.memberId = memberId;
        this.issuedBooks = []; // Array to store books issued to the member
    }
}

// Library class
class Library {
    constructor() {
        this.books = [];    // Array to store all books in the library
        this.members = [];  // Array to store all members of the library
    }

    addBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if (title && author && isbn) {
            const book = new Book(title, author, isbn);
            this.books.push(book);
            console.log(`Book '${title}' by ${author} with ISBN ${isbn} added to the library.`);
            this.displayAvailableBooks();
            this.updateBookDropdown();
            this.clearAddBookForm();
        } else {
            console.log('Please fill in all fields.');
        }
    }

    issueBook() {
        const memberId = parseInt(document.getElementById('memberId').value);
        const bookIndex = parseInt(document.getElementById('bookIndex').value);

        if (!isNaN(memberId) && !isNaN(bookIndex)) {
            const member = this.members.find(m => m.memberId === memberId);
            if (!member) {
                console.log(`Member with ID ${memberId} not found.`);
                return;
            }

            const book = this.books[bookIndex];
            if (!book) {
                console.log(`Book not found.`);
                return;
            }

            if (book.isIssued) {
                console.log(`Book '${book.title}' is already issued.`);
            } else {
                book.isIssued = true;
                member.issuedBooks.push(book);
                console.log(`Book '${book.title}' issued to ${member.name}.`);
                this.displayAvailableBooks();
            }
        } else {
            console.log('Please select a member and a book.');
        }
    }

    returnBook() {
        const memberId = parseInt(document.getElementById('memberId').value);
        const bookIndex = parseInt(document.getElementById('bookIndex').value);

        if (!isNaN(memberId) && !isNaN(bookIndex)) {
            const member = this.members.find(m => m.memberId === memberId);
            if (!member) {
                console.log(`Member with ID ${memberId} not found.`);
                return;
            }

            const book = member.issuedBooks[bookIndex];
            if (!book) {
                console.log(`Book not found in issued books of ${member.name}.`);
                return;
            }

            book.isIssued = false;
            member.issuedBooks.splice(bookIndex, 1);
            console.log(`Book '${book.title}' returned by ${member.name}.`);
            this.displayAvailableBooks();
        } else {
            console.log('Please select a member and a book.');
        }
    }

    displayAvailableBooks() {
        const availableBooksList = document.getElementById('availableBooks');
        availableBooksList.innerHTML = ''; // Clear previous list

        const availableBooks = this.books.filter(book => !book.isIssued);
        if (availableBooks.length > 0) {
            availableBooks.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;
                availableBooksList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No books available.';
            availableBooksList.appendChild(li);
        }
    }

    updateBookDropdown() {
        const bookDropdown = document.getElementById('bookIndex');
        bookDropdown.innerHTML = ''; // Clear previous options

        this.books.forEach((book, index) => {
            if (!book.isIssued) {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${book.title} by ${book.author}`;
                bookDropdown.appendChild(option);
            }
        });
    }

    clearAddBookForm() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Initialize library and handle UI interactions

const library = new Library();

// Example usage:

// Add initial books
library.books.push(new Book("Python Programming", "John Smith", "978-0134853988"));
library.books.push(new Book("Data Structures and Algorithms", "Jane Doe", "978-0262032933"));
library.books.push(new Book("Database Management Systems", "Alan Johnson", "978-0073523323"));

// Add initial members
library.members.push(new Member("Alice Brown", 1));
library.members.push(new Member("Bob Green", 2));

// Functions to interact with UI

function addBook() {
    library.addBook();
}

function issueBook() {
    library.issueBook();
}

function returnBook() {
    library.returnBook();
}

// Initialize available books list
library.displayAvailableBooks();
