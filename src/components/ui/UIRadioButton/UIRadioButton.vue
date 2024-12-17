<script setup lang="ts">
import type { UIRadioButtonProps } from "./types";

const model = defineModel<string | number>();
const props = withDefaults(defineProps<UIRadioButtonProps>(), {
  size: "m",
  checked: false,
});
</script>

<template>
  <label class="ui-radio-button">
    <input
      v-model="model"
      type="radio"
      :value="props?.value"
      :disabled="props.disabled"
    />
    <div
      class="content"
      :class="props.size"
    >
      <slot />
    </div>
  </label>
</template>
<style lang="scss" scoped>
.ui-radio-button {
  @apply relative;
  & input {
    @apply hidden;
  }

  & input:not(:disabled):checked ~ .content {
    @apply border-button_color ring-button_color ring-2;
  }

  & input:not(:disabled):not(:checked) ~ .content {
    @apply border-subtitle_text_color;
  }

  //& input:not(:disabled):not(:checked) ~ .content:hover {
  //  @apply border-button_color;
  //}

  & input:not(.disabled) ~ .content {
    @apply cursor-pointer;
  }

  & input:disabled ~ .content {
    @apply cursor-not-allowed opacity-50 border-subtitle_text_color;
  }
}

.content {
  @apply w-full flex items-center justify-center transition-all border border-solid rounded-xl font-medium text-sm leading-5;
  & input {
    @apply block;
  }
}

// sizes
.m {
  @apply h-10.5 px-3;
}

.full {
  @apply h-auto p-3;
}
</style>
