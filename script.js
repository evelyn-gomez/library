let addBookBtn = document.querySelector('#add-btn');
let bookFormContainer = document.querySelector('.div-book-form');
let overlayContainer = document.querySelector('.overlay-container');

let userLibrary =[
  {title, author,pages,read}, {}
]

function addBookToUserLibrary (){
  //add's books to userLibrary Array
};

function formDisplay(){
  //onClick for addBookBtn, SHOW display form 
  overlayContainer.classList.add('fadeIn');
  bookFormContainer.classList.add('fadeIn');
} 

function removeFormDisplay(){
    //on form submit revert back to hiding form
    //
}

let bookName = document.querySelector('input #bookName'); 
let author = document.querySelector('input #author');
let pages = document.querySelector('input #pages'); 

function addBookToLib(){
  let bookToLib = new Book()
}


function Book (title, author, pages, read){
  this.title = title, 
  this.author = author,
  this.pages = pages, 
  this.read = read
}

let cleanCode = new Book('Clean code', 'Robert C. Martin', '413', 
true); 
console.table(cleanCode); 





