const gameCard = document.querySelector(".games__container");
const searchResults = document.querySelector(".search-results-for");

async function main(value) {
  let url = `https://movies-api14.p.rapidapi.com/search?query=${
    value || "fast"
  }`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "735f7b1270msh6c586cab168a204p194541jsn4a8b43cfab9c",
      "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
    },
  };
  const data = await fetch(url, options);
  const info = await data.json();

  //implementing data to html format
  gameCard.innerHTML = info.contents
    .slice(0, 10)
    .map((movie) => gameHTML(movie))
    .join("");

  console.log(info);
  console.log(value); // 
}

main();


// sort function
function sortBy(event) {
  main(event.target.value);
  console.log(event.target.value)
}



// search function/loading stage
function filterGames(event) {
  main(event.target.value);
  title = event.target.value;

  const loading = document.querySelector(".loading__stage");

  loading.classList += " loading__stage--visible";
  //same concept as above
  setTimeout(() => {
    loading.classList.remove("loading__stage--visible");
  }, 2000);

  searchResults.innerHTML = `Results for: ${title}`;
}


function gameHTML(movie) {
  return `<div class="game__wrapper display-flex">
  <figure class="game-img--wrapper game__border">
    <img class="game-img" src="${movie.poster_path}" alt="">
  </figure>
  <span class="game__title">${movie.original_title}</span>
</div>`;
}
