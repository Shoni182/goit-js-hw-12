import './scss/main.scss';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  loadGranim,
} from './js/render-functions';

//: пошук DOM елементів
const refs = {
  form: document.querySelector('.form'),
};

//: деструктуризація
const { form } = refs;

//: Задні фон
document.addEventListener('DOMContentLoaded', () => {
  loadGranim();
});

//: прослуховувач submit
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const formData = new FormData(form);
  const query = formData.get('search-text').trim();

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

  //: Проміс
  getImagesByQuery(query)
    .then(response => {
      if (response.length === 0) {
        hideLoader();
        return Promise.reject();
      }

      createGallery(response);
      hideLoader();
    })
    .catch(() => {
      iziToast.show({
        messageSize: '20',
        message: `На жаль, немає зображень, що відповідають вашому пошуковому запиту. Спробуйте ще раз!`,
        position: 'center',
        close: true,
        closeOnEscape: true,
        theme: 'light',
        color: 'orange',
      });
    });
});
