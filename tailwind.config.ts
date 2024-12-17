import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      390: "390px",
      ...defaultTheme.screens,
    },
    fontSize: {
      ...defaultTheme.fontSize,
      ...defaultTheme.spacing,
    },
    extend: {
      aspectRatio: {
        card: "15 / 9",
      },
      zIndex: {
        1: "0",
        2: "1000", // dropdown, tooltip
        3: "2000", // sticky
        4: "3000", // fixed
        5: "4000", // modal-backdrop
        6: "5000", // offcanvas / side modal
        7: "6000", // modal
        8: "7000", // popover, modal in modal
        9: "8000", // tooltip, dropdown in modal/popover
      },
      spacing: {
        4: "1rem",
        4.5: "1.125rem",
        5: "1.25rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.75rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
        20.5: "5.125rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        42: "10.5rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        68: "17rem",
        70: "17.5rem",
        71: "17.75rem",
        72: "18rem",
        75: "18.75rem",
        80: "20rem",
        82: "20.5rem",
        96: "24rem",
        100: "25rem",
        104: "26rem",
        106: "26.5rem",
        107: "26.75rem",
        108: "27rem",
      },
      minHeight: (theme) => ({
        ...theme("spacing"),
      }),
      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
      maxHeight: (theme) => ({
        ...theme("spacing"),
      }),
      maxWidth: (theme) => ({
        ...theme("spacing"),
      }),
      lineHeight: (theme) => ({
        ...theme("spacing"),
      }),
      fontSize: (theme) => ({
        ...theme("spacing"),
      }),
      blur: (theme) => ({
        ...theme("spacing"),
      }),
      borderRadius: (theme) => ({
        ...theme("spacing"),
      }),

      colors: {
        // telegram theme
        ring: {
          button_color: "var(--tg-theme-button-color,#007AFF)",
        },

        // telegram theme
        bg_color: "var(--tg-theme-background-color,#FFFFFF)",
        bg_secondary_color:
          "var(--tg-theme-secondary-background-color,#FFFFFF)",
        header_background_color:
          "var(--tg-theme-header-background-color,#FFFFFF)",
        section_header_text_color:
          "var(--tg-theme-section-header-text-color,#FFFFFF)",
        section_background_color:
          "var(--tg-theme-section-background-color,#FFFFFF)",
        hint_color: "var(--tg-theme-hint-color,#8E8E93)",
        link_color: "var(--tg-theme-link-color,#007AFF)",
        text_color: "var(--tg-theme-text-color,#000000)",
        subtitle_text_color: "var(--tg-theme-subtitle-text-color,#000000)",
        accent_text_color: "var(--tg-theme-accent-text-color,#000000)",
        destructive_text_color:
          "var(--tg-theme-destructive-text-color,#000000)",

        button_color: "var(--tg-theme-button-color,#007AFF)",
        button_text_color: "var(--tg-theme-button_text_color,#FFFFFF)",
        // custom theme
        custom_button_color: "#007AFF",
        tertiary: "#EFEFEF",
      },
    },
  },
};
