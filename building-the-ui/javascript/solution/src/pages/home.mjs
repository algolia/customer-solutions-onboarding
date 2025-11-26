import carousel from "../components/carousel";
import { algoliasearch } from "algoliasearch";
import algoliaConfig from "../algoliaconfig";

export function run() {
  const searchClient = algoliasearch(
    algoliaConfig.APPID,
    algoliaConfig.API_KEY
  );

  searchClient
    .search([
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: `categoryPageIdentifiers:"Best Offers"`,
        hitsPerPage: 4,
      },
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: `categoryPageIdentifiers:"Action"`,
        hitsPerPage: 4,
      },
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: `categoryPageIdentifiers:"Horror"`,
        hitsPerPage: 4,
      },
      {
        indexName: algoliaConfig.moviesIndexName,
        filters: `categoryPageIdentifiers:"Drama"`,
        hitsPerPage: 4,
      },
    ])
    .then(({ results }) => {
      const html = [
        carousel("Best offers", "/category/Best%20Offers", results[0].hits),
        carousel("Action", "/category/Action", results[1].hits),
        carousel("Horror", "/category/Horror", results[2].hits),
        carousel("Drama", "/category/Drama", results[3].hits),
      ].join("");

      document.getElementById("carousels").innerHTML = html;
    });
}

export const template = `
<div id="carousels">
</div>
`;
