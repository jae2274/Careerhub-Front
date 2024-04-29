export function encodeQuery(query) {
  return encodeURIComponent(base64Encode(query));
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
