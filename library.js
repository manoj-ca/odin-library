
const defLib = [];

const addDialog = document.querySelector(".add");
const addButton = document.querySelector(".side button");
const addCloseButton = document.querySelector(".add > button");
const fullDialog = document.querySelector(".full");
const fullCloseButton = document.querySelector(".full > button");
const library = document.querySelector(".library");
const form = document.querySelector("form");

function getColor() {
  const max = 238; // #ee
  const min = 17; // #11
  const colorR = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
  const colorG = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
  const colorB = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
  const color = colorR + colorG + colorB;
  return `#${color}`;
}

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  const angle = []
  angle.push('0deg', '45deg', '90deg', '135deg');
  const idx = Math.floor(Math.random() * 3.99);
  const color1 = getColor();
  const color2 = getColor();
  this.bgImg = `linear-gradient(${angle[idx]}, ${color1}, ${color2})`;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.readIcon = document.createElement("div");
  this.readBtn = document.createElement("button");
  this.removeIcon = document.createElement("div");
  this.removeBtn = document.createElement("button");

  this.readBtn.addEventListener("click", () => {
    this.read = !this.read;
    const old = this.readIcon.firstChild;
    const image = document.createElement("img");
    if (this.read) {
      image.classList.add("yes");
      image.src = "./images/check-bold.svg";
    } else {
      image.classList.add("no");
      image.src = "./images/close-thick.svg";
    }
    image.width = 24;
    this.readIcon.replaceChild(image, old);
  });

  this.removeBtn.addEventListener("click", () => {
    const book = document.querySelector("#" + CSS.escape(this.id));
    library.removeChild(book);
    const index = curLib.findIndex(obj => obj.id === this.id);
    if (index !== -1) {
      curLib.splice(index, 1);
    }
  });
}

defLib.push(new Book('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 759, true));
defLib.push(new Book('The Nightingale', 'Kristin Hannah', 440, true));
defLib.push(new Book('A Court of Mist and Fury', 'Sarah J. Maas', 626, false));
defLib.push(new Book('Words of Radiance', 'Brandon Sanderson', 1088, true));
defLib.push(new Book('Just Mercy', 'Bryan Stevenson', 336, false));

const curLib = Array.from(defLib);

function addReadButtton(obj) {
  obj.readBtn.classList.add("black");
  obj.readIcon.classList.add("icon");
  const image = document.createElement("img");
  if (obj.read) {
    image.classList.add("yes");
    image.src = "./images/check-bold.svg";
  } else {
    image.classList.add("no");
    image.src = "./images/close-thick.svg";
  }
  image.width = 24;
  obj.readIcon.appendChild(image);
  const read = document.createElement("div");
  read.textContent = "Read";
  obj.readIcon.appendChild(read);
  obj.readBtn.appendChild(obj.readIcon);
  return obj.readBtn;
}

function addRemoveButtton(obj) {
  obj.removeBtn.classList.add("black");
  obj.removeIcon.classList.add("icon");
  const image = document.createElement("img");
  image.classList.add("no");
  image.src = "./images/close-thick.svg";
  image.width = 24;
  obj.removeIcon.appendChild(image);
  const read = document.createElement("div");
  read.textContent = "Remove";
  obj.removeIcon.appendChild(read);
  obj.removeBtn.appendChild(obj.removeIcon);
  return obj.removeBtn;
}

function addBook(bookObj) {
  const book = document.createElement("div");
  book.classList.add("book");
  book.id = bookObj.id;
  library.appendChild(book);
  book.style.backgroundImage = bookObj.bgImg;
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = bookObj.title;
  book.appendChild(title);
  const author = document.createElement("div");
  author.textContent = bookObj.author;
  book.appendChild(author);
  book.appendChild(addReadButtton(bookObj));
  const pages = document.createElement("div");
  pages.textContent = bookObj.pages + " pages";
  book.appendChild(pages);
  book.appendChild(addRemoveButtton(bookObj));
}

function addBooks() {
  for (const bookObj of curLib) {
    addBook(bookObj);
  }
}

const books = addBooks();

addButton.addEventListener("click", () => {
  addDialog.showModal();
});

addCloseButton.addEventListener("click", () => {
  form.reset();
  addDialog.close();
});

fullCloseButton.addEventListener("click", () => {
  fullDialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (curLib.length >= 9) {
    form.reset();
    addDialog.close();
    fullDialog.showModal();
    return;
  }
  const formData = new FormData(event.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const check = formData.get('read');
  const read = check ? true : false;
  const book = new Book(title, author, pages, read);
  curLib.push(book);
  addBook(book);
  form.reset();
  addDialog.close();
});
