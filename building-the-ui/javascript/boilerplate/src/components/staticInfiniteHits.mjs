import hitComponent from "./hit";

export default `
<div class="ais-InfiniteHits">
<ol class="ais-InfiniteHits-list">
  ${Array(20)
    .fill(null)
    .map((el) => `<li class="ais-InfiniteHits-item">${hitComponent()}</li>`)
    .join("")}
  </li>
</ol>
<button class="ais-InfiniteHits-loadMore">
  Show more results
</button>
</div>


`;
