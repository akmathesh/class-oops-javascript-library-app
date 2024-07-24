class Library {
  constructor() {
    this.books = [];
    this.loadFromLocalStorage();
  }

  addBook(book) {
    this.books.push(book);
    this.saveToLocalStorage();
  }

  getBooks() {
    return this.books;
  }

  bookCount() {
    return this.books.length;
  }

  removeBook(index) {
    if (index >= 0 && index < this.books.length) {
      this.books.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  loadFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      this.books = storedBooks.map((book) => new Book(book.title, book.author));
      this.books.forEach((book, index) => {
        if (storedBooks[index].read) {
          book.markAsRead();
        }
      });
    }
  }
}

