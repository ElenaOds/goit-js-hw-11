
export const fetchImages = async (inputValue, page) => {
  return await fetch(
    `https://pixabay.com/api/?key=31476924-d929541eaee183828a9c10824&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
  )
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
};