//import staticInfiniteHits from "../components/staticInfiniteHits.mjs";
//import staticToggleRefinement from "../components/staticToggleRefinement.mjs";
//import staticRefinementList from "../components/staticRefinementList.mjs";
//import staticSearchBox from "../components/staticSearchBox.mjs";

import { algoliasearch } from "algoliasearch";
import instantsearch from "instantsearch.js";
import algoliaConfig from "../algoliaconfig.js";
import {
  searchBox,
  configure,
  infiniteHits,
  refinementList,
  toggleRefinement,
} from "instantsearch.js/es/widgets";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";

//remove imports and uncomment the following lines to remove fake InstantSearch components
const staticSearchBox = "",
  staticInfiniteHits = "",
  staticToggleRefinement = "",
  staticRefinementList = "";

export function run() {
  console.log("search");

  const searchClient = algoliasearch(
    algoliaConfig.APPID,
    algoliaConfig.API_KEY
  );

  // Render the InstantSearch.js wrapper
  // Replace INDEX_NAME with the name of your index.
  const search = instantsearch({
    indexName: algoliaConfig.moviesIndexName,
    searchClient,
    routing: {
      stateMapping: singleIndex(algoliaConfig.moviesIndexName),
    },
  });
  const widgets = [];

  widgets.push(
    searchBox({
      container: "#searchbox",
    })
  );

  widgets.push(
    infiniteHits({
      container: "#hits",
      templates: {
        item(hit, { html, components }) {
          return html`
            <h2>
              ${hit.__hitIndex}:
              ${components.Highlight({ attribute: "title", hit })}
            </h2>
            <p>${hit.overview}</p>
          `;
        },
      },
    })
  );

  widgets.push(
    refinementList({
      attribute: "actors",
      container: "#actors",
      searchable: true,
    })
  );

  search.addWidgets(widgets);
  search.start();
}

export const template = `
<div>
  <div id="searchbox">
  ${staticSearchBox}
  </div>
  <div class="flex flex-col md:flex-row gap-8">
    <div class="hidden md:block w-64 flex-shrink-0">
      <div class="bg-[#1f1f1f] p-4 rounded-md">
        <div>
          <h3 class="text-lg font-semibold mb-2">Actors</h3>
          <div id="actors"></div>
          ${staticRefinementList}   
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Genres</h3>
          <div id="genres"></div>
          ${staticRefinementList}   
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Director</h3>
          ${staticRefinementList}   
        </div>
        <div>
        <h3 class="text-lg font-semibold mb-2">On Sales</h3>
        ${staticToggleRefinement}
      </div>
      </div>
    </div>
    <div id="hits">  
    ${staticInfiniteHits}    
    </div>
  </div>
</div>
`;
