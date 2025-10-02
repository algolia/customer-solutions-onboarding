const moviesFileURL =
  "https://drive.google.com/uc?export=download&id=1OX0jPyghq22U_mrO_hFXE5gPZYXMpSSv";
const actorsFileURL =
  "https://drive.google.com/uc?export=download&id=1yL4ewDieihPVZBfUKIOwt0X8cOVmRS33";
const categoriesFileURL =
  "https://drive.google.com/uc?export=download&id=1L24oS5BHf5iN0-d4_TDFP5AHINN0elET";

const pulpfiction = require("./data/pulpfiction.json");

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
 * see https://www.algolia.com/doc/libraries/javascript/v5/
 */
// const { algoliasearch } = require("");
// const client = :

/***
 * Step 3: send all data to Algolia
 * see https://ww.algolia.com/doc/Libraries/javascript/v5/helpers/#save-records
 */
async function sendToAlgolia(indexName, file) {
  //Read data from Github URL
  const data = await fetch(file)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  //Add data to Algolia
  // CODE HERE
  console.log(`Indexed ${data.length} records to ${indexName}`);
}

// sendToAlgolia (moviesIndexName, moviesFileURL);
// sendToAlgolia(actorsIndexName, actorsFileURL);
// sendToAlgolia(categoriesIndexName, categoriesFileURL);

/**
 * Step 4: add or replace a single record
 * see https://www.algolia.com/doc/Libraries/javascript/v5/methods/search/save-object/
 */
async function replacePulpFictionObject() {
  //pulpfiction object is imported above
  // CODE HERE
  console.log(`Replaced record with objectID ${pulpfiction.objectID}`);
}

//replacePulpFictionObject();

/**
 * Step 5: delete a single record
 * see https://www.algolia.com/doc/Libraries/javascript/v5/methods/search/delete-object/
 */
async function deleteSingleObject() {
  const objectID = "123456";
  // CODE HERE
  console.log(`Deleted record with objectID ${objectID}`);
}

//deleteSingleObject();
