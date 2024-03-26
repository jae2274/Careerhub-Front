import {getCookie} from "~/cookie.js";

export function getGrantType() {
  return getCookie("grant_type");
}

export function getAccessToken() {
  return getCookie("access_token");
}

export function getRefreshToken() {
  return getCookie("refresh_token");
}
