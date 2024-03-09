import {backendUrl} from "~/const";
import {initPage} from "./store";

export async function findJobPostings(requestStr) {
  return await (
    await fetch(`${backendUrl}/job_postings${requestStr || ""}`)
  ).json();
}

export async function category() {
  return await (await fetch(`${backendUrl}/categories`)).json();
}

export async function getSkills() {
  return await (await fetch(`${backendUrl}/skills`)).json();
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
