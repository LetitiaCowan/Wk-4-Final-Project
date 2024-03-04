// const searchForm = document.getElementById("search-form");
// const searchBox = document.getElementById("search-box");
// const searchResult = document.getElementById("search-result");
// const showMore = document.getElementById("show-more");
const gameCard = document.querySelector(".games__container");
const searchResults = document.querySelector(".search-results-for")


async function main(value) {
  // creates the query string for the url endpoint
  let inputStr = value.toString();
  let outputStr = "";

  for (let i = 0; i < inputStr.length; i++) {
    if (inputStr[i] === " ") {
      outputStr += "%20";
    } else {
      outputStr += inputStr[i];
    }
  }
  console.log(outputStr);

  let url = `https://movies-api14.p.rapidapi.com/search?query=` + outputStr;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "735f7b1270msh6c586cab168a204p194541jsn4a8b43cfab9c",
      "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
    },
  };
  const data = await fetch(url, options);
  const info = await data.json();

  // prints out the movie titles in the console
  gameCard.innerHTML = info.contents.map((movie) => {
    console.log(movie.original_title);
  });

  gameCard.innerHTML = info.contents
    .slice(0, 10)
    .map((movie) => gameHTML(movie))
    .join("");

    console.log(title)
}

function filterGames(event) {
  main(event.target.value);
  title = event.target.value
  const loading = document.querySelector(".loading__stage");
  loading.classList += " loading__stage--visible";

  setTimeout(() => {
    loading.classList.remove("loading__stage--visible");
  }, 2000);

  searchResults.innerHTML = `Results for: ${title}`
}

main();

function gameHTML(movie) {
  return `<div class="game__wrapper display-flex">
  <figure class="game-img--wrapper game__border">
    <img class="game-img" src="${movie.poster_path}" alt="">
  </figure>
  <span class="game__title">${movie.original_title}</span>
</div>`;
}
