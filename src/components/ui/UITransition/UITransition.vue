<script setup lang="ts">
import type { TUITransition } from "./types";

const props = withDefaults(defineProps<{ name?: TUITransition }>(), {
  name: "ui-fade",
});
</script>
<template>
  <Transition :name="props.name">
    <slot></slot>
  </Transition>
</template>
<style lang="scss">
.ui-fade {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-300;
  }

  &-enter-from {
    opacity: 0;
  }

  &-leave-to {
    opacity: 0;
  }
}

.ui-fade-from-left {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }

  &-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }

  &-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.ui-slide-from-right-enter-active,
.ui-slide-from-right-leave-active {
  transition: transform 0.3s ease;
}

.ui-slide-from-right-enter-from,
.ui-slide-from-right-leave-to {
  transform: translateX(100%);
}

.ui-slide-from-left-enter-active,
.ui-slide-from-left-leave-active {
  transition: transform 0.3s ease;
}

.ui-slide-from-left-enter-from,
.ui-slide-from-left-leave-to {
  transform: translateX(-100%);
}

.ui-slide-from-bottom {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }

  &-enter-from {
    transform: translateY(100%);
  }

  &-leave-to {
    transform: translateY(100%);
  }
}

.ui-dropdown {
  &-enter-active,
  &-leave-active {
    @apply transition transition-transform duration-150;
  }

  &-enter-from {
    @apply -translate-y-2 opacity-0 z-[-1];
  }

  &-leave-to {
    @apply -translate-y-2 opacity-0 z-[-1];
  }
}

.ui-accordion {
  &-enter-active,
  &-leave-active {
    @apply transition transition-transform duration-150;
  }

  &-enter-from {
    @apply -translate-y-1 opacity-0 z-[-1];
  }

  &-leave-to {
    @apply -translate-y-1 opacity-0 z-[-1];
  }
}

.ui-modal {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-200 transform-gpu;
  }

  &-enter-from {
    transform: translateY(5%);
    opacity: 0;
  }

  &-leave-to {
    transform: translateY(5%);
    opacity: 0;
  }
}

.ui-zoom-in {
  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }

  &-enter-from {
    transform: scale(0.9);
    opacity: 0;
  }

  &-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>
