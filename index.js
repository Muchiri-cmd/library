//Constants || Variable
const addBookButton = document.querySelector('.newBook');
const dialog = document.getElementById("dialog")
const mainContainer = document.querySelector('.main-container');
const closeBtn = document.querySelector(".close");
const submitBtn = document.getElementById('Submit');
const form = document.querySelector('form')
let myLibrary = [];

// Event Listeners
addBookButton.addEventListener('click',()=>{
    dialog.showModal();
});
closeBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    dialog.close()
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    //create form data object from form
    const formData = new FormData(form);
    //access field values by field name
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');
    //add book to library
    addBookToLibrary(title,author,pages,read);
    form.reset();
    dialog.close();

});

let bookIdCounter = 1;//keep track of book by unique incremental ID
//Book constructor func
function Book(title,author,pages,read){
    this.id = bookIdCounter ++;
    this.title = title;
    this.author = author ;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${(read == false) ? 'Not read yet' : 'read'}`;
    }
}
function addBookToLibrary(title,author,pages,read){
    //with data from form,add book to library 
    title=title
    author=author
    pages=pages
    read=read
    const book = new Book(title,author,pages,read);
    //add book to books array
    myLibrary.push(book)
    //create DOM element for book
    createBookCard(book)
}
//create book card 
function createBookCard(book) {
    console.log(book.read);
    // Create the main book card div
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.dataset.id = book.id //Store the unique ID as a dataset attribute
     
    // Create the left section
    const leftDiv = document.createElement("div");
    leftDiv.className = "left";
    const coverImgDiv = document.createElement("div");
    coverImgDiv.className = "cover-img";
    const coverImg = document.createElement("img");
    coverImg.src = "pngtree-creative-and-realistic-book-dummy-image_633548.jpg"; // Image source
    coverImgDiv.appendChild(coverImg);
    leftDiv.appendChild(coverImgDiv);
    
    // Create the right section
    const rightDiv = document.createElement("div");
    rightDiv.className = "right";
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.className = "bookinfo";
    const titleDiv = document.createElement("div");
    titleDiv.className = "title";
    titleDiv.textContent = `${book.title}`
    const authorSpan = document.createElement("span");
    authorSpan.className = "author";
    authorSpan.textContent = `${book.author}`
    const pagesSpan = document.createElement("span");
    pagesSpan.className = "pages";
    pagesSpan.textContent = `${book.pages} pages`
    bookInfoDiv.appendChild(titleDiv);
    bookInfoDiv.appendChild(authorSpan);
    bookInfoDiv.appendChild(pagesSpan);
    rightDiv.appendChild(bookInfoDiv);
    const functionalityDiv = document.createElement("div");
    functionalityDiv.className = "functionality";
    const sliderDiv = document.createElement("div");
    sliderDiv.className = "slider";
    const sliderInput = document.createElement("input");
    sliderInput.type = "range";
    sliderInput.value = (book.read == true) ? "100" : "0"; // modify value of slider to show read status
    sliderInput.min = "0";
    sliderInput.max = "100";
    sliderDiv.appendChild(sliderInput);
    functionalityDiv.appendChild(sliderDiv);
    // Create the functionality icons section
    const functionalityIconsDiv = document.createElement("div");
    functionalityIconsDiv.className = "functionality-icons";
    const icons = [
        "fas fa-star",
        "fas fa-clock",
        "fa-solid fa-book",
        "fa-solid fa-share-nodes",
        "fas fa-pen",
    ];
    icons.forEach((iconClass) => {
        const iconElement = document.createElement("i");
        iconElement.className = iconClass;
        functionalityIconsDiv.appendChild(iconElement);
    });

    //mark blue if user has read
    const readIcon = document.createElement('i');
    readIcon.className = 'fas fa-check-double';
    functionalityIconsDiv.appendChild(readIcon)
    readIcon.style.color = (book.read == true) ? "blue" : "grey";

    //add event listener to each trash icon button for each book
    const trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash';
    functionalityIconsDiv.appendChild(trashIcon)
    trashIcon.addEventListener('click', () => {
        removeBook(book.id);
    });

    functionalityDiv.appendChild(functionalityIconsDiv);
    rightDiv.appendChild(functionalityDiv);

    bookDiv.appendChild(leftDiv);
    bookDiv.appendChild(rightDiv);
    // Append the book card to the container
    mainContainer.appendChild(bookDiv);
}
const removeBookBtn = document.querySelectorAll('.fa-trash');
const readIcons = document.querySelectorAll('fa-check-double')
function removeBook(bookId){
    //remove book from library  
    // Find and remove from the array
    myLibrary = myLibrary.filter(book => book.id !== bookId);

    // Remove corresponding book card from the DOM
    const bookElement = mainContainer.querySelector(`.book[data-id='${bookId}']`);
    if (bookElement) {
        bookElement.remove();
        console.log("Book succesfully removed")
    } 
}
function displayBooks(){
    //loop through the array and display each book
    myLibrary.forEach((book)=>createBookCard(book));
}

