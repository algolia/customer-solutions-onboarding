import algoliaconfig from "../algoliaconfig";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import { algoliasearch } from "algoliasearch";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import "@algolia/autocomplete-theme-classic";

export default function () {
  const searchClient = algoliasearch(
    "U9UXVSI686",
    "02f33d0938011c5cfc35e2e53ad3fa8f"
  );

  const moviesSource = {
    sourceId: "movies",
    getItems({ query }) {
      return getAlgoliaResults({
        searchClient,
        queries: [
          {
            indexName: "prod_ECOM",
            params: {
              query,
              hitsPerPage: 5,
            },
          },
        ],
      });
    },
    templates: {
      item({ item, components, html }) {
        return html` item.name`;
      },
    },
  };

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: "prod_ECOM_query_suggestions",
  });

  //   const actorsSource = {
  //     sourceId: "actors",
  //     getItems({ query }) {
  //       return getAlgoliaResults({
  //         searchClient,
  //         queries: [
  //           {
  //             indexName: "prod_ECOM",
  //             params: {
  //               query,
  //               hitsPerPage: 10,
  //             },
  //           },
  //         ],
  //       });
  //     },
  //     templates: {
  //       item({ item, components, html }) {
  //         return item.name;
  //       },
  //     },
  //   };

  autocomplete({
    openOnFocus: true,
    container: "#autocomplete",
    placeholder: "Search for movies",
    plugins: [querySuggestionsPlugin],
    getSources({ query }) {
      return [moviesSource];
    },
    render({ elements, render, html }, root) {
      const { movies, querySuggestionsPlugin } = elements;

      render(
        html`<div class="aa-PanelLayout aa-Panel--scrollable">
          <div class="aa-PanelSections">
            <div class="aa-PanelSection--left">${querySuggestionsPlugin}</div>
            <div class="aa-PanelSection--right">${movies}</div>
          </div>
        </div>`,
        root
      );
    },
  });
}
