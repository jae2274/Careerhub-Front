import {backendUrl} from "~/const";
import {initPage} from "./store";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";
import {createEncodedQueryParam, decodeQuery} from "~/components/query/utils";

export async function findJobPostings(requestStr) {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/job_postings${requestStr || ""}`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}

export async function countJobPostings(requestStr) {
  const headers = setAccessTokenToHeader();
  const res = await fetch(
    `${backendUrl}/job_postings/count${requestStr || ""}`,
    {
      headers,
    }
  );
  checkHttpStatus(res);

  return await res.json();
}

export function createUrlParams(req) {
  const parts = [];
  parts.push(`page=${req.page}&size=${req.size}`);

  if (req.query) {
    parts.push(`encoded_query=${createEncodedQueryParam(req.query)}`);
  }

  const query = parts.join("&");

  return query ? `?${query}` : "";
}

export function createUrlParamsForCount(query) {
  if (query) {
    return `?encoded_query=${createEncodedQueryParam(query)}`;
  }

  return "";
}
