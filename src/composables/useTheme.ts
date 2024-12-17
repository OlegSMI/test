import { useStyleTag } from "@vueuse/core";
import type { ThemeParamsParsed } from "@tma.js/sdk/dist/dts/components/theme-params/types";

export const hexToRGB = (hex: any) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    (h >>> (alpha ? 24 : 16)) +
    " " +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    " " +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : "")
  );
};

export const useTheme = () => {
  const setTelegramCustomColor = (
    themeParams: ThemeParamsParsed,
    isDark: boolean,
  ) => {
    useStyleTag(
      `
      .bg-custom_button_color  {background-color: rgb(${hexToRGB(
        themeParams.buttonColor,
      )} / var(--tw-bg-opacity)) !important;}
      `,
      {
        id: "custom-button-color",
      },
    );

    if (isDark) {
      useStyleTag(
        `
      .bg-tertiary, .border-tertiary  {background-color: rgb(${hexToRGB(
        "#333334",
      )} / var(--tw-bg-opacity)) !important;}
      `,
        {
          id: "bg-tertiary",
        },
      );
      useStyleTag(
        `
      .border-tertiary  {border-color: rgb(${hexToRGB(
        "#333334",
      )} / var(--tw-bg-opacity)) !important;}
      `,
        {
          id: "border-tertiary",
        },
      );
    }
  };

  return {
    setTelegramCustomColor,
  };
};
