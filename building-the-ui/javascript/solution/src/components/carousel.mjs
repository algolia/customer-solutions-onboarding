import fakeHit from "../fakeHit";
import hitComponent from "./hit";

export default (name, url, hits) => {
  hits = hits || [fakeHit, fakeHit, fakeHit, fakeHit];

  return `<section class="mb-8">
  <a href="${url}"
    ><h2 class="text-xl font-semibold mb-4">${name} &gt;</h2></a
  >
  
  <ul class="grid grid-cols-2  lg:grid-cols-4 gap-4">
    ${hits
      .map((hit) => {
        return ` <li>
          ${hitComponent(hit)}
        </li>`;
      })
      .join("")}
  </ul>
  </section>
`;
};
