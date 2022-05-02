//Container classes
// let addBookBtn = document.querySelector('#add-btn');
let bookFormContainer = document.querySelector('.div-book-form');
let overlayContainer = document.querySelector('.overlay-container');

function showForm(){
  //onClick for addBookBtn, SHOW display form 
  overlayContainer.classList.add('fadeIn');
  bookFormContainer.classList.add('fadeIn');
}; 

function hideForm(){
    overlayContainer.classList.remove('fadeIn');
    bookFormContainer.classList.remove('fadeIn'); 
};

/**
 * 
 * @param {Array} userLibrary
 * Creates exisiting books in userLibrary and attaches to Bookshelf when first rendered. 
 */
      // function renderExistingBooksInLibrary(userLibrary){
      //   for(let book of userLibrary){
      //     let card = document.createElement('div');
      //     card.classList.add('card'); 
      //     bookShelf.appendChild(card); 
      //     for(let property in book){
      //       console.log(property);
      //       //need to add if case when property is read/ bc what to return a button not p tag
      //       let cardPara = document.createElement('p');
      //       card.appendChild(cardPara);  
      //       cardPara.textContent = `${book[property]}`;
      //     }
      //   }
      // }

/**
 * check if book is in Library -- if yes, do not add to library. 
 * @param {string} bookTitle 
 * @returns 
 */

let userLibrary = [];
let bookShelf = document.querySelector('.book-shelf'); 

class Book {
  constructor(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read;
  };
  
};


function isBookInLibrary(bookTitle){
  //find if book title in library -- change to Lowercase
  if(userLibrary.find(book => book.name.toLowerCase() == bookTitle.toLowerCase())){ 
    //if found - return true
    return true
  }else{
    console.log('book does not exist');
    return false; 
  }
}; 
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
    userLibrary.splice(userLibrary.find(index => index == book)); 

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

/**
 * 
 * @param  {{name:String, author:String, pages:Number, read:Boolean}} book 
 * Create's a book and add's to Bookshelf --- need to enable toggleing read/notREAD ; 
 */
function addBookToBookShelf(book){
  let card = document.createElement('div');
  card.classList.add('card'); 
  bookShelf.appendChild(card); 
  for(let property in book ){
    let div = document.createElement('div');
    div.classList.add('card-div')
    if(property == 'read'){
      div.classList.add('btns-div');
      // create button for book.read property -- to be able to toggle later?  
      let btn = document.createElement('button');
      btn.classList.add('read-btn');
      card.appendChild(div);
      div.appendChild(btn); 

      isBookRead(book[property], btn);
      createDeleteBtn(div, book);
      return;
    }
    let para = document.createElement('p'); 
    para.classList.add('card-div-p');
    card.appendChild(div);  
    div.appendChild(para); 
    para.textContent = `${book[property]}`;
  }
};

//Form input tags
let form = document.querySelector('form');

form.addEventListener('submit',function(event){
  let nameInput = document.querySelector('#book-name').value; 
  let authorInput = document.querySelector('#book-author').value;
  let pagesInput = document.querySelector('#book-pages').value;
  let readInput = document.querySelector('#readCheckBox'); 

  let isInLibrary = isBookInLibrary(nameInput);

  if(isInLibrary){
    alert('this book is already in the library');
  }else{
    let newBook = new Book(nameInput, authorInput, pagesInput, readInput.checked);
    //add book to library Array 
    userLibrary.push(newBook); 
    console.log(newBook);
    //add book to HTML bookShelf 
    addBookToBookShelf(newBook);   
  };
  //prevent form submitting to back end?/since no backend
  event.preventDefault();
  //removes FORM 
  hideForm();

  //reset default input values; 
  form.reset();
  //remove form validation error class
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




/**
 * removes overlayContainer, reset form and form error styling.  
 * @param {Element} event 
 * 
 */
window.onclick= function(event) {
  if (event.target == overlayContainer) {
    hideForm();
    form.reset();
    removeError(); 
  }
}
/**
 * render exisiting books in userLibrary -- when page first loads. 
 */
// renderExisitingBooksInLibrary(); 

// let TESTBOOK = new Book('test-title', 'test-author', 20, 'true');

// addBookToBookShelf(TESTBOOK);


  