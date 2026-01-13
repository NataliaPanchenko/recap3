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
let searchQuery = "";

async function fetchCharacters(page, searchQuery) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
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
fetchCharacters(page, searchQuery);
nextButton.addEventListener("click", () => {
  page++;

  fetchCharacters(page, searchQuery);
});
prevButton.addEventListener("click", () => {
  page--;

  fetchCharacters(page, searchQuery);
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log("data", data);
  searchQuery = data.query;
  console.log("searchbar", searchQuery);
  page = 1;
  fetchCharacters(page, searchQuery);
  searchBar.reset();
});
