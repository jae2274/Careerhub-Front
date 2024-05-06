import {backendUrl} from "~/const";
import {initPage} from "./store";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";
import {encodeQuery, decodeQuery} from "~/components/query/utils";

export async function findJobPostings(requestStr) {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/job_postings${requestStr || ""}`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}

export function createQuery(req, isPaging) {
  const parts = [];
  if (isPaging) {
    parts.push(`page=${req.page}&size=${req.size}`);
  }

  if (req.query) {
    parts.push(`encoded_query=${encodeQuery(req.query)}`);
  }

  const query = parts.join("&");

  return query ? `?${query}` : "";
}

export function scrap(site, postingId) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job`, {
    method: "POST",
    headers,
    body: JSON.stringify({site, postingId}),
  }).then(checkHttpStatus);
}

export function unscrap(site, postingId) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({site, postingId}),
  }).then(checkHttpStatus);
}

export function addTag(site, postingId, tag) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job/tags`, {
    method: "POST",
    headers,
    body: JSON.stringify({site, postingId, tag}),
  }).then(checkHttpStatus);
}

export function removeTag(site, postingId, tag) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job/tags`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({site, postingId, tag}),
  }).then(checkHttpStatus);
}
