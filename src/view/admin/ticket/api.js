import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function createTicket(authorities) {
  const reqBody = {
    ticketAuthorities: authorities,
  };
  return withAccessToken(`${authUrl}/auth/admin/ticket`, true, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
}

export async function getTickets() {
  return withAccessToken(`${authUrl}/auth/admin/ticket`);
}
