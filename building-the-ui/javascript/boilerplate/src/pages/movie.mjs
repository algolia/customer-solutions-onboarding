import config from "../algoliaconfig";
import fakeHit from "../fakeHit";

export function run(args) {
  const movieID = args.movieID;

  fetch(
    `https://${config.algoliaDemo.APPID}-dsn.algolia.net/1/indexes/DEMO_movies/${movieID}`,
    {
      method: "GET",
      headers: {
        "x-algolia-application-id": config.algoliaDemo.APPID,
        "x-algolia-api-key": config.algoliaDemo.API_KEY,
      },
    }
  )
    .then((response) => {
      if (response.status !== 200) {
        throw "error while fetching";
      }
      return response.json();
    })
    .then((data) => {
      //replace template
      document.getElementById("app").innerHTML = displayMovie(data);
    })
    .catch((e) => {
      //do nothing
    });
}

// Helper function to format date from timestamp
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const displayMovie = (movie) => {
  return `
  <div class="min-h-screen bg-[#141414]">
  
  <div class="relative h-[70vh]">
    <div class="absolute w-full h-full">
      <img
        src=${movie.backdrop}
        alt=${movie.title}
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
    </div>

    
    <div class="relative pt-[25vh] px-4 md:px-16 flex flex-col md:flex-row items-start gap-8">
      
      <div class="hidden md:block w-64 flex-shrink-0">
        <img
          src=${movie.poster}
          alt=${movie.title}
          class="w-full rounded-md shadow-2xl"
        />
      </div>

      
      <div class="flex-1">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          ${movie.title}
        </h1>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-white/80">
          <div class="flex items-center">
            <span>${movie.vote_average}/10</span>
            <span class="text-white/60 ml-1">
              (${movie.vote_count} votes)
            </span>
          </div>
          <div class="flex items-center">
            <span>${movie.year}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          ${movie.genres
            .map(
              (genre) =>
                `<span
              key={genre}
              class="px-3 py-1 bg-white/10 rounded-full text-sm"
            >
              ${genre}
            </span>`
            )
            .join("")}
        </div>

        <p class="text-lg mb-6 text-white/90 max-w-3xl">
          ${movie.overview}
        </p>

        <div class="flex flex-wrap gap-4 mb-8">
          <button
            class="flex items-center px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Buy $ ${movie.price}
          </button>
        </div>
      </div>
    </div>
  </div>


  <div class="px-4 md:px-16 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div class="md:col-span-2">
        <h2 class="text-2xl font-bold mb-4">Cast</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          ${movie.actors
            .slice(0, 12)
            .map(
              (actor, index) =>
                `<div class="bg-[#1f1f1f] p-3 rounded-md">
              <p class="font-medium">${actor}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>

      
      <div>
        <h2 class="text-2xl font-bold mb-4">Details</h2>
        <div class="space-y-4 bg-[#1f1f1f] p-4 rounded-md">
          <div>
            <p class="text-white/60 text-sm">Director</p>
            <p class="font-medium">${movie.director}</p>
          </div>
          <div>
            <p class="text-white/60 text-sm">Release Date</p>
            <p class="font-medium">
              ${formatDate(movie.release_date)}
            </p>
          </div>
          ${
            movie.budget > 0
              ? `<div>
                <p class="text-white/60 text-sm">Budget</p>
                <p class="font-medium">${formatCurrency(movie.budget)}</p>
              </div>`
              : ""
          }
          ${
            movie.revenue > 0
              ? `<div>
                <p class="text-white/60 text-sm">Revenue</p>
                <p class="font-medium">${formatCurrency(movie.revenue)}</p>
              </div>`
              : ""
          }
          <div>
            <p class="text-white/60 text-sm">Original Language</p>
            <p class="font-medium">
              ${movie.original_language}
            </p>
          </div>
          <div>
            <p class="text-white/60 text-sm">Popularity Score</p>
            <p class="font-medium">${movie.popularity}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
};

export const template = displayMovie(fakeHit);
