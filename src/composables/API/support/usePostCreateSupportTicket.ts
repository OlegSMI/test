import { type UseFetchOptions } from "@vueuse/core";
import { useFetchClient } from "@/composables/useFetchClient";

interface IUsePostCreateSupportTicketReq {
  topic_id: number;
  question: string;
  nick: string;
}

export const usePostCreateSupportTicket = (
  body: IUsePostCreateSupportTicketReq,
  options: UseFetchOptions = {},
) => {
  const url: string = "ticketCreate";
  return useFetchClient(url, options).post(body).json<{ data: any }>();
};
