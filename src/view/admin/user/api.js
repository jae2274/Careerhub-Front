import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function getAllUsers() {
  return withAccessToken(`${authUrl}/auth/admin/user`);
}
