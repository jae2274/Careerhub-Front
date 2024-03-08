import {backendUrl} from "~/const";

export async function getPostingDetail(site, postingId) {
  return await (
    await fetch(`${backendUrl}/job_postings/${site}/${postingId}`)
  ).json();
}
