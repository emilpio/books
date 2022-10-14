const select = {
  containerOf: {
    booksList: '.books-list',
    image: '.book__image',
    filters: '.filters',
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
render();
const favoriteBooks = [];
console.log(favoriteBooks);

function initAction() {
  const allImages = document.querySelectorAll(select.containerOf.image);

  for (let image of allImages) {
    image.addEventListener('dblclick', function (event) {
      event.preventDefault();

      if (image.classList.contains('favorite')) {
        image.classList.remove('favorite');
        const bookId = image.getAttribute('data-id');
        const indexOfBookId = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBookId, 1);
      } else {
        image.classList.add('favorite');
        const bookId = image.getAttribute('data-id');
        console.log('bookId', bookId);

        favoriteBooks.push(bookId);
        console.log('pushed', favoriteBooks);
      }
    });
  }

  const filter = document.querySelector(select.containerOf.filters);
  console.log(filter);
  filter.addEventListener('click', function (callback) {
    const clickedElement = callback.target;
    console.log(clickedElement.value);

    if (
      clickedElement.tagName == 'INPUT' &&
      clickedElement.type == 'checkbox' &&
      clickedElement.name == 'filter'
    ) {
      if (clickedElement.checked) filters.push(clickedElement.value);
    } else {
      const indexOfFilter = filters.indexOf(clickedElement.value);
      filters.splice(indexOfFilter, 1);
    }
  });
}

initAction();

function filterBooks() {
  for (let book of dataSource.books) {
    let shouldBeHidden = false;

    const filterOfHiddenBooks = document.querySelector(
      select.containerOf.image + '[data-id = "' + book.id + '"]'
    );

    for (const filter of filters) {
      if (!book.detail[filter]) {
        shouldBeHidden = true;
        break;
      }
      if (shouldBeHidden == true) {
        filterOfHiddenBooks.classList.add('hidden');
      } else {
        filterOfHiddenBooks.classList.remove('hidden');
      }
    }
  }
}
const filters = [];
filterBooks();
