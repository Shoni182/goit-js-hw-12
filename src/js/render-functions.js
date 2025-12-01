import SimpleLightbox from 'simplelightbox';
import Granim from 'granim';
//: пошук елементів DOM
let refs = {
  galleryElem: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};
const { galleryElem, loader } = refs;

//: змінна загрузки
// let loader = null;

//: ф-я темплеуйту розмітки
function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  let tagsText = tags.split(',').slice(0, 3);

  return `
  <li class="list-item">
        <div class="item-container">
        <a href="${largeImageURL}" class="">
          <img src="${webformatURL}" alt="${tagsText}" class="item-img">
          </a>
          <div class="desc-container">
            <p class="item-title">Likes <span class="item-number">${likes}</span></p>
            <p class="item-title">Views <span class="item-number">${views}</span></p>
            <p class="item-title">Comments <span class="item-number">${comments}</span></p>
            <p class="item-title">Downloads <span class="item-number">${downloads}</span></p>
          </div>
        </div>
      </li>`;
}

//: б-ка галереї
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.85,
});

//: ф-я рендеру розмітки
export function createGallery(images) {
  const markup = images.map(imageTemplate).join('');
  // const lightbox = new SimpleLightbox('.gallery a', {
  //   captionsData: 'alt',
  //   captionPosition: 'bottom',
  //   captionDelay: 250,
  //   overlayOpacity: 0.85,
  // });
  galleryElem.innerHTML = markup;
  lightbox.refresh();
  return markup;
}

//: ф-я очистки галереї
export function clearGallery() {
  galleryElem.innerHTML = '';
}

//: ф-я запуску загрузки
export function showLoader() {
  if (!loader.classList.contains('isActive')) {
    loader.classList.add('isActive');
  }
}

//: ф-я виключення загрузки
export function hideLoader() {
  if (loader.classList.contains('isActive')) {
    loader.classList.remove('isActive');
  }
}

//: ф-я стилізації фону
export function loadGranim() {
  let granimInstance = new Granim({
    element: '#granim-canvas',
    name: 'granim',
    opacity: [1, 1],
    states: {
      'default-state': {
        gradients: [
          ['#834D9B', '#D04ED6'],
          ['#1CD8D2', '#93EDC7'],
        ],
      },
    },
  });
  return;
}
