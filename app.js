// const searchForm = document.getElementById("search-form");
// const searchBox = document.getElementById("search-box");
// const searchResult = document.getElementById("search-result");
// const showMore = document.getElementById("show-more");

// let keyword = "";
// let page = 1;

const gameCard = document.querySelector(".games__container");

let search = "hobbit";

async function main(value) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/keyword/${value}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "735f7b1270msh6c586cab168a204p194541jsn4a8b43cfab9c",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };
  const data = await fetch(url, options);
  const info = await data.json();

  console.log(info)

  info.results.map((movie) => {
    console.log(movie.titleText.text);
  });

  gameCard.innerHTML = info.results.map((game) => gameHTML(game)).join("");
}

main();

function gameHTML(game) {
  return `<div class="game__wrapper">
    <div class="game__img--replacement  game__border">
    <img class="sad" src="https://st3.depositphotos.com/1967477/19586/v/1600/depositphotos_195861472-stock-illustration-sad-emoticon-face-isolated-white.jpg" alt="">
      <span class="movie-img__text"> Lets just pretend that there is a background img here! the API i used doesnt have imgs for all :(</span>
      </div>
      <span value="${game.titleText.text}" class="game__title">${game.titleText.text}</span>
  </div>`;
}

function idk(call) {
  console.log(call);
}

function filterGames(event) {
  // console.log(event.target.value);
  main(event.target.value);
}