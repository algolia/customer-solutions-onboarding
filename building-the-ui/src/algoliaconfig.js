const APPID = "DPSO8Y4P4F";
const API_KEY = "1e27d150ddaca332b604f871b7e2d595";
const INDEX_PREFIX = "DEMO";

export default {
  APPID,
  API_KEY,
  moviesIndexName: `${INDEX_PREFIX}_movies`,
  categoriesIndexName: `${INDEX_PREFIX}_categories`,
  actorsIndexName: `${INDEX_PREFIX}_actors`,
  querySuggestionsIndexName: `${INDEX_PREFIX}_movies_query_suggestions`,
};
