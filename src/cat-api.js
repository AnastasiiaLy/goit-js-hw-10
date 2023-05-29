const API_KEY =
  'live_GW5Wyt9A70LUgtvFhaC4ZlZY4tFsPEcGKwc2XZyFwtjv6Nq9W9yy8PiST0YxUAko';

export function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(r => r.json())
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(r => r.json())
    .then(catBreeds => {
      const catBreed = catBreeds[0];
      const breedInformation = {
        name: catBreed.breeds[0].name,
        desc: catBreed.breeds[0].description,
        temp: catBreed.breeds[0].temperament,
        img: catBreed.url,
      };

      return breedInformation;
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}

export function getBreedImageById(breedId) {
  return fetchCatByBreed(breedId)
    .then(breedInfo => {
      const breedImg = breedInfo.img;
      return breedImg;
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}
