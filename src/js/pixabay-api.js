import axios from 'axios';

//: змінна опцій HTTPS запиту
const server = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '53374429-639c77152d70b3fe75f006246',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

//: ф-я HTTPS запит
export async function getImagesByQuery(query, page) {
  const res = await server.get('', {
    params: {
      q: query,
      page: page,
      per_page: 15,
    },
  });

  return res.data;
}
