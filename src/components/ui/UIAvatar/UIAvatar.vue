<script setup lang="ts">
import { computed } from "vue";
import { getBaseFontSize } from "@/helpers/getBaseFontSize";
import UISkeleton from "@/components/ui/UISkeleton/UISkeleton.vue";

interface IUIAvatarProps {
  username?: string | null;
  image?: string | null;
  size?: number;
  backgroundColor?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<IUIAvatarProps>(), {
  username: null,
  image: null,
  size: 32,
});
const rootStyle = computed<{ width: string; height: string }>(() => {
  const fontSize = getBaseFontSize();
  const remSize = props.size / fontSize + "rem";
  return {
    width: remSize,
    height: remSize,
  };
});
const userAvatarSymbols = computed<string | undefined>(() => {
  let userAvatarSymbolsTemp: string | undefined = undefined;
  if (props.username) {
    userAvatarSymbolsTemp = props.username?.slice(0, 1)?.toUpperCase();
  }
  return userAvatarSymbolsTemp;
});
</script>

<template>
  <div
    class="ui-avatar bg-tertiary"
    :style="rootStyle"
  >
    <template v-if="isLoading">
      <UISkeleton class="w-full h-full rounded-full" />
    </template>
    <template v-else-if="props.image">
      <span class="ui-avatar-user">
        <img
          :src="props.image"
          alt=""
        />
      </span>
    </template>
    <template v-else>
      <span class="ui-avatar-user">
        {{ userAvatarSymbols }}
      </span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ui-avatar {
  @apply rounded-full overflow-hidden flex items-center justify-center text-hint_color font-semibold;
}
</style>
