import {backendUrl} from "~/const";
import {initPage} from "./store";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function findJobPostings(requestStr) {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/job_postings${requestStr || ""}`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}

export async function category() {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/categories`, {headers});
  checkHttpStatus(res);

  return await res.json();
}

export async function getSkills() {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/skills`, {headers});
  checkHttpStatus(res);

  return await res.json();
}

export function createQuery(req, isPaging) {
  const parts = [];
  if (isPaging) {
    parts.push(`page=${req.page}&size=${req.size}`);
  }

  if (req) {
    parts.push(`encoded_query=${encodeURIComponent(base64Encode(req))}`);
  }

  const query = parts.join("&");

  return query ? `?${query}` : "";
}

export function parseQuery(queryString) {
  const queryParams = new URLSearchParams(queryString);

  const encodedQuery = queryParams.get("encoded_query");
  const req =
    encodedQuery && encodedQuery.length > 0 ? base64Decode(encodedQuery) : {};

  req.page = initPage;
  req.size = 16;
  req.categories = req.categories || [];
  req.skillNames = req.skillNames || [];
  req.tagIds = req.tagIds || [];

  return req;
}

function base64Encode(obj) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

function base64Decode(str) {
  return JSON.parse(decodeURIComponent(escape(atob(str))));
}

function split(listStr) {
  return listStr.split(",");
}
function isNotEmpty(list) {
  return list && list.length > 0;
}
