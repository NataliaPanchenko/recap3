import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters(page) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const characters = await response.json();

  prevButton.disabled = characters.info.prev === null;

  cardContainer.innerHTML = "";
  maxPage = characters.info.pages;

  pagination.textContent = `${page} / ${maxPage}`;
  characters.results.forEach((character) => {
    const cardList = createCharacterCard(character);
    cardContainer.append(cardList);
    nextButton.disabled = characters.info.next === null;
  });
}
fetchCharacters(page);
nextButton.addEventListener("click", () => {
  page++;

  fetchCharacters(page);
});
prevButton.addEventListener("click", () => {
  page--;

  fetchCharacters(page);
});
