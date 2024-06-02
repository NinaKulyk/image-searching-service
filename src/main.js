import { fetchImages } from './js/pixabay-api.js';
import {
  createImageMarkup,
  renderImages,
  clearGallery,
  toggleLoadMoreButton,
  showEndOfResultsMessage,
  clearEndOfResultsMessage
} from './/js/render-functions.js';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
let query = '';
let page = 1;
let lightbox;

form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  clearGallery();
  toggleLoadMoreButton(false);
  clearEndOfResultsMessage();

  if (query === '') return;

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      alert('No images found. Please try a different query.');
      return;
    }

    const markup = createImageMarkup(data.hits);
    renderImages(markup);
    toggleLoadMoreButton(data.hits.length >= 15);
    initLightbox();

  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  page += 1;
  try {
    const data = await fetchImages(query, page);
    const markup = createImageMarkup(data.hits);
    renderImages(markup);
    toggleLoadMoreButton(data.hits.length >= 15);

    if (data.hits.length < 15) {
      toggleLoadMoreButton(false);
      showEndOfResultsMessage();
    }

    smoothScroll();
    lightbox.refresh();

  } catch (error) {
    console.error(error);
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt" });
  } else {
    lightbox.refresh();
  }
}
