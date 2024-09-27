import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function withdraw() {
  return withAccessToken(`${authUrl}/auth/withdrawal`, true, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
