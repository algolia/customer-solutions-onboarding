import staticInfiniteHits from "../components/staticInfiniteHits.mjs";
import staticToggleRefinement from "../components/staticToggleRefinement.mjs";
import staticRefinementList from "../components/staticRefinementList.mjs";
import staticSearchBox from "../components/staticSearchBox.mjs";

//remove imports and uncomment the following lines to remove fake InstantSearch components
//const staticSearchBox = "",  staticInfiniteHits = "",  staticToggleRefinement = "", staticRefinementList = "";

export function run() {
  console.log("search");
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
