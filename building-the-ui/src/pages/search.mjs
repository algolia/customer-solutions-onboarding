const staticSearchBox = "",
  staticInfiniteHits = "",
  staticToggleRefinement = "",
  staticRefinementList = "";
import { algoliasearch } from "algoliasearch";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  configure,
  infiniteHits,
  refinementList,
  toggleRefinement,
} from "instantsearch.js/es/widgets";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import algoliaConfig from "../algoliaconfig";

export function run() {
  const searchClient = algoliasearch(
    algoliaConfig.APPID,
    algoliaConfig.API_KEY
  );
  const search = instantsearch({
    indexName: algoliaConfig.moviesIndexName,
    searchClient,
    insights: true,
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
    configure({
      ruleContexts: ["search"],
      analyticsTags: ["search"],
    })
  );

  widgets.push(
    infiniteHits({
      container: "#hits",
      templates: {
        item(hit, { html, components, sendEvent }) {
          return html`
            <div>
              <a href="/movie/${hit.objectID}">
                <img src="${hit.poster}" width="500px" />
                <h2>${hit.title}</h2>
                <p>${hit.price} €</p>
                <button
                  class="addToCard"
                  onClick="${(event) => {
                    sendEvent("conversion", hit, "Product Added to Watch List");
                    event.preventDefault();
                  }}"
                >
                  Add to watch list
                </button>
              </a>
            </div>
          `;
        },
      },
    })
  );

  widgets.push(
    refinementList({
      container: "#actors",
      attribute: "actors",
      searchable: true,
    })
  );
  widgets.push(
    refinementList({
      container: "#genres",
      attribute: "genres",
    })
  );
  widgets.push(
    refinementList({
      container: "#director",
      attribute: "director",
    })
  );
  widgets.push(
    toggleRefinement({
      container: "#on_sale",
      attribute: "on_sale",
    })
  );

  search.addWidgets(widgets);

  search.start();
}

export const template = `
<div>
  <h1>Search</h1>
  <div id="searchbox">
  ${staticSearchBox}
  </div>
  <div class="search-panel">
    <div class="search-panel__filters">
      <div id="refinements">
        <div class="ais-Panel">
          <div class="ais-Panel-header"><span>Actors</span></div>
          <div class="ais-Panel-body">
            <div id="actors">         
            ${staticRefinementList}   
            </div>
          </div>
        </div>

        <div class="ais-Panel">
          <div class="ais-Panel-header"><span>Genres</span></div>
          <div class="ais-Panel-body">
            <div id="genres">
            ${staticRefinementList}   
            </div>
          </div>
        </div>
        <div class="ais-Panel">
          <div class="ais-Panel-header"><span>Director</span></div>
          <div class="ais-Panel-body">
            <div id="director">
            ${staticRefinementList}   
            </div>
          </div>
        </div>
        <div class="ais-Panel">
          <div class="ais-Panel-header"><span>On Sales</span></div>
          <div class="ais-Panel-body">
            <div id="on_sale">
            ${staticToggleRefinement}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-panel__results">
      <div id="hits">  
      ${staticInfiniteHits}    
      </div>
    </div>
  </div>
</div>
`;
