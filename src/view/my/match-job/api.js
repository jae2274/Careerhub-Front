import {backendUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function getMatchJob() {
  const res = await fetch(`${backendUrl}/my/match-job`, {
    method: "GET",
    headers: setAccessTokenToHeader(),
  });

  checkHttpStatus(res);

  return await res.json();
}

export async function addCondition(condition) {
  const res = await fetch(`${backendUrl}/my/match-job/condition`, {
    method: "POST",
    headers: setAccessTokenToHeader(),
    body: JSON.stringify(condition),
  });

  checkHttpStatus(res);

  return await res.json();
}

export async function updateCondition(condition) {
  const res = await fetch(`${backendUrl}/my/match-job/condition`, {
    method: "PUT",
    headers: setAccessTokenToHeader(),
    body: JSON.stringify(condition),
  });

  checkHttpStatus(res);

  return await res.json();
}
