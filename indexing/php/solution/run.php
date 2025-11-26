<?php
require_once realpath(__DIR__ . "/vendor/autoload.php");

use Algolia\AlgoliaSearch\Api\SearchClient;
use Algolia\AlgoliaSearch\Configuration\SearchConfig;

define('MOVIES_FILE_URL', 'https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/movies.json');
define('ACTORS_FILE_URL', 'https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/actors.json');
define('CATEGORIES_FILE_URL', 'https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/categories.json');
define('PULP_FICTION_FILE_URL', './data/pulpfiction.json');

// Step 1: Configure constants
// visit https://dashboard.algolia.com/account/api-keys
define('INITIALS', '<Your Initials>');
define('APP_ID', '');
define('WRITE_API_KEY', '');

$moviesIndexName = INITIALS . '_movies';
$actorsIndexName = INITIALS . '_actors';
$categoriesIndexName = INITIALS . '_categories';

if (INITIALS === '<Your Initials>') {
  throw new Exception('Don\'t forget to set INITIALS.');
}

// Step 2 - initialize your Algolia Client here
// Add Algolia PHP SDK to your project
// Initialize the client
// Documentation: https://www.algolia.com/doc/libraries/sdk/install#php
$config = SearchConfig::create(APP_ID, WRITE_API_KEY);
$config->setTransformationRegion('eu');
$client = SearchClient::createWithConfig($config);

// Step 3 - send all data to Algolia
// see see https://www.algolia.com/doc/libraries/sdk/methods/search/save-objects
function send_to_algolia(string $indexName, string $dataFileUrl) {
  global $client;

  // Read data from URL
  $dataJson = file_get_contents($dataFileUrl);
  $data = json_decode($dataJson, true);
  $client->saveObjects($indexName, $data);

  printf("%s records sent to %s\n",count($data),$indexName);
}

//send_to_algolia($moviesIndexName, MOVIES_FILE_URL);
//send_to_algolia($actorsIndexName, ACTORS_FILE_URL);
//send_to_algolia($categoriesIndexName, CATEGORIES_FILE_URL);


// Step 4 - Add or replace a single record
// make a few changess to the record in pulpfiction.json and send it to Algolia
// see https://www.algolia.com/doc/libraries/sdk/methods/search/save-object
function replace_pulp_fiction_record() {
  global $client, $moviesIndexName;

  $pulpFictionJson = file_get_contents(PULP_FICTION_FILE_URL);
  $pulpFiction = json_decode($pulpFictionJson, true);

  $response = $client->addOrUpdateObject($moviesIndexName, $pulpFiction['objectID'], $pulpFiction);

  printf("Replaced record with objectID  %s\n",$pulpFiction['objectID']);
}

//replace_pulp_fiction_record();


// Step 5 - Update a single attribute in a record
// Documentation: https://www.algolia.com/doc/libraries/php/v4/methods/search/partial-update-object/?client=php
function partial_update_pulp_fiction_record() {
  global $client, $moviesIndexName;

  $pulpFictionJson = file_get_contents(PULP_FICTION_FILE_URL);
  $pulpFiction = json_decode($pulpFictionJson, true);
  $objectID = $pulpFiction['objectID'];

  $response = $client->partialUpdateObject($moviesIndexName, $pulpFiction['objectID'], [
    'vote_count' => 100000,
    'baz' => false
  ]);

  printf("Partially updated record with objectID  %s\n",$objectID);
}

//partial_update_pulp_fiction_record();


// Step 6 - Delete a Record
// Documentation: https://www.algolia.com/doc/libraries/php/v4/methods/search/delete-object/?client=php
function delete_record() {
  global $client, $moviesIndexName;

  $objectID = "680";

  $response = $client->deleteObject($moviesIndexName, $objectID);

  printf("Deleted record with objectID  %s\n",$objectID);
}

//delete_record();


// Step 7 - Update Settings of Index
// Documentation: https://www.algolia.com/doc/libraries/php/v4/methods/search/set-settings/?client=php
function update_index_settings() {
  global $client, $moviesIndexName;

  $response = $client->setSettings($moviesIndexName, [
    "searchableAttributes"=> [
      "title",
      "actors",
      "director",
      "categories",
      "overview",
    ],
    "attributesForFaceting"=> [
      "searchable(actors)",
      "searchable(categories)",
      "searchable(genres)",
      "searchable(directors)",
      "searchable(categoryPageIdentifiers)",
      "on_sale",
    ],
  ], forwardToReplicas: false);

  printf("Applied settings to  %s\n",$moviesIndexName);
}

//update_index_settings();



// Step 9: Use Algolia transformItems to modify records at indexing time
// You'll need first to create a push connector in the dashboard with your index as a destination and a custom transformation
// see https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push
// then push the records using the dedicated method
// see https://www.algolia.com/doc/libraries/sdk/methods/search/replace-all-objects-with-transformation
// You'll need to instanciate the client with a Search Config
// + use Algolia\AlgoliaSearch\Configuration\SearchConfig;
// $config = SearchConfig::create(APP_ID, WRITE_API_KEY);
// $config->setTransformationRegion('eu');
// $client = SearchClient::createWithConfig($config);

function send_to_algolia_with_transformation() {
  //$client = IngestionClient::create(APP_ID, '<API key>', 'eu');

  global $client, $moviesIndexName;

  // Read data from URL
  $dataJson = file_get_contents(MOVIES_FILE_URL);
  $data = json_decode($dataJson, true);
  
  $client->replaceAllObjectsWithTransformation($moviesIndexName,$data);

  printf("Data sent to %s\n",$moviesIndexName);
}

//send_to_algolia_with_transformation();

print("====\nThe script is now complete.\n");