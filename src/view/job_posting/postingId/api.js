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
