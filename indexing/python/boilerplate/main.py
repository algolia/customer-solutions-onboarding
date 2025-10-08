import json
import logging
import requests

MOVIES_FILE_URL = "https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/movies.json"
ACTORS_FILE_URL = "https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/actors.json"
CATEGORIES_FILE_URL = "https://raw.githubusercontent.com/algolia/customer-solutions-onboarding/main/indexing/assets/categories.json"

# Step 1: Configure constants
# Visit https://dashboard.algolia.com/account/api-keys
INITIALS = "YOUR_INITIALS_HERE"
APP_ID = "YOUR_APP_ID"
API_KEY = "YOUR_API_KEY"

MOVIES_INDEX_NAME = f"{INITIALS}_movies"
ACTORS_INDEX_NAME = f"{INITIALS}_actors"
CATEGORIES_INDEX_NAME = f"{INITIALS}_categories"

print(f'Starting indexing script using APP ID "{APP_ID}", API_KEY "{API_KEY}", and main index "{MOVIES_INDEX_NAME}"')

if INITIALS == "YOUR_INITIALS_HERE":
    raise ValueError("Don't forget to set INITIALS")

# Step 2: Initialize your Algolia client here
# Add algoliasearch to project dependencies
# Import SearchClientSync and initialize the client
# See https://www.algolia.com/doc/libraries/sdk/install#python

# client = ...

# Step 3: Send all data to Algolia
# See https://www.algolia.com/doc/libraries/sdk/methods/search/save-objects
def send_to_algolia(index_name, file_url):
    # Read data from file_url
    try:
        response = requests.get(file_url)
        data = response.json()
    except Exception as e:
        logging.error(f"Failed to fetch or parse data: {e}")
        data = None

    # Add data to Algolia
    # CODE HERE 
    pass

# send_to_algolia(MOVIES_INDEX_NAME, MOVIES_FILE_URL)
# send_to_algolia(ACTORS_INDEX_NAME, ACTORS_FILE_URL)
# send_to_algolia(CATEGORIES_INDEX_NAME, CATEGORIES_FILE_URL)

# Step 4: Add or replace a single record
# See https://www.algolia.com/doc/libraries/sdk/methods/search/save-object
def replace_pulp_fiction_object():
    with open("./data/pulpfiction.json") as f:
        pulp_fiction = json.load(f)
    # CODE HERE
    pass

# replace_pulp_fiction_object()

# Step 5: Update a single attribute in a record
# See https://www.algolia.com/doc/libraries/sdk/methods/search/partial-update-object
def partial_update_pulp_fiction():
    with open("./data/pulpfiction.json") as f:
        pulp_fiction = json.load(f)

    # CODE HERE
    pass

# partial_update_pulp_fiction()

# Step 6: Delete a record
# See https://www.algolia.com/doc/libraries/sdk/methods/search/delete-object
def delete_object():
    # CODE HERE
    pass

# delete_object()


# Step 7: apply basic settings
# see https://www.algolia.com/doc/libraries/sdk/methods/search/set-settings
# see https://www.algolia.com/doc/api-reference/settings-api-parameters
def apply_settings():
    setting = {
        "searchableAttributes": ["title","actors","director","categories","overview"],
        "attributesForFaceting": ["searchable(categories)", "searchable(actors)", "searchable(director)"],
    }
    # CODE HERE
    pass

# apply_settings()

# Step 8: Use Algolia transformItems to modify records at indexing time
# You'll need first to create a push connector in the dashboard with your index as a destination and a custom transformation
# see https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push
# then push the records using the dedicated method
# see https://www.algolia.com/doc/libraries/sdk/methods/search/replace-all-objects-with-transformation
# /!\ Make sure to add the transformation region when initializing the client third parameter: { transformation: { region: "eu" }}
def send_task_to_ingestion_api():
    ingestion_client = IngestionClientSync(APP_ID, API_KEY, "us")
    # CODE HERE
    pass

# send_task_to_ingestion_api()

