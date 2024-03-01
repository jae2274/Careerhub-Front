import {backend_url} from "~/const";

export async function getPostingDetail(postingId) {
  return await (await fetch(`${backend_url}/job_posting/${postingId}`)).json();
}
