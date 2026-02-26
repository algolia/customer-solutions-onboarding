import carousel from "../components/carousel";
import algoliaConfig from "../algoliaconfig";
import { algoliasearch } from "algoliasearch";

export function run() {
  const searchClient = algoliasearch(
    algoliaConfig.APPID,
    algoliaConfig.API_KEY
  );

  console.log("home");

  searchClient
    .search([
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: "categoryPageIdentifiers:on_sale",
        hitsPerPage: 3,
      },
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: "categoryPageIdentifiers:action",
        hitsPerPage: 3,
      },
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: "categoryPageIdentifiers:horror",
        hitsPerPage: 3,
      },
    ])
    .then(({ results }) => {
      document.getElementById("app").innerHTML = `
      <div>
          ${carousel("Best offers", "/category/on_sale", results[0].hits)}
          ${carousel("Action", "/category/action", results[1].hits)}
          ${carousel("Horror", "/category/horror", results[2].hits)}
      </div>
      `;
    });

  window.aa("viewedObjectIDsAfterSearch", {
    index: "LF_movies",
    eventName: "Movies Viewed",
    queryID: "YourQueryID",
    objectIDs: [, "999790"],
    positions: [1, 2],
  });
}

export const template = `
<div>
    ${carousel("Best offers", "/category/on_sale")}
    ${carousel("Action", "/category/action")}
    ${carousel("Horror", "/category/horror")}
</div>
`;
