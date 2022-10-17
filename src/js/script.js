{
  ('use strict');

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
      const ratingBgc = determineRatignBgc(book.rating);
      book.ratingBgc = ratingBgc;
      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;
      const generateHTML = templates.bookTemplate(book);

      const createDom = utils.createDOMFromHTML(generateHTML);

      const bookContainer = document.querySelector(
        select.containerOf.booksList
      );
      bookContainer.appendChild(createDom);
    }
  }
  determineRatignBgc();
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
        clickedElement.classList.remove('filter');
      }
    });
  }

  initAction();

  function filterBooks() {
    for (let book of dataSource.books) {
      const filterOfHiddenBooks = document.querySelector(
        '.book__image[data-id="' + book.id + '"]'
      );

      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.detail[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden == true) {
        filterOfHiddenBooks.classList.add('hidden');
      } else {
        filterOfHiddenBooks.classList.remove('hidden');
      }
    }
  }

  const filters = [];

  function determineRatignBgc(rating) {
    let background = '#fefcea';
    if (rating < 6) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
    return background;
  }
}
