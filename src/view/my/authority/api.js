import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function getAuthorities() {
  return withAccessToken(`${authUrl}/auth/authority`);
}

export async function getTicketInfo(ticketCode) {
  return withAccessToken(`${authUrl}/auth/ticket/${ticketCode}`);
}

export async function useTicket(ticketCode) {
  return withAccessToken(`${authUrl}/auth/ticket/${ticketCode}`, true, {
    method: "PATCH",
  });
}
