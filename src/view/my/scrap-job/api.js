import {backendUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function findScrapJobs() {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/my/scrap-job`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}
