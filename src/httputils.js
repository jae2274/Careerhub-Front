import {getCookie, setCookie} from "~/cookie.js";
import {authUrl} from "~/const";
import {push} from "svelte-spa-router";

//TODO: jwt token 및 유저정보 등의 정보 저장에 대한 다른 방법을 찾아보자.
export function setUsernameToCookie(username) {
  setCookie("username", username);
}

export function isLogin() {
  return getCookie("username") ? true : false;
}

export function getUsernameFromCookie() {
  return getCookie("username");
}

export function setAuthoritiesToCookie(authorities) {
  setCookie("authorities", authorities.join(","));
}

export function getAuthoritiesFromCookie() {
  return getCookie("authorities").split(",");
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
    push("/login");
  } else if (res.status === 500) {
    alert("서버에러가 발생했습니다. 관리자에게 문의하세요.");
  }
}

export async function withAccessToken(url, retryForfail = true, req = {}) {
  req.headers = setAccessTokenToHeader(req.headers);
  const res = await fetch(url, req);
  if (res.status === 401) {
    if (retryForfail) {
      try {
        const httpStatus = await refreshAccessTokenSync();
        if (httpStatus === 200) {
          return await withAccessToken(url, false);
        } else if (httpStatus === 401) {
          push("/login");
        } else if (httpStatus === 500) {
          alert("서버에러가 발생했습니다. 관리자에게 문의하세요.");
        } else {
          alert("알수없는 에러가 발생했습니다. httpStatus: " + httpStatus);
        }
      } catch (e) {
        if (e.message === "refreshToken이 없습니다.") {
          push("/login");
        }
      }
    }
  } else if (res.status === 403) {
    if (window.location.href.includes("/#/my/authority")) {
      return;
    }

    alert("권한이 없습니다.");
    push("/my/authority");
  } else if (res.status === 500) {
    alert("서버에러가 발생했습니다. 관리자에게 문의하세요.");
  }

  try {
    return await res.json();
  } catch (e) {
    return;
  }
}

let isRefreshingToken = false;
let refreshSubscribers = [];

function waitForTokenRefresh() {
  if (!isRefreshingToken) return new Promise((resolve) => resolve(200));
  return new Promise((resolve) => {
    refreshSubscribers.push(resolve);
  });
}

async function refreshAccessTokenSync() {
  if (!isRefreshingToken) {
    isRefreshingToken = true;
    const httpStatus = await refreshAccessToken();
    isRefreshingToken = false;
    refreshSubscribers.forEach((resolve) => resolve(httpStatus)); // 모든 대기 중인 요청 재개
    refreshSubscribers = []; // 구독자 초기화

    return httpStatus;
  } else {
    // 갱신 중이면 대기
    return await waitForTokenRefresh();
  }
}

async function refreshAccessToken() {
  const refreshToken = getRefreshTokenFromCookie();

  if (refreshToken) {
    const res = await fetch(`${authUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({refreshToken}),
    });

    if (res.status === 200) {
      const {accessToken} = await res.json();
      setAccessTokenToCookie(accessToken);
    }

    return res.status;
  } else {
    throw new Error("refreshToken이 없습니다.");
  }
}
