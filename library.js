
class Book {

  library = document.querySelector(".library");

  constructor(title, author, pages, read) {
    const angle = []
    angle.push('0deg', '45deg', '90deg', '135deg');
    const idx = Math.floor(Math.random() * 3.99);
    const color1 = this.#getColor();
    const color2 = this.#getColor();
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
      this.library.removeChild(book);
      const index = Lib.curLib.findIndex(obj => obj.id === this.id);
      if (index !== -1) {
        Lib.curLib.splice(index, 1);
      }
    });
  }

  #getColor() {
    const max = 238; // #ee
    const min = 17; // #11
    const colorR = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
    const colorG = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
    const colorB = (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
    const color = colorR + colorG + colorB;
    return `#${color}`;
  }

  addReadButtton() {
    this.readBtn.classList.add("black");
    this.readIcon.classList.add("icon");
    const image = document.createElement("img");
    if (this.read) {
      image.classList.add("yes");
      image.src = "./images/check-bold.svg";
    } else {
      image.classList.add("no");
      image.src = "./images/close-thick.svg";
    }
    image.width = 24;
    this.readIcon.appendChild(image);
    const read = document.createElement("div");
    read.textContent = "Read";
    this.readIcon.appendChild(read);
    this.readBtn.appendChild(this.readIcon);
    return this.readBtn;
  }

  addRemoveButtton() {
    this.removeBtn.classList.add("black");
    this.removeIcon.classList.add("icon");
    const image = document.createElement("img");
    image.classList.add("no");
    image.src = "./images/close-thick.svg";
    image.width = 24;
    this.removeIcon.appendChild(image);
    const read = document.createElement("div");
    read.textContent = "Remove";
    this.removeIcon.appendChild(read);
    this.removeBtn.appendChild(this.removeIcon);
    return this.removeBtn;
  }

}

class Lib {

  static curLib = [];
  library = document.querySelector(".library");

  constructor() {

    const addDialog = document.querySelector(".add");
    const addButton = document.querySelector(".side button");
    const addCloseButton = document.querySelector(".add > button");
    const fullDialog = document.querySelector(".full");
    const fullCloseButton = document.querySelector(".full > button");
    const form = document.querySelector("form");

    const defLib = [];
    defLib.push(new Book('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 759, true));
    defLib.push(new Book('The Nightingale', 'Kristin Hannah', 440, true));
    defLib.push(new Book('A Court of Mist and Fury', 'Sarah J. Maas', 626, false));
    defLib.push(new Book('Words of Radiance', 'Brandon Sanderson', 1088, true));
    defLib.push(new Book('Just Mercy', 'Bryan Stevenson', 336, false));

    this.curLib = Array.from(defLib);

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
      if (this.curLib.length >= 9) {
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
      this.curLib.push(book);
      this.#addBook(book);
      form.reset();
      addDialog.close();
    });

  }

  #addBook(bookObj) {
    const book = document.createElement("div");
    book.classList.add("book");
    book.id = bookObj.id;
    this.library.appendChild(book);
    book.style.backgroundImage = bookObj.bgImg;
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = bookObj.title;
    book.appendChild(title);
    const author = document.createElement("div");
    author.textContent = bookObj.author;
    book.appendChild(author);
    book.appendChild(bookObj.addReadButtton());
    const pages = document.createElement("div");
    pages.textContent = bookObj.pages + " pages";
    book.appendChild(pages);
    book.appendChild(bookObj.addRemoveButtton());
  }

  addBooks() {
    for (const bookObj of this.curLib) {
      this.#addBook(bookObj);
    }
  }

}

const lib = new Lib();
lib.addBooks();
