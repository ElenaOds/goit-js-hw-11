import axios from 'axios';

const axios = require('axios').default;

export async function imageApi(inputValue, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=31476924-d929541eaee183828a9c10824&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  console.log(response.data);
  return response.data;
}
