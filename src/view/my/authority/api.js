import {authUrl} from "~/const";
import {
  withAccessToken,
  setAccessTokenToCookie,
  setAuthoritiesToCookie,
} from "~/httputils";

export async function getAuthorities() {
  return withAccessToken(`${authUrl}/auth/authority`);
}

export async function getTicketInfo(ticketCode) {
  return withAccessToken(`${authUrl}/auth/ticket?ticket_code=${ticketCode}`);
}

export async function useTicket(ticketCode) {
  return await withAccessToken(`${authUrl}/auth/ticket/${ticketCode}`, true, {
    method: "PATCH",
  });
}
