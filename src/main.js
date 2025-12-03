import './scss/main.scss';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';

//: імпорт функцій
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  loadGranim,
  showLoadBtn,
  hideLoadBtn,
  addGallery,
} from './js/render-functions';

//: пошук DOM елементів
const refs = {
  form: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.js-btn-load'),
};

//: деструктуризація
const { form, loadMoreBtn } = refs;

//: Задні фон
document.addEventListener('DOMContentLoaded', () => {
  loadGranim();
});

const PER_PAGE = 15;
let page;
let query; // виведено для збереження пошуку
let totalPages;

let rect;

//: прослуховувач submit +
form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(form);

  query = formData.get('search-text').trim();
  page = 1;

  if (query === '') {
    clearGallery();
    form.reset();
    return iziToast.show({
      messageSize: '20',
      message: `Будь ласка введіть назву фото!`,
      position: 'center',
      close: true,
      closeOnEscape: true,
      theme: 'light',
      color: 'yellow',
    });
  }

  showLoader();
  clearGallery();
  form.reset();

  //: Проміс + async

  try {
    const res = await getImagesByQuery(query, page);

    if (res.hits.length === 0) {
      hideLoader();
      return Promise.reject(reject);
    }
    createGallery(res.hits);
    totalPages = Math.ceil(res.total / PER_PAGE);
    console.log('Total Pages', totalPages);

    hideLoader();
    checkBtnStatus();
  } catch {
    iziToast.show({
      messageSize: '20',
      message: `На жаль, немає зображень, що відповідають вашому пошуковому запиту. Спробуйте ще раз!`,
      position: 'center',
      close: true,
      closeOnEscape: true,
      theme: 'light',
      color: 'orange',
    });
  }
});

//: прослуховувач load more btn
loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  const listItem = document.querySelector('.list-item');
  rect = listItem.getBoundingClientRect();

  console.log(listItem);

  console.log(rect);

  showLoader();
  hideLoadBtn();

  const res = await getImagesByQuery(query, page);
  addGallery(res.hits);

  hideLoader();
  checkBtnStatus();

  window.scrollBy({
    top: rect.height * 3,
    behavior: 'smooth',
  });
});

//: Ф-я перевірки статусу кнопки
function checkBtnStatus() {
  if (page < totalPages) {
    showLoadBtn();
  } else {
    hideLoadBtn();
    iziToast.show({
      messageSize: '20',
      message: `Вибачте, але ви досягли кінця результатів пошуку.`,
      position: 'bottomCenter',
      close: true,
      closeOnEscape: true,
      theme: 'light',
      color: 'white',
    });
  }
}
