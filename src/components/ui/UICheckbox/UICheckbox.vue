<template>
  <label
    class="ui-checkbox"
    :class="{ 'is-checked': isChecked, 'is-disabled': props.disabled }"
  >
    <span class="relative whitespace-nowrap inline-flex">
      <input
        v-model="model"
        type="checkbox"
        :value="props?.value"
        class="absolute w-0 h-0 opacity-0 z-0"
        :disabled="props.disabled"
      />

      <span
        class="ui-checkbox__input"
        :class="props.shape ?? 'square'"
      >
        <UiTransition name="ui-fade">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ui-checkbox__check-icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.7071 3.49284C15.0976 3.88337 15.0976 4.51653 14.7071 4.90706L7.41421 12.2C6.63317 12.981 5.36684 12.981 4.58579 12.2L1.29289 8.90706C0.902369 8.51653 0.902369 7.88337 1.29289 7.49284C1.68342 7.10232 2.31658 7.10232 2.70711 7.49284L6 10.7857L13.2929 3.49284C13.6834 3.10232 14.3166 3.10232 14.7071 3.49284Z"
              fill="currentColor"
            />
          </svg>
        </UiTransition>
      </span>
    </span>

    <span
      v-if="props?.label"
      class="ui-checkbox__label"
    >
      {{ props.label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import UiTransition from "@/components/ui/UITransition/UITransition.vue";
import { computed } from "vue";
import type { UICheckboxProps } from "@/components/ui/UICheckbox/types";

const model = defineModel<string | boolean>();
const props = defineProps<UICheckboxProps>();

const isChecked = computed(() => {
  if (typeof model.value === "boolean") {
    return model.value;
  } else if (props?.value) {
    return model.value?.includes(props?.value);
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped>
.ui-checkbox {
  @apply cursor-pointer whitespace-nowrap flex items-center h-7 relative;

  &__check-icon {
    @apply text-black transition-colors;
  }

  &__input {
    @apply w-5 h-5 border border-hint_color hover:border-bg_secondary_color transition-colors flex items-center justify-center bg-bg_color;

    // shape
    &.square {
      @apply rounded-1;
    }

    &.round {
      @apply rounded-full;
    }
  }

  &__label {
    @apply inline-block pl-3 text-text_color text-sm not-italic font-medium leading-[160%] transition-colors;
  }
}

.ui-checkbox__check-icon {
  @apply hidden w-3.5 h-3.5;
}

.ui-checkbox.is-checked {
  .ui-checkbox__input {
    @apply bg-button_color border-button_color;
  }

  .ui-checkbox__check-icon {
    @apply block text-white;
  }
}

.ui-checkbox.is-disabled.is-checked {
  .ui-checkbox__input {
    @apply bg-bg_secondary_color border-bg_secondary_color;
  }

  .ui-checkbox__check-icon {
    @apply block text-bg_secondary_color;
  }
}

.ui-checkbox.is-disabled {
  @apply cursor-not-allowed;

  .ui-checkbox__input {
    @apply w-5 h-5 rounded-1 border-2 border-bg_secondary_color hover:border-bg_secondary_color transition-colors flex items-center justify-center bg-bg_secondary_color;
  }

  .ui-checkbox__check-icon {
    @apply text-white;
  }

  .ui-checkbox__label {
    @apply text-bg_secondary_color;
  }
}
</style>
