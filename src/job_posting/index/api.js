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
    parts.push(
      `encoded_query=${btoa(unescape(encodeURIComponent(JSON.stringify(req))))}`
    );
  }

  const query = parts.join("&");

  return query ? `?${query}` : "";
}

export function parseQuery(queryString) {
  const queryParams = new URLSearchParams(queryString);

  return {
    page: initPage,
    size: 16,
    categories: queryParams.getAll("category").flatMap(split).map(Number),
    skillNames: queryParams.getAll("skill").flatMap(split),
    tagIds: queryParams.getAll("tag").flatMap(split).map(Number),
    minCareer: Number(queryParams.get("minCareer")),
    maxCareer: Number(queryParams.get("maxCareer")),
  };
}

function split(listStr) {
  return listStr.split(",");
}
function isNotEmpty(list) {
  return list && list.length > 0;
}
