import {
  ClosingBehavior,
  BackButton,
  MainButton,
  Popup,
  postEvent,
  retrieveLaunchParams,
  MiniApp,
  Viewport,
  Utils,
  on,
} from "@tma.js/sdk";
import { useTheme } from "@/composables/useTheme";
import { watchEffect } from "vue";

const { themeParams } = retrieveLaunchParams();
const { setTelegramCustomColor } = useTheme();

const miniApp = new MiniApp({
  headerColor: themeParams.backgroundColor as `#${string}`,
  backgroundColor: themeParams.backgroundColor as `#${string}`,
  version: "6.4",
  botInline: true,
  postEvent,
});

// console.log(themeParams);
watchEffect(() => {
  if (themeParams) {
    setTelegramCustomColor(themeParams, miniApp.isDark);
    miniApp.setBackgroundColor(themeParams.backgroundColor as `#${string}`);
    miniApp.setHeaderColor(themeParams.backgroundColor as `#${string}`);
  }
});

const closingBehaviour = new ClosingBehavior(false, postEvent);
closingBehaviour.enableConfirmation();
const backButton = new BackButton(false, "6.4", postEvent);
const viewport = new Viewport({
  height: 390,
  width: 365,
  stableHeight: 300,
  isExpanded: false,
  postEvent,
});
const mainButton = new MainButton({
  backgroundColor: themeParams.buttonColor as `#${string}`,
  isEnabled: false,
  isVisible: false,
  isLoaderVisible: false,
  text: "Отправить",
  textColor: themeParams.buttonTextColor as `#${string}`,
  postEvent,
});
const popup = new Popup("7.0", postEvent);
const utils = new Utils("7.0", () => Math.random().toString(), postEvent);

on("theme_changed", () => {
  setTelegramCustomColor();
  mainButton.setParams({
    backgroundColor: themeParams.buttonColor as `#${string}`,
    textColor: themeParams.buttonTextColor as `#${string}`,
  });
});
export const useWebApp = () => {
  return {
    miniApp,
    themeParams,
    backButton,
    mainButton,
    popup,
    viewport,
    utils,
  };
};
