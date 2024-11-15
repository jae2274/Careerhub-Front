import {authUrl} from "~/const";
import {withAccessToken} from "~/httputils";

export async function createTicket(ticketName, authorities, useableCount) {
  const reqBody = {
    ticketName,
    ticketAuthorities: authorities,
    useableCount,
  };
  return withAccessToken(`${authUrl}/auth/admin/ticket`, true, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
}

export async function getTickets(byMe = false) {
  const queryStr = byMe ? "?by_me=true" : "";
  return withAccessToken(`${authUrl}/auth/admin/ticket${queryStr}`);
}
