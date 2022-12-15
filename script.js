//Book and Library Container
let bookFormContainer = document.querySelector('.div-book-form');
let overlayContainer = document.querySelector('.overlay-container');
let bookShelf = document.querySelector('.book-shelf'); 

let formViews =  {
  showForm(){
    overlayContainer.classList.add('fadeIn');
    bookFormContainer.classList.add('fadeIn');
    return;
  },
  hideForm(){
    overlayContainer.classList.remove('fadeIn');
    bookFormContainer.classList.remove('fadeIn'); 
  },
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
  };
};

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook);
    this._addBookToBookShelf(newBook); 
  }

  removeBook(bookTitle) {
    this.books = this.books.filter(book => book.title !== bookTitle)
  }

  isBookInLibrary(newBook){
    if(this.books.find(book => book.title == newBook.title)){ 
      return true; 
    }else{
      console.log('book does not exist');
      return false; 
    }
  }; 

  _addBookToBookShelf(newBook){
    let card = document.createElement('div');
    card.classList.add('card'); 
    bookShelf.appendChild(card); 
    for(let property in newBook ){
      let div = document.createElement('div');
      div.classList.add('card-div')
      if(property == 'read'){
        div.classList.add('btns-div');
        // create button for book.read property -- to be able to toggle later?  
        let btn = document.createElement('button');
        btn.classList.add('read-btn');
        card.appendChild(div);
        div.appendChild(btn); 
        isBookRead(newBook[property], btn);
        createDeleteBtn(div, newBook);
        return;
      }
      let para = document.createElement('p'); 
      para.classList.add('card-div-p');
      card.appendChild(div);  
      div.appendChild(para); 
      para.textContent = `${newBook[property]}`;
    }
  }
}

const library = new Library();

/**
 * 
 * @param {Element} div 
 * @returns 
 */
function createDeleteBtn(div, book){
  // create Delete Button 
  let btnDelete = document.createElement('button');
  btnDelete.classList.add('delete-btn');
  div.appendChild(btnDelete);
  btnDelete.textContent = 'DELETE';
// add delete eventListener 
  btnDelete.addEventListener('click', function(event){
    let deleteparentdiv = event.target.parentNode; 
    let mainCardParent = deleteparentdiv.parentNode;
    let bookShelfParent = mainCardParent.parentNode; 

    bookShelfParent.removeChild(mainCardParent); 
    library.removeBook(book.title)
  });
};


/**
 * 
 * @param {Object.property} readProperty 
 * @param {Element} btn 
 * @returns 
 */
function isBookRead(readProperty, btn){
  btn.addEventListener('click', ()=>{
    if(btn.innerHTML == 'READ'){
      btn.classList.remove('card-read-yes');
      btn.classList.add('card-read-no');
      return btn.innerHTML = "NOT READ";
    }else if(btn.innerHTML == 'NOT READ'){
      btn.classList.remove('card-read-no');
      btn.classList.add('card-read-yes');
      return btn.innerHTML = "READ";
    }
  })
    // change read to read/not read
    if(readProperty == false){
      btn.classList.add('card-read-no');
      return btn.textContent = `NOT READ`;
   }else{
      btn.classList.add('card-read-yes');
      return btn.textContent = 'READ';
   }
};

/**
 * 
 * @returns removes class ".error" from errodDiv's of each Input
 */
 function removeError(){
  let errorDiv = document.querySelectorAll('.error');
  for (let error of errorDiv){  
    if(error.textContent !== ''){
      error.style.color = 'red'; 
      error.textContent = ''; 
    }  
  }
  return;
  //do nothing 
};




//Form input tags
let form = document.querySelector('form');

form.addEventListener('submit',function(event){
  let titleInput = document.querySelector('#book-name').value; 
  let authorInput = document.querySelector('#book-author').value;
  let pagesInput = document.querySelector('#book-pages').value;
  let readInput = document.querySelector('#readCheckBox'); 
  let book_template; 

  if(library.isBookInLibrary(titleInput)){
    alert('this book is already in the library');
  }else{
    //create Book 
    book_template = new Book(titleInput, authorInput, pagesInput,readInput)
    //add to library 
    library.addBook(book_template); 
  };
  //prevent form submitting to back end?/since no backend
  event.preventDefault();
  formViews.hideForm();
  form.reset();
  removeError(); 
});;  

/**
 * 
 * @param {element} input 
 * @returns type of error to errorDiv for Input
 */
function getError(input){
  let inputparent = input.parentElement;
  let errorDiv = inputparent.querySelector('.error');
  let inputName = input.placeholder; 
   
  if(input.validity.tooShort || input.validity.rangeUnderflow){
    if(input.validity.rangeUnderflow){
      return errorDiv.textContent = `${inputName} is too short`
    }
    return errorDiv.textContent = ` ${inputName} name needs at least 3 characters`;  
  }
  if(input.validity.valueMissing){
    return  errorDiv.textContent = `Please enter ${inputName} `;
  } else{
    errorDiv.style.color = 'green'; 
    return errorDiv.textContent = '✓';
  }
  
};

// Form input eventListeners
let inputs = document.querySelectorAll('.inputType');
for(let input of inputs){
  input.addEventListener('input', function(event){
    console.log(event.target);
    getError(event.target);
  })
};


window.onclick= function(event) {
  if (event.target == overlayContainer) {
    formViews.hideForm();
    form.reset();
    removeError(); 
  }
}; 
