const movieCard = document.querySelector(".movies__container");
const searchResults = document.querySelector(".search-results-for");
const sort = document.querySelector("#sort__select");
const input = document.querySelector("#search-input");

async function main(value) {
  let sortValue = input.value;
  let url = `https://movies-api14.p.rapidapi.com/search?query=${
    sortValue || "fast"
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
  const response = info.contents;

  if (value === "NEW_TO_OLD") {
    newest = response.sort(function (a, b) {
      if (a.release_date > b.release_date) return 1;
      if (a.release_date < b.release_date) return -1;
      loading();
      return 0;
    });
    console.log(newest);
  } else if (value === "OLD_TO_NEW") {
    oldest = response.sort(function (a, b) {
      if (b.release_date > a.release_date) return 1;
      if (b.release_date < a.release_date) return -1;
      loading();
      return 0;
    });
    console.log(oldest);
  }

  //implementing data to html format
  movieCard.innerHTML = info.contents
    .slice(0, 10)
    .map((movie) => movieHTML(movie))
    .join("");
}

main();

//sorting value
function sortBy(event) {
  main(event.target.value);
}

// search value
function filterMovie(event) {
  let sortValue = input.value;
  main(sortValue);
  loading();
  // title = event.target.value;
  searchResults.innerHTML = `Results for: ${sortValue}`;
}


//loading stage function
function loading(load) {
  const loading = document.querySelector(".loading__stage");

  loading.classList += " loading__stage--visible";
  //same concept as above
  setTimeout(() => {
    loading.classList.remove("loading__stage--visible");
  }, 2000);
}


//html formating
function movieHTML(movie) {
  return `<div class="movie__wrapper display-flex">
  <figure class="movie-img--wrapper movie__border">
    <img class="movie-img" src="${movie.poster_path}" alt="">
  </figure>
  <span class="movie__title">${movie.original_title}</span>
</div>`;
}
