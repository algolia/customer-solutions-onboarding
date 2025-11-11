import algoliaConfig from "../algoliaconfig";

export function run(args) {
  const movieID = args.movieID;
  document.getElementById("movieName").innerHTML = "Movie " + movieID;

  //send viewed event
}

export const template = `
<div className="movieDetail">
    <h1 id="movieName">Movie</h1>
    <button onclick="window.watchMovie()">Watch Now</button>
</div>
`;
