import {backendUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export function scrap(site, postingId) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job`, {
    method: "POST",
    headers,
    body: JSON.stringify({site, postingId}),
  }).then(checkHttpStatus);
}

export function unscrap(site, postingId) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({site, postingId}),
  }).then(checkHttpStatus);
}

export function addTag(site, postingId, tag) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job/tags`, {
    method: "POST",
    headers,
    body: JSON.stringify({site, postingId, tag}),
  }).then(checkHttpStatus);
}

export function removeTag(site, postingId, tag) {
  const headers = setAccessTokenToHeader();
  return fetch(`${backendUrl}/my/scrap-job/tags`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({site, postingId, tag}),
  }).then(checkHttpStatus);
}
