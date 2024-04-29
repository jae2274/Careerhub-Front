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

export function parseQuery(queryString) {
  const queryParams = new URLSearchParams(queryString);

  const encodedQuery = queryParams.get("encoded_query");

  return encodedQuery && encodedQuery.length > 0
    ? decodeQuery(encodedQuery)
    : {};
}

function split(listStr) {
  return listStr.split(",");
}
function isNotEmpty(list) {
  return list && list.length > 0;
}
