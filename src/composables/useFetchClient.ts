// import { retrieveLaunchParams } from "@tma.js/sdk";
import { createFetch } from "@vueuse/core";

// const { initDataRaw } = retrieveLaunchParams();
const initData = "user=%7B%22id%22%3A5844876185%2C%22first_name%22%3A%22Dr.house%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22dr_house_aya%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F1LYvKbP-QsnpsfCKFy-Xn697WFPB6IHWHR7lRAsAXJtl_lMGWq8593X0GsIMvJ6w.svg%22%7D&chat_instance=5744884130456536983&chat_type=private&auth_date=1734008884&signature=HATb9Cx6AvO2_4WN4y4dItaWQLTrdaWGOi9dyg0y4uv5r_kN0zs6XcyGKJtDK2_YmnUgoW2g8IWQ3QFrphCzCA&hash=38f9f94def65ab01013376c5cb431f28f2454cd4439d881b551e2f2f0d8fe2d3"
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
