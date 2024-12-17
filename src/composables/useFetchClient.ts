import { createFetch } from "@vueuse/core";
import { retrieveLaunchParams } from "@tma.js/sdk";

const { initDataRaw } = retrieveLaunchParams();

export const useFetchClient = createFetch({
  baseUrl: "https://api-otat4hpefa-lz.a.run.app/",
  options: {
    async beforeFetch({ options }) {
      const token = initDataRaw;
      options.headers = {
        Authorization: token ? String(token) : "",
        Accept: "application/json",
      };
      return { options };
    },
    onFetchError(ctx) {
      const { error } = ctx;
      ctx.error = error;
      return ctx;
    },
  },
});
