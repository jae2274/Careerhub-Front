import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function getAllAuthorities() {
  return withAccessToken(`${authUrl}/auth/admin/authority`);
}
