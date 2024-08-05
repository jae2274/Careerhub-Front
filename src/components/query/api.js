import {backendUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function category() {
  return withAccessToken(`${backendUrl}/categories`);
}

export async function getSkills() {
  return withAccessToken(`${backendUrl}/skills`);
}

export async function findCompanies(keyword) {
  return withAccessToken(`${backendUrl}/companies?keyword=${keyword}`);
}
