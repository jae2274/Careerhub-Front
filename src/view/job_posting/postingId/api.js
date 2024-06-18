import {backendUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function getPostingDetail(site, postingId) {
  return withAccessToken(`${backendUrl}/job_postings/${site}/${postingId}`);
}

export async function getReviews(companyName, page, size) {
  return withAccessToken(
    `${backendUrl}/company-review/reviews?page=${
      page - 1
    }&size=${size}&companyName=${encodeURIComponent(companyName)}`
  );
}
