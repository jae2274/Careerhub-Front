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
