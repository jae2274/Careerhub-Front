import {backendUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function getPostingDetail(site, postingId) {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/job_postings/${site}/${postingId}`, {
    headers,
  });
  checkHttpStatus(res);
  return await res.json();
}

export async function getReviews(companyName, page, size) {
  const headers = setAccessTokenToHeader();
  const res = await fetch(
    `${backendUrl}/company-review/reviews?page=${
      page - 1
    }&size=${size}&companyName=${encodeURIComponent(companyName)}`,
    {
      headers,
    }
  );
  checkHttpStatus(res);
  return await res.json();
}
