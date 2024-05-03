const addBookButton = document.querySelector('.newBook');

const mainContainer = document.querySelector('.main-container');

const myLibrary = [];
addBookButton.addEventListener('click',()=>{
    addBookToLibrary();
    console.log("Book successfully added to array");

});
//constructor
function Book(title,author,pages,read=false){
    this.title = title;
    this.author = author ;
    this.pages = pages;
    this.read = true;
    this.info = function(){
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${(read == false) ? 'Not read yet' : 'read'}`;
    }
}
function addBookToLibrary(){
    //add book to library get data from form
    title='Ego is the enemy';
    author='Ryan Holiday';
    pages='215';
    read=false;
    const book = new Book(title,author,pages,read);
    myLibrary.push(book)
    createBookCard(book)
}
//create book card 
function createBookCard(book) {

    // Create the main book card div
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
     
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
    sliderInput.value = "0";
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
        "fa-solid fa-check-double",
        "fa-solid fa-book",
        "fa-solid fa-share-nodes",
        "fas fa-trash",
        "fas fa-pen",
    ];

    icons.forEach((iconClass) => {
        const iconElement = document.createElement("i");
        iconElement.className = iconClass;
        functionalityIconsDiv.appendChild(iconElement);
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
function removeBook(){
    //remove book from library  
    myLibrary.pop();  
}
function displayBooks(){
    //loop through the array and display each book
    console.log('Here are all books')
    myLibrary.forEach((book)=>createBookCard(book));

}

