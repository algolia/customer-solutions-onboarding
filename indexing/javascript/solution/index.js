const moviesFileURL =
  "https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/movies.json";
const actorsFileURL =
  "https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/actors.json";
const categoriesFileURL =
  "https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/categories.json";

/*
 * Step 1: Configure constants
 * visit https://dashboard.algolia.com/account/api-keys
 */

const INITIALS = "YOUR INITIALS HERE";
const APP_ID = "YOUR APP ID";
const API_KEY = "YOUR API KEY";
const moviesIndexName = `${INITIALS}_movies`;
const actorsIndexName = `${INITIALS}_actors`;
const categoriesIndexName = `${INITIALS}_categories`;

console.log(
  `Starting indexing script using APP ID "${APP_ID}", API_KEY "${API_KEY}" and main index "${moviesIndexName}"`
);

if (INITIALS === "YOUR INITIALS HERE") {
  throw new Error("Don't forget to set INITIALS");
}

/**
 * Step 2: initialize your Algolia Client here
 * add algoliasearch to project dependancies
 * import using require
 * initialize client
 * see https://www.algolia.com/doc/libraries/sdk/install#javascript
 */
const { algoliasearch } = require("algoliasearch");
const client = algoliasearch(APP_ID, API_KEY, {
  transformation: { region: "eu" },
});

/***
 * Step 3: send all data to Algolia
 * see https://www.algolia.com/doc/libraries/sdk/methods/search/save-objects
 */
async function sendToAlgolia(indexName, file) {
  //Read data from Github URL
  const data = await fetch(file)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  await client.saveObjects({ indexName, objects: data });

  console.log(`Indexed ${data.length} records to ${indexName}`);
}

//sendToAlgolia(moviesIndexName, moviesFileURL);
//sendToAlgolia(actorsIndexName, actorsFileURL);
//sendToAlgolia(categoriesIndexName, categoriesFileURL);

/**
 * Step 4: add or replace a single record
 * make a few changess to the record in pulpfiction.json and send it to Algolia
 * see https://www.algolia.com/doc/libraries/sdk/methods/search/save-object
 */
async function replacePulpFictionObject() {
  //read pulpfiction object from local file
  const pulpfiction = require("./data/pulpfiction.json");

  await client.saveObject({ indexName: moviesIndexName, body: pulpfiction });

  console.log(`Replaced record with objectID ${pulpfiction.objectID}`);
}

//replacePulpFictionObject();

/**
 * Step 5: Update a single attribute in a record
 * make a few changess to the record in pulpfiction.json and send it to Algolia
 * see https://www.algolia.com/doc/libraries/sdk/methods/search/partial-update-object
 */

async function partialUpdatePulpFictionObject() {
  //read pulpfiction object from local file
  const pulpfiction = require("./data/pulpfiction.json");

  await client.partialUpdateObject({
    indexName: moviesIndexName,
    objectID: pulpfiction.objectID,
    attributesToUpdate: { vote_average: 10 },
  });

  console.log(`Partially updated record with objectID ${pulpfiction.objectID}`);
}

//partialUpdatePulpFictionObject();

/**
 * Step 6: delete a single record
 * see https://www.algolia.com/doc/libraries/sdk/methods/search/delete-object
 */
async function deleteSingleObject() {
  const objectID = "9994";

  await client.deleteObject({ indexName: moviesIndexName, objectID });

  console.log(`Deleted record with objectID ${objectID}`);
}

//deleteSingleObject();

/**
 * Step 7: apply basic settings
 * see https://www.algolia.com/doc/libraries/sdk/methods/search/set-settings
 * see https://www.algolia.com/doc/api-reference/settings-api-parameters
 */
async function applySettings() {
  const settings = {
    searchableAttributes: [
      "title",
      "actors",
      "director",
      "categories",
      "overview",
    ],
    attributesForFaceting: [
      "searchable(actors)",
      "searchable(categories)",
      "searchable(genres)",
      "searchable(directors)",
      "searchable(categoryPageIdentifiers)",
      "on_sale",
    ],
  };

  await client.setSettings({
    indexName: moviesIndexName,
    indexSettings: settings,
  });

  console.log(`Applied settings ${JSON.stringify(settings)}`);
}

//applySettings();

/**
 * Step 8: Use Algolia transformItems to modify records at indexing time
 * You'll need first to create a push connector in the dashboard with your index as a destination and a custom transformation
 * see https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push
 * then push the records using the dedicated method
 * see https://www.algolia.com/doc/libraries/sdk/methods/search/replace-all-objects-with-transformation
 * /!\ Make sure to add the transformation region when initializing the client third parameter: { transformation: { region: "eu" }}
 */
async function sendToAlgoliaWithTransformation(indexName, file) {
  //Read data from Github URL
  const data = await fetch(file)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  await client.replaceAllObjectsWithTransformation({
    indexName,
    objects: data,
  });

  console.log(`Indexed ${data.length} records to ${indexName}`);
}

// sendToAlgoliaWithTransformation(moviesIndexName, moviesFileURL);
