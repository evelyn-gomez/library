//Container classes
// let addBookBtn = document.querySelector('#add-btn');
let bookFormContainer = document.querySelector('.div-book-form');
let overlayContainer = document.querySelector('.overlay-container');

function formDisplay(){
  //onClick for addBookBtn, SHOW display form 
  overlayContainer.classList.add('fadeIn');
  bookFormContainer.classList.add('fadeIn');
} 

function removeFormDisplay(){
    overlayContainer.classList.remove('fadeIn');
    bookFormContainer.classList.remove('fadeIn'); 
}

class Book {
  constructor(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read;
  }
}

let cleanCode = new Book('Clean code', 'Robert C. Martin', 413, 
false);
let JavascriptAndJQuery = new Book("Javascript & Jquery", 'Jon Duckett', 622, false);

let testUserLibrary =[cleanCode, JavascriptAndJQuery];
let userLibrary = [cleanCode];
let bookShelf = document.querySelector('.book-shelf'); 

//create div/card for each book and attach to bookshelf
function renderBooksInLibrary(){
  for(let book of userLibrary){
    let card = document.createElement('div');
    card.classList.add('card'); 
    bookShelf.appendChild(card); 
    for(let property in book){
      console.log(property);
      //need to add if case when property is read/ bc what to return a button not p tag
      let cardPara = document.createElement('p');
      card.appendChild(cardPara);  
      cardPara.textContent = `${book[property]} -check`;
    }
  }
}

function isBookInLibrary(bookTitle){
  if(userLibrary.find(book => book.name === bookTitle)){ 
    let bookPropertyName = userLibrary.find(book => book.name === bookTitle);
    console.log(bookPropertyName);
    return true
  }else{
    console.log('book does not exist');
    return false; 
  }
}; 
isBookInLibrary('Clean code');

/**
 * 
 * @param  {{name},{author}} book
 */
function addBookToLibrary(book){
  let card = document.createElement('div');
  card.classList.add('card'); 
  bookShelf.appendChild(card); 
  for(let property in book){
    console.log(property);
    //need to add if case when property is read/ bc what to return a button not p tag
    let cardPara = document.createElement('p');
    card.appendChild(cardPara);  
    cardPara.textContent = `${book[property]}`;
  }
};

//Form input tags
let form = document.querySelector('form');
// need to add read/NotRead input tag 

form.addEventListener('submit',function(event){
  let nameInput = document.querySelector('#book-name').value; 
  let authorInput = document.querySelector('#book-author').value;
  let pagesInput = document.querySelector('#book-pages').value;
  let isInLibrary = isBookInLibrary(nameInput);
  if(isInLibrary){
    alert('this book is already in the library');
  }else{
    let newBook = new Book(nameInput, authorInput, pagesInput);
    userLibrary.push(newBook); 
    console.log(newBook);
    addBookToLibrary(newBook);   
  }
  //prevent form submitting to back end?/since no backend
  event.preventDefault();
  //removes FORM 
  removeFormDisplay();
  //reset default input values; 
  form.reset();
});  
renderBooksInLibrary();


  