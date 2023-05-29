import { fetchBreeds, fetchCatByBreed } from './cat-api';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const errorNotification = document.querySelector('.error');
const loadingNotification = document.querySelector('.loader');

const selector = document.querySelector('.breed-select');
const breedInformation = document.querySelector('.cat-info');

loadingNotification.classList.add('ishidden');

errorNotification.classList.add('ishidden');

selector.addEventListener('change', onBreedSelect);

function BreedListMarkup() {
  fetchBreeds()
    .then(breedList => {
      let markup = '';

      breedList.forEach(breed => {
        markup += `<option value="${breed.id}">${breed.name}</option>`;
      });

      selector.innerHTML = markup;
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}

BreedListMarkup();

function onBreedSelect(evt) {
  let selectedBreedId = '';
  const selectedOption = evt.target.selectedOptions[0];

  selectedBreedId = selectedOption.value;
  addLoaderNotification();
  breedInformation.innerHTML = '';

  fetchCatByBreed(selectedBreedId)
    .then(breedInfo => {
      removeLoaderNotification();

      let inforMarkup = `
        <img src="${breedInfo.img}" alt="breedInfo.name">
        <div class = 'infoOfBreed'>
        <h1>${breedInfo.name}</h1>
        <p>${breedInfo.desc}</p>
        <p>Temperament: ${breedInfo.temp}</p>
        </div>
      `;

      breedInformation.innerHTML = inforMarkup;
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}

function addLoaderNotification() {
  loadingNotification.classList.remove('ishidden');
}

function removeLoaderNotification() {
  loadingNotification.classList.add('ishidden');
}
