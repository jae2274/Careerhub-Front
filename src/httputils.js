import {getCookie, setCookie} from "~/cookie.js";

export function setGrantTypeToCookie(grantType) {
  setCookie("grant_type", grantType);
}

export function getGrantTypeFromCookie() {
  return getCookie("grant_type");
}

export function setAccessTokenToCookie(accessToken) {
  setCookie("access_token", accessToken);
}

export function getAccessTokenFromCookie() {
  return getCookie("access_token");
}

export function setRefreshTokenToCookie(refreshToken) {
  setCookie("refresh_token", refreshToken);
}

export function getRefreshTokenFromCookie() {
  return getCookie("refresh_token");
}

export function setAccessTokenToHeader(header = {}) {
  const grantType = getGrantTypeFromCookie();
  const accessToken = getAccessTokenFromCookie();
  if (grantType && accessToken) {
    header.Authorization = `${grantType} ${accessToken}`;
  }
  return header;
}

export function checkHttpStatus(res) {
  if (res.status === 401) {
    window.location.href = "/#/login";
  }
}
