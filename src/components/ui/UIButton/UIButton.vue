<script setup lang="ts">
import UIIcon from "../UIIcon/UIIcon.vue";

interface ButtonBaseProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  active?: boolean;
  variant?: "primary" | "secondary" | "secondary-tab" | "clean";
  size?: "s" | "m" | "l" | "full" | "fit";
  shape?: "pill" | "square";
  iconOnly?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonBaseProps>(), {
  type: "button",
  disabled: false,
  variant: "primary",
  size: "m",
  shape: "square",
});
</script>
<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="[
      props.active ? 'active' : '',
      'ui-button',
      `variant-${props.variant}`,
      `size-${props.size}`,
      `shape-${props.shape}`,
      props.iconOnly ? `icon-only-${props.size}` : '',
      props.loading ? 'pointer-events-none' : '',
      !['primary', 'clean'].includes(props.variant)
        ? 'bg-tertiary border-tertiary'
        : '',
    ]"
  >
    <UIIcon
      v-if="props.loading"
      icon="spinner"
      class="order-1 animate-spin"
    />
    <div
      v-if="$slots.left"
      class="order-1"
    >
      <slot name="left" />
    </div>
    <div
      v-if="$slots.right"
      class="order-3"
    >
      <slot name="right" />
    </div>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  @apply flex items-center justify-center gap-2 transition-all duration-200 ease-in-out border border-solid cursor-default;
  @apply disabled:cursor-not-allowed;
  & > span {
    @apply w-max order-2;
  }
}

.shape {
  &-pill {
    @apply rounded-full;
  }

  &-square {
    @apply rounded-xl;
  }
}

// variant
.variant {
  &-primary {
    @apply text-button_text_color bg-button_color border-button_color;

    &:hover:enabled {
      //@apply bg-accent-highlight;
    }
  }

  &-secondary {
    @apply text-link_color;

    &:hover:enabled {
      //@apply border-[var(--Dark-2,#414649)] bg-secondary;
      //background: var(--Dark-2, #414649);
    }
  }

  &-secondary-tab {
    @apply text-text_color;

    &:hover:enabled {
      //@apply border-[var(--Dark-2,#414649)] bg-secondary;
      //background: var(--Dark-2, #414649);
    }
  }

  &-clean {
    @apply text-hint_color border-transparent;
  }
}

// size
.size {
  &-s {
    @apply text-sm font-medium leading-[160%];
    @apply px-4 h-8;

    & > svg {
      @apply text-3;
    }
  }

  &-m {
    @apply text-sm font-semibold;
    @apply px-4 h-[42px];

    & > svg {
      @apply text-base;
    }
  }

  &-l {
    @apply text-base font-semibold;
    @apply px-4 h-[48px];

    & > svg {
      @apply text-base;
    }
  }

  &-full,
  &-fit {
    @apply text-base font-semibold;
    @apply flex-col items-start gap-3;
    & > svg {
      @apply text-5;
    }
  }

  &-full {
    @apply w-full h-full p-6;
  }

  &-fit {
    @apply w-fit h-fit;
  }
}

.icon-only {
  &-s {
    @apply min-w-8 w-8;
  }

  &-m {
    @apply min-w-10.5 w-10.5;

    & > svg {
      @apply text-base;
    }
  }

  &-l {
    @apply min-w-12 w-12;

    & > svg {
      @apply text-base;
    }
  }
}
</style>
