import {backendUrl} from "~/const";
import {initPage} from "./store";
import {withAccessToken} from "~/httputils";
import {createEncodedQueryParam, decodeQuery} from "~/components/query/utils";

export async function findJobPostings(requestStr) {
  return withAccessToken(`${backendUrl}/job_postings${requestStr || ""}`);
}

export async function countJobPostings(requestStr) {
  return withAccessToken(`${backendUrl}/job_postings/count${requestStr || ""}`);
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
