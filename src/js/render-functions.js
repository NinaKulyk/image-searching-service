export function createImageMarkup(images) {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b>${likes}</p>
        <p class="info-item"><b>Views</b>${views}</p>
        <p class="info-item"><b>Comments</b>${comments}</p>
        <p class="info-item"><b>Downloads</b>${downloads}</p>
      </div>
    </div>
  `
    )
    .join('');
}

export function renderImages(markup) {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function toggleLoadMoreButton(show) {
  const loadMoreButton = document.querySelector('.load-more');
  if (show) {
    loadMoreButton.classList.remove('hidden');
  } else {
    loadMoreButton.classList.add('hidden');
  }
}

export function showEndOfResultsMessage() {
  const endMessage = document.createElement('p');
  endMessage.classList.add('end-message');
  endMessage.textContent = "We're sorry, but you've reached the end of search results.";
  document.querySelector('.gallery').insertAdjacentElement('afterend', endMessage);
}

export function clearEndOfResultsMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}
