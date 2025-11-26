import fakeHit from "../fakeHit";

export default (hit, html, sendEvent) => {
  hit = hit || fakeHit;
  hit.url = `/movie/${hit.objectID}`;

  if (!html) {
    // out of InstantSearch template
    return `<div
        class="relative aspect-video rounded-md overflow-hidden group cursor-pointer transition-transform duration-200 ease-out hover:scale-105"
      >
        <a href="${hit.url}">
          <img
            src="${hit.backdrop}"
            class="w-full h-full object-cover"
            width="100%"
          />
          <div
            class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center"
          >
            <h3 class="text-white font-bold text-lg mb-1">${hit.title}</h3>
            <p class="text-white/80 text-sm mb-3">$${hit.price}</p>
            <button
              class="bg-[#17012c] hover:bg-red-700 text-white text-sm py-1 px-4 rounded-md flex items-center transition-colors cursor-pointer"
              onClick="event.preventDefault()"
            >
              Add to watch list
            </button>
          </div>
        </a>
      </div>`;
  } else {
    const handleAddToWatchList = (event) => {
      sendEvent("conversion", hit, "Product Added to Watch List");
      event.preventDefault();
    };

    return html`<div
      class="relative aspect-video rounded-md overflow-hidden group cursor-pointer transition-transform duration-200 ease-out hover:scale-105"
    >
      <a href="${hit.url}">
        <img
          src="${hit.backdrop}"
          class="w-full h-full object-cover"
          width="100%"
        />
        <div
          class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center"
        >
          <h3 class="text-white font-bold text-lg mb-1">${hit.title}</h3>
          <p class="text-white/80 text-sm mb-3">$${hit.price}</p>
          <button
            class="bg-[#17012c] hover:bg-red-700 text-white text-sm py-1 px-4 rounded-md flex items-center transition-colors cursor-pointer"
            onClick="${handleAddToWatchList}"
          >
            Add to watch list
          </button>
        </div>
      </a>
    </div>`;
  }
};
