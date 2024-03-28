import {backendUrl} from "~/const";
import {getGrantType, getAccessToken} from "~/jwt";

function setAccessToken(header = {}) {
  const grantType = getGrantType();
  const accessToken = getAccessToken();
  if (grantType && accessToken) {
    header.Authorization = `${grantType} ${accessToken}`;
  }
  return header;
}

function checkHttpStatus(res) {
  if (res.status === 401) {
    window.location.href = loginUrl;
  }
}

export async function getPostingDetail(site, postingId) {
  const headers = setAccessToken();
  return await (
    await fetch(`${backendUrl}/job_postings/${site}/${postingId}`, {headers})
  ).json();
}
