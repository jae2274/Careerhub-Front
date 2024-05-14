export function createEncodedQueryParam(query) {
  return encodeURIComponent(encodeQuery(query));
}

function encodeQuery(query) {
  return base64Encode(query);
}

export function decodeQuery(encodedQuery) {
  return base64Decode(encodedQuery);
}

function base64Encode(obj) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

function base64Decode(str) {
  return JSON.parse(decodeURIComponent(escape(atob(str))));
}

export function parseQuery(queryString) {
  const queryParams = new URLSearchParams(queryString);

  const encodedQuery = queryParams.get("encoded_query");

  return encodedQuery && encodedQuery.length > 0
    ? decodeQuery(encodedQuery)
    : {};
}
