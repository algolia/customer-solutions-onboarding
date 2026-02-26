const fakeHit = {
  objectID: 1234,
  title: "Movie Title",
  price: 9.99,
  poster: "https://placehold.co/500x750?text=poster",
};

export default (name, url, hits) => {
  if (!hits) {
    hits = [fakeHit, fakeHit, fakeHit];
  }

  return `<section>
  <a href="${url}"
    ><h2>${name} &gt;</h2></a
  >
  <div class="carrousel ais-InfiniteHits">
  <ol class="ais-InfiniteHits-list">
    ${hits.map((hit) => {
      return ` <li class="ais-InfiniteHits-item">
          <div>
            <a href="/movie/1234"
              ><img
                src="${hit.poster}"
                width="100%"
              />
              <h2>${hit.title}</h2>
              <p>${hit.price}</p>
              <button class="addToCard">Add to watch list</button></a
            >
          </div>
        </li>`;
    })}
  </ul>
</section>
`;
};
