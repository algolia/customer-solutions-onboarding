import { connectSearchBox } from "instantsearch.js/es/connectors";

const renderVirtualSearchBox = (renderOptions, isFirstRender) => {
  const { query, refine, clear, isSearchStalled, widgetParams } = renderOptions;

  const container = document.querySelector(widgetParams.container);
  console.log(container);
  if (isFirstRender) {
    const title = document.createElement("h1");
    title.setAttribute("class", "text-3xl md:text-5xl font-bold mb-4");
    container.appendChild(title);
  }

  container.querySelector("h1").innerHTML = query
    ? `Search for ${query}`
    : "All movies";
};

// Create custom widget
const virtualSearchBox = connectSearchBox(renderVirtualSearchBox);

export default virtualSearchBox;
