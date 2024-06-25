import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function getAuthorities() {
  return withAccessToken(`${authUrl}/auth/authority`);
}
