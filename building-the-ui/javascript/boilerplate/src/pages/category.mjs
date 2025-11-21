import staticInfiniteHits from "../components/staticInfiniteHits.mjs";
import staticToggleRefinement from "../components/staticToggleRefinement.mjs";
import staticRefinementList from "../components/staticRefinementList.mjs";

//remove imports and uncomment the following lines to remove fake InstantSearch components
//const staticInfiniteHits = "",  staticToggleRefinement = "", staticRefinementList = "";

export function run(args) {
  const categoryPageIdentifier =
    args.lvl0 + (args.lvl1 ? " > " + args.lvl1 : "");
  document.getElementById("categoryName").innerHTML = categoryPageIdentifier;
}

export const template = `
<div>
  <h1 id="categoryName" class="text-3xl md:text-5xl font-bold mb-4">Category</h1>
  <div class="flex flex-col md:flex-row gap-8">
    <div class="hidden md:block w-64 flex-shrink-0">
      <div class="bg-[#1f1f1f] p-4 rounded-md">
        <div>
          <h3 class="text-lg font-semibold mb-2">Actors</h3>
          ${staticRefinementList}   
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Genres</h3>
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
`;
