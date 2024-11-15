import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function getAllUsers() {
  return withAccessToken(`${authUrl}/auth/admin/user`);
}

export async function addAuthorities(userId, authorities) {
  return withAccessToken(`${authUrl}/auth/admin/authority`, true, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      authorities: authorities,
    }),
  });
}

export async function removeAuthority(userId, authorityCode) {
  return withAccessToken(`${authUrl}/auth/admin/authority`, true, {
    method: "DELETE",
    body: JSON.stringify({
      userId: userId,
      authorityCode: authorityCode,
    }),
  });
}
