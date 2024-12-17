<script setup lang="ts">
import type { TIconName } from "./types";
import { computed, ref } from "vue";
import { getBaseFontSize } from "@/helpers/getBaseFontSize";
import packageApp from "../../../../package.json";

const appVersion = ref(packageApp.version);
interface Props {
  icon: TIconName;
  width?: string;
  height?: string;
}
const props = defineProps<Props>();
const iconWidth = computed<string>(() => {
  return props.width
    ? `${(props.width as unknown as number)}px`
    : "1em";
});
const iconHeight = computed<string>(() => {
  return props.height
    ? `${(props.height as unknown as number)}px`
    : "1em";
});
const iconStyle = computed<{ [key: string]: string }>(() => {
  return {
    minWidth: iconWidth.value,
    minHeight: iconHeight.value,
  };
});
</script>
<template>
  <svg
    role="presentation"
    :width="iconWidth"
    :height="iconHeight"
    :style="iconStyle"
  >
    <use :href="`/icon-sprite.svg?v=${appVersion}#${props.icon}`" />
  </svg>
</template>
