const formEl = document.forms["bookForm"];
const lib = new Library();

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById("bookTitle").value.trim();
  const bookAuthor = document.getElementById("bookAuthor").value.trim();

  if (!bookTitle && !bookAuthor) {
    alert("Please enter a book title and author information...");
    return;
  }

  // Book instantiate
  const addedBook = new Book(bookTitle, bookAuthor);
  lib.addBook(addedBook);

  // remove entered info in input
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";

  renderedLibrary();
});

function markAsRead(index) {
  lib.getBooks()[index].markAsRead();
  lib.saveToLocalStorage();
  renderedLibrary();
}

function removeBook(index) {
  lib.removeBook(index);
  renderedLibrary();
}

function renderedLibrary() {
  const renderLibEl = document.querySelector("#renderedLibrary");
  const bookCountEl = document.querySelector("#bookCount");

  bookCountEl.textContent = `Total books: ${lib.bookCount()}`;

  // resetting values in book lists...
  renderLibEl.innerHTML = "";

  const totalBookArray = lib.getBooks();
  console.log(totalBookArray);

  totalBookArray.forEach((book, index) => {
    renderLibEl.innerHTML += `
          <li class="bg-orange-200 p-3 rounded flex justify-between items-center">
            <div class="font-semibold w-1/2 p-2 ${
              book.read ? "line-through" : ""
            }">
              ${book.getTitle()} by ${book.getAuthor()}
            </div>
            <div class="w-1/2 flex flex-end">
              <button class="flex-1 bg-green-600 text-white px-1 py-2 text-sm font-semibold rounded mx-2" onclick="markAsRead(${index})">
                Mark as Read
              </button>
              <button class="flex-1 bg-red-600 text-white px-1 py-2 text-sm font-semibold rounded" onclick="removeBook(${index})">
                Remove
              </button>
            </div>
          </li>`;
  });
}
