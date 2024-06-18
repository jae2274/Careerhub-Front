import {backendUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function findScrapJobs(tag = null) {
  const query = tag ? `?tag=${encodeURIComponent(tag)}` : "";

  return withAccessToken(`${backendUrl}/my/scrap-job${query}`);
}

export async function findAllScrapTags() {
  return withAccessToken(`${backendUrl}/my/scrap-job/tags`);
}

export async function findUntaggedScrapJobs() {
  return withAccessToken(`${backendUrl}/my/scrap-job/untagged`);
}
