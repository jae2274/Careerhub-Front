import {backendUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function findScrapJobs(tag = null) {
  const headers = setAccessTokenToHeader();

  const query = tag ? `?tag=${encodeURIComponent(tag)}` : "";

  const res = await fetch(`${backendUrl}/my/scrap-job${query}`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}

export async function findAllScrapTags() {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/my/scrap-job/tags`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}

export async function findUntaggedScrapJobs() {
  const headers = setAccessTokenToHeader();

  const res = await fetch(`${backendUrl}/my/scrap-job/untagged`, {
    headers,
  });
  checkHttpStatus(res);

  return await res.json();
}
