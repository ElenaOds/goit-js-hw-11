import { imageApi } from './imageApi';
import Notiflix from 'notiflix';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('input');
const searchButton = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');


loadButton.style.display = 'none';
let page = 1;

searchButton.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const inputValue = input.value;
  if (inputValue !== '') {
    imageApi(inputValue, page).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        loadButton.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

loadButton.addEventListener('click', () => {
  page++;
  const inputValue = input.value.trim();
  loadButton.style.display = 'none';
  imageApi(inputValue, page).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      loadButton.style.display = 'block';
      gallerySimpleLightbox.refresh();
    }
  });
});


function renderImageList(images) {
  const markup = images
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>  {   
   
      return `
                <div class="photo-card">
                <a href="${largeImageURL}"><img class="photo" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy"/></a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b><br/>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b><br/>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b><br/>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b><br/>${downloads}
                        </p>
                    </div>
                </div>
            `
        })
    .join('');
  gallery.innerHTML = markup;
 
 }

function cleanGallery() {
  gallery.innerHTML = '';
  page = 1;
  loadButton.style.display = 'none';
}