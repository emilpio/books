const select = {
  containerOf: {
    booksList: '.books-list',
    image: '.book__image',
  },
  templatesOf: {
    booksTemplate: '#template-book',
  },
};

const templates = {
  bookTemplate: Handlebars.compile(
    document.querySelector(select.templatesOf.booksTemplate).innerHTML
  ),
};

function render() {
  for (let book of dataSource.books) {
    const generateHTML = templates.bookTemplate({
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
      details: book.details,
    });

    const createDom = utils.createDOMFromHTML(generateHTML);

    const bookContainer = document.querySelector(select.containerOf.booksList);
    bookContainer.appendChild(createDom);
  }
}

const favouriteBooks = [];
console.log(favouriteBooks);

function initAction() {
  const allImages = document.querySelectorAll(select.containerOf.image);

  for (let image of allImages) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();
      image.classList.add('favourite');

      const bookId = image.getAttribute('data-id');
      console.log('bookId', bookId);

      favouriteBooks.push(bookId);
      console.log('pushed', favouriteBooks);
    });
  }
}

render();
initAction();
