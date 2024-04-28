import {backendUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function category() {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/categories`, {headers});
  checkHttpStatus(res);

  return await res.json();
}

export async function getSkills() {
  const headers = setAccessTokenToHeader();
  const res = await fetch(`${backendUrl}/skills`, {headers});
  checkHttpStatus(res);

  return await res.json();
}
