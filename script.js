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

class Book {
  constructor(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read;
  };
};

let userLibrary = [];
let bookShelf = document.querySelector('.book-shelf'); 

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
 * @param  {{name:String, author:String, pages:Number, read:Boolean}} book 
 * Create's a book and add's to Bookshelf --- need to enable toggleing read/notREAD ; 
 */
function addBookToBookShelf(book){
  let card = document.createElement('div');
  card.classList.add('card'); 
  bookShelf.appendChild(card); 
  for(let property in book){
    let div = document.createElement('div');
    div.classList.add('card-div')
    if(property == 'read'){
      // create button for book.read property -- to be able to toggle later?  
      let btn = document.createElement('button');
      card.appendChild(div);
      div.appendChild(btn); 
      // change read to read/not read
      if(book[property] == false){
        return btn.textContent = `NOT READ`;
      }else{
        return btn.textContent = 'READ';
      }
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
  //remove form validation error class
  for(let input of inputs){
    let inputparent = input.parentElement;
    let errorDiv = inputparent.querySelector('div.error-remove');
    // errorDiv.classList.remove('error-remove'); 
    // errorDiv.classList.add('error');
    return errorDiv.textContent = ''; 
  }
  //prevent form submitting to back end?/since no backend
  event.preventDefault();
  //removes FORM 
  hideForm();
  //reset default input values; 
  form.reset();
});;  

function getError(input){
  // let inputID = input.firstElementChild.attributes[1];
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
    errorDiv.classList.remove('error');
    errorDiv.classList.add('error-remove'); 
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
}
/**
 * render exisiting books in userLibrary -- when page first loads. 
 */
// renderExisitingBooksInLibrary(); 




  