import {backendUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export function scrap(site, postingId) {
  return withAccessToken(`${backendUrl}/my/scrap-job`, true, {
    method: "POST",
    body: JSON.stringify({site, postingId}),
  });
}

export function unscrap(site, postingId) {
  return withAccessToken(`${backendUrl}/my/scrap-job`, true, {
    method: "DELETE",
    body: JSON.stringify({site, postingId}),
  });
}

export function addTag(site, postingId, tag) {
  return withAccessToken(`${backendUrl}/my/scrap-job/tags`, true, {
    method: "POST",
    body: JSON.stringify({site, postingId, tag}),
  });
}

export function removeTag(site, postingId, tag) {
  return withAccessToken(`${backendUrl}/my/scrap-job/tags`, true, {
    method: "DELETE",
    body: JSON.stringify({site, postingId, tag}),
  });
}
