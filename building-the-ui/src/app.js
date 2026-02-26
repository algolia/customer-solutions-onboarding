// Vanilla JS Router
import autocomplete from "./components/autocomplete";
import Navigo from "navigo";
import pages from "./pages";

const router = new Navigo("/");

const displayPage = (page, args) => {
  document.getElementById("app").innerHTML = pages[page].template;
  pages[page].run(args);
};

router.on("/", () => {
  displayPage("home");
});

router.on("/search", () => {
  displayPage("search");
});

router.on("/category/:lvl0", ({ data }) => {
  displayPage("category", data);
});

router.on("/category/:lvl0/:lvl1", ({ data }) => {
  displayPage("category", data);
});

router.on("/movie/:movieID", ({ data }) => {
  displayPage("movie", data);
});

router.notFound(() => {
  document.getElementById("app").innerHTML =
    "no route for " + window.location.pathname;
});

router.resolve();

autocomplete();
