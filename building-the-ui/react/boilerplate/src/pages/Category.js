import { useState } from "react";
import RefinementList from "../fakeAISComponents/RefinementList";
import ToggleRefinement from "../fakeAISComponents/ToggleRefinement";
import InfiniteHits from "../fakeAISComponents/InfiniteHits";
import Hit from "../components/Hit";
import { useParams } from "react-router-dom";

export default function Category() {
  const { categoryPageIdentifier } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {categoryPageIdentifier}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter button */}
        <button
          className="md:hidden flex items-center justify-center bg-[#333] text-white py-2 px-4 rounded-md mb-4"
          onClick={() => setMobileFiltersOpen(true)}
        >
          Filters
        </button>

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
    </div>
  );
}

const SideBarRefinements = () => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-2">Actors</h3>
        <RefinementList attribute={"actors"} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">On Sales</h3>
        <ToggleRefinement
          attribute={"on_sale"}
          on={true}
          off={false}
          label={"On Sale "}
        />
      </div>
    </>
  );
};
