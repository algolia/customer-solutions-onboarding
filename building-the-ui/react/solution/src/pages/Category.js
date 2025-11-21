import { useParams } from "react-router-dom";
import { useState } from "react";
import { algoliaClient } from "../services/algoliaClient";
import {
  InstantSearch,
  Configure,
  InfiniteHits,
  RefinementList,
  ToggleRefinement,
} from "react-instantsearch";
import config from "../config";
import Hit from "../components/Hit";

export default function Category() {
  const { categoryPageIdentifier } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  window.aa("viewedFilters", {
    index: config.moviesIndexName,
    eventName: "Category page viewed",
    filters: [`categoryPageIdentifiers:"${categoryPageIdentifier}"`],
  });

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {categoryPageIdentifier}
      </h1>

      <InstantSearch
        searchClient={algoliaClient}
        indexName={config.moviesIndexName}
        insights={true}
      >
        <Configure
          filters={`categoryPageIdentifiers:"${categoryPageIdentifier}"`}
        />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filters sidebar */}
          <div
            className={`${
              mobileFiltersOpen ? "" : "hidden"
            } fixed inset-0 z-50 bg-black/80 md:hidden z-1000`}
          >
            <div className="fixed right-0 top-0 h-full w-3/4 bg-[#141414] p-4 pt-20 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-white p-1"
                >
                  Close
                </button>
              </div>
              <div className="space-y-6">
                <SideBarRefinements />
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-[#1f1f1f] p-4 rounded-md">
              <SideBarRefinements />
            </div>
          </div>

          <InfiniteHits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );

  return (
    <div>
      <InstantSearch
        searchClient={algoliaClient}
        indexName={config.moviesIndexName}
        insights={true}
      >
        <h1>{categoryPageIdentifier}</h1>

        <Configure
          filters={`categoryPageIdentifiers:"${categoryPageIdentifier}"`}
        />

        <div className="search-panel">
          <div className="search-panel__filters">
            <div id="actors">
              <div className="ais-Panel">
                <div className="ais-Panel-header">
                  <span>Actors</span>
                </div>
                <div className="ais-Panel-body"></div>
              </div>
            </div>

            <div id="onsale">
              <div className="ais-Panel">
                <div className="ais-Panel-header">
                  <span>On Sales</span>
                </div>
                <div className="ais-Panel-body"></div>
              </div>
            </div>
          </div>
          <div className="search-panel__results"></div>
        </div>
      </InstantSearch>
    </div>
  );
}

const SideBarRefinements = () => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-2">Actors</h3>
        <RefinementList attribute="actors" searchable />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">On Sales</h3>
        <ToggleRefinement attribute="on_sale" label="On sales" />
      </div>
    </>
  );
};
