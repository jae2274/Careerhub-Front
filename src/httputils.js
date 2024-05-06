import {getCookie, setCookie} from "~/cookie.js";

//TODO: jwt token 및 유저정보 등의 정보 저장에 대한 다른 방법을 찾아보자.
export function setUsernameToCookie(username) {
  setCookie("username", username);
}

export function getUsernameFromCookie() {
  return getCookie("username");
}

export function setRolesToCookie(roles) {
  setCookie("roles", roles.join(","));
}

export function getRolesFromCookie() {
  return getCookie("roles").split(",");
}

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
  } else if (res.status === 500) {
    alert("서버에러가 발생했습니다. 관리자에게 문의하세요.");
  }
}
