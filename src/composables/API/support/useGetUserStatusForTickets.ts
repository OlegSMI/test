import { useFetch, type UseFetchOptions } from "@vueuse/core";

interface IUsePostCreateSupportTicketReq {
  topic_id: number;
  question: string;
  nick: string;
}

export const usePostCreateSupportTicket = (
  body: IUsePostCreateSupportTicketReq,
  options: UseFetchOptions = {},
) => {
  return useFetch("https://pay.ayagroup.pro/Remotes/ticket_create", {
    ...options,
    headers: {
      Authorization: "Basic dXNIcl9hbGw6QIFybnZvUXpmeG1XaVZ5V3RERzA=",
    },
  })
    .post(body)
    .json<{ data: any }>();
};
