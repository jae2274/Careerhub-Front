import {backendUrl} from "~/const";

export async function getPostingDetail(postingId) {
  return await (await fetch(`${backendUrl}/job_posting/${postingId}`)).json();
}
