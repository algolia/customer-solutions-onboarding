import algoliaConfig from "../algoliaconfig.js";
import { algoliasearch } from "algoliasearch";
import { autocomplete } from "@algolia/autocomplete-js";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

export default function () {
  console.log(algoliaConfig, "---");
  const searchClient = algoliasearch(
    algoliaConfig.APPID,
    algoliaConfig.API_KEY
  );
  const sources = [
    {
      sourceId: "movies",
      getItems({ query }) {
        return getAlgoliaResults({
          searchClient,
          queries: [
            {
              indexName: algoliaConfig.moviesIndexName,
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
          return html`<a href="/movie/${item.objectID}"
            ><div>${item.title}</div></a
          >`;
        },
        header() {
          return "movies";
        },
        noResults() {
          return "No movies";
        },
      },
      getItemUrl({ item }) {
        return `/movie/${item.objectID}`;
      },
    },
    {
      sourceId: "categories",
      getItems({ query }) {
        return getAlgoliaResults({
          searchClient,
          queries: [
            {
              indexName: algoliaConfig.categoriesIndexName,
              params: {
                query,
                hitsPerPage: 3,
              },
            },
          ],
        });
      },
      templates: {
        item({ item, components, html }) {
          return html`<a href="/category/${item.slug}"
            ><div>${item.name}</div></a
          >`;
        },
        header() {
          return "Categories";
        },
        noResults() {
          return "No categories";
        },
      },
      getItemUrl({ item }) {
        return `/category/${item.objectID}`;
      },
    },
  ];

  const onSubmit = ({ state }) => {
    location.assign(`/search?query=${state.query}`);
  };

  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: "RECENT_SEARCH",
    limit: 3,
    transformSource({ source }) {
      return {
        ...source,
        getItemUrl({ item }) {
          return `/search?query=${item.label}`;
        },
        templates: {
          ...source.templates,
          item(params) {
            const { item, html } = params;

            return html`<a
              class="aa-ItemLink"
              href="/search?query=${item.label}"
            >
              ${source.templates.item(params).props.children}
            </a>`;
          },
        },
      };
    },
  });

  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: algoliaConfig.querySuggestionsIndexName,
  });

  const plugins = [recentSearchesPlugin, querySuggestionsPlugin];

  autocomplete({
    container: "#autocomplete",
    getSources({ query }) {
      return query ? sources : [];
    },
    plugins,
    openOnFocus: true,
    placeholder: "Search for movies",
    onSubmit,
    insights: true,
  });
}
