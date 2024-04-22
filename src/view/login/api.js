import {authUrl} from "~/const";
import {setAccessTokenToHeader, checkHttpStatus} from "~/httputils";

export async function getAuthCodeUrls() {
  const res = await fetch(`${authUrl}/auth/auth-code-urls`, {
    mode: "cors",
    credentials: "include",
  });
  checkHttpStatus(res);

  return await res.json();
}

export async function signIn(authToken) {
  const res = await fetch(`${authUrl}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({authToken}),
    mode: "cors",
    credentials: "include",
  });
  checkHttpStatus(res);

  return await res.json();
}

export async function signUp(authToken, username, agreements) {
  const res = await fetch(`${authUrl}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({authToken, username, agreements}),
    mode: "cors",
    credentials: "include",
  });

  if (res.status != 201) {
    return await Promise.reject("Failed to sign up");
  }

  return await Promise.resolve();
}
