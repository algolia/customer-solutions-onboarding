# Algolia Building the UI training

In this training we will learn how to implement Algolia in your website. We will cover

* how to implement InstantSearch using InstantSearch JS Library
    * for search
    * for category pages
* how to implement Autocomplete.js
* how to send events to Algolia
* how to implement Recommend carrousels

This project is a single page application vanilla JS Algoflix with pages for home, search, category pages and movie detail page. In order to have a navigation we used a simple vanilla JS router (navigo). Each page has its own js file in `src/pages/` with a template and a run method that will be executed at page load.


## Let's get started

first, update `src/algoliaconfig.js` with your credentials.

## Building the search page

Start implementing InstantSearch in the run method of `src/pages/search.mjs`

You will need to

* Add Agolia Client (algoliasearch version >5 ) and Algolia InstantSearch Libraries (instantsearch.js > 4.77) using the dependency explorer of codesanbox.io 
* Import and Instantiate [Algolia Client](https://www.algolia.com/doc/guides/building-search-ui/installation/js/#with-a-packaging-system), import algoliaConfig to retrieve your credentials
* Continue by instantiating [InstantSearch](https://www.algolia.com/doc/api-reference/widgets/instantsearch/js/), don't forget to start the search `search.start()`
* Add widgets to your search
    * [SearchBox](https://www.algolia.com/doc/api-reference/widgets/search-box/js/) for #searchbox div
    * [InfiniteHits](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/js/) for #hits container 
        * define the [item template](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/js/#widget-param-item) (use the HTML of a single movie as a template)
    * [RefinementList](https://www.algolia.com/doc/api-reference/widgets/refinement-list/js/) for attributes
        * actors (#actors)
        * genres (#genres)
        * director (#director)
    * [ToggleRefinement](https://www.algolia.com/doc/api-reference/widgets/toggle-refinement/js/) (#on_sales)
* Make the actors facet searchable
* Make the search page state part or URL for navigation using single index state mapping [see guide](https://www.algolia.com/doc/api-reference/widgets/single-index-state-mapping/js/#examples)
* Create a sort by release date replica and add a [SortBy](https://www.algolia.com/doc/api-reference/widgets/sort-by/js/) widget to your search page
* Implements [ruleContexts](https://www.algolia.com/doc/api-reference/api-parameters/ruleContexts/) with "search" using the [Configure](https://www.algolia.com/doc/api-reference/widgets/configure/js/) component

Tips:

* make sure your attributes are defined as facets


## (advanced) Building the category page

Reusue your learnings and the code from Search to implement category page in `src/pages/category.mjs`

Category identifier (attribute categoryPageIdentifiers in your index) is passed from URL. For now, use the home page carousel links to navigate to some of those pages.

* Add the required filter to your Configure Component
* Implements [ruleContexts](https://www.algolia.com/doc/api-reference/api-parameters/ruleContexts/) with "category-page" + the category identifier

Tips:

* make sure the categoryPageIdentifiers attribute is set as facet (searchable)

## (advanced) Using DynamicWidgets

Encapsulate in you category and search the hardcoded refinement widgets by [DynamicWidgets](https://www.algolia.com/doc/api-reference/widgets/dynamic-facets/react/)

Tips:

Don't forget to define an initial facet display configuration in the index configuration

## (advanced) Adding Autocomplete to your site

* using dependencies manager include:
    * @algolia/autocomplete-js
    * @algolia/
* empty the #autocomplete container in `index.html`
* in `src/components/autocomplete.js`
    *  [initialize](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/getting-started/#defining-where-to-put-your-autocomplete) autocomplete librairy using it
    * connect Autocomplete with search using [onSubmit](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-onsubmit) parameter 
    * add your movies index as a first source using [getAlgoliaResults](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/getAlgoliaResults/) preset
    * add your categories index as a second source using [getAlgoliaResults](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-preset-algolia/getAlgoliaResults/) preset
    * add [recent searches plugin](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/adding-recent-searches/)
        * add dependency (@algolia/autocomplete-plugin-recent-searches)
        * add the plugin
    * open on click using `openOnFocus` parameter

Tips:

* ensure your search has a router enable (`singleIndex`) and navigate to `search?query=XXX` on submit action
* if already on search page use navigate(0) to force refresh of Search component

#### Adding a query suggestion index

1. create a query suggestion index from the dashboad
    * go to the [query suggestion](https://dashboard.algolia.com/query-suggestions) dashboard page
    * create a new index with your movies index as a source
    * force the creation of suggestions on [facets values](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/query-suggestions/react/#augment-query-suggestions-with-facet-data) from actors and directors
2. (Note: possible bug if click analytcis not enabled) add [query suggestion plugin](https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-plugin-query-suggestions/createQuerySuggestionsPlugin/)
    * add dependency (@algolia/autocomplete-plugin-query-suggestion)
    * add the plugin

#### Multi state autocomplete

What has been designed is fine for as you type result but we would like a different list of sources when the search is emply.

* create a state with only recent searches and query suggestions when [query is empty](https://www.algolia.com/doc/ui-libraries/autocomplete/guides/implementing-multiple-search-states/)

## Sending events

* Enable analytics with `insights={true}` on search [InstantSearch component](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/#widget-param-insights). Look at your network tab and see how Algolia automatically loads Insights Library.
* Include [Algolia Insights Library](https://www.algolia.com/doc/api-client/methods/insights/?client=javascript#include-the-insights-client-in-your-html) as part of main `index.html`
* [Initialize it](https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/#widget-param-insights) using AppID and key + [`useCookie:true`](https://www.algolia.com/doc/api-reference/api-methods/init/)
* add a [Viewed event](https://www.algolia.com/doc/api-reference/api-methods/viewed-object-ids/) when landing on Movie detail page `src/pages/movie.mjs`
* add the conversion event when clickin on watch. Either a simple [conversion](https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids/) if no queryID or a [conversion after search](https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids-after-search/)
* Include [AnalyticsTags](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) to the Configure Component in search and category pages


TIPS:

* Your insights API key can be any API key with acces to any index including non existng ones (security tip)!

## Carousels

* Implements homepage carousels using manually buit multiple queries request and the [`search`](https://www.algolia.com/doc/rest-api/search/#tag/Search/operation/search) method from the client

