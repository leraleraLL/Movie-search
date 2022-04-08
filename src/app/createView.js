import { clearNode } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
  // Search list
  const resultsContainer = document.querySelector('.results__grid');
  const resultsHeading = document.querySelector('.results__heading');

  // Tags list
  const searchTags = document.querySelector('.search__tags');

  // Form
  const searchForm = document.querySelector('.search__form');
  const searchInput = document.querySelector('.search__input');

  // Renderers
  const renderList = (results) => {
    const list = document.createDocumentFragment();

    results.forEach((movieData) => {
      const movie = document.createElement('movie-card');

      movie.poster = movieData.poster;
      movie.title = movieData.title;
      movie.year = movieData.year;
      movie.link = movieData.link;

      list.appendChild(movie);
    });

    clearNode(resultsContainer);
    resultsContainer.appendChild(list);
  };

  const renderSearchList = (terms) => {
    const list = document.createDocumentFragment();

    terms.forEach((movie) => {
      const tag = document.createElement('a');
      tag.classList.add('search__tag');
      tag.href = `/?search=${movie}`;
      tag.textContent = movie;
      tag.dataset.movie = movie;

      list.appendChild(tag);
    });

    clearNode(searchTags);
    searchTags.appendChild(list);
  };

  const renderCount = (count) => {
    resultsHeading.textContent = `Нашли ${count} ${dMovies(count)}`;
  };

  const renderError = (error) => {
    resultsHeading.textContent = error;
  };

  // Events
  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      event.preventDefault();
      _listener(searchInput.value);
      searchInput.value = '';
    };

    searchForm.addEventListener('submit', listener);

    return () => searchForm.removeEventListener('submit', listener);
  };

  const onTagClick = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag') && !event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('click', listener);
    return () => searchTags.removeEventListener('click', listener);
  };

  const onTagRemove = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__tag') && event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchTags.addEventListener('click', listener);
    return () => searchTags.removeEventListener('click', listener);
  };

  return {
    renderList,
    renderCount,
    renderError,
    renderSearchList,
    onSearchSubmit,
    onTagClick,
    onTagRemove,
  };
};
