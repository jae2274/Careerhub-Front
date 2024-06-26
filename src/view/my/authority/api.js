import {authUrl} from "~/const";
import {withAccessToken, setAccessTokenToCookie} from "~/httputils";

export async function getAuthorities() {
  return withAccessToken(`${authUrl}/auth/authority`);
}

export async function getTicketInfo(ticketCode) {
  return withAccessToken(`${authUrl}/auth/ticket/${ticketCode}`);
}

export async function useTicket(ticketCode) {
  const resBody = await withAccessToken(
    `${authUrl}/auth/ticket/${ticketCode}`,
    true,
    {
      method: "PATCH",
    }
  );

  if (resBody) {
    setAccessTokenToCookie(resBody.accessToken);
  }
}
