//remove imports and uncomment the following lines to remove fake InstantSearch components
const staticInfiniteHits = "",
  staticToggleRefinement = "",
  staticRefinementList = "";

import { algoliasearch } from "algoliasearch";
import instantsearch from "instantsearch.js";
import algoliaConfig from "../algoliaconfig.js";
import {
  refinementList,
  infiniteHits,
  toggleRefinement,
  configure,
} from "instantsearch.js/es/widgets";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import hitTemplate from "../components/hit";

export function run(args) {
  const categoryPageIdentifier =
    args.lvl0 + (args.lvl1 ? " > " + args.lvl1 : "");
  document.getElementById("categoryName").innerHTML = categoryPageIdentifier;

  const searchClient = algoliasearch(
    algoliaConfig.APPID,
    algoliaConfig.API_KEY
  );

  const search = instantsearch({
    searchClient,
    indexName: algoliaConfig.moviesIndexName,
    insights: true,
    routing: {
      stateMapping: singleIndex(algoliaConfig.moviesIndexName),
    },
  });

  const widgets = [];

  widgets.push(
    configure({
      filters: `categoryPageIdentifiers:"${categoryPageIdentifier}"`,
    })
  );

  widgets.push(
    infiniteHits({
      container: "#hits",
      templates: {
        item(item, { html, sendEvent }) {
          return hitTemplate(item, html, sendEvent);
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

  widgets.push(
    refinementList({
      attribute: "genres",
      container: "#genres",
    })
  );

  widgets.push(
    refinementList({
      attribute: "director",
      container: "#director",
    })
  );

  widgets.push(
    toggleRefinement({
      attribute: "on_sale",
      container: "#on_sales",
      templates: {
        labelText({ count }, { html }) {
          return html`On sale`;
        },
      },
    })
  );

  search.addWidgets(widgets);

  search.start();
}

export const template = `
<div>
  <h1 id="categoryName" class="text-3xl md:text-5xl font-bold mb-4">Category</h1>
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
          <div id="director"></div>
          ${staticRefinementList}   
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">On Sales</h3>
          <div id="on_sales"></div>
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
