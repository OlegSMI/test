<script setup lang="ts">

interface Props {
  step: number;
  numSteps: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="steps"
    :style="`grid-template-columns: repeat(${props.numSteps}, minmax(0, 1fr));`"
  >
      <span
        v-for="index in props.numSteps"
        :key="index"
        :class="{
          'steps-false': props.step !== index,
          'steps-true': props.step === index
        }"
      />
  </div>
</template>


<style lang="scss" scoped>
.steps {
  @apply grid gap-2.5 fixed top-2 left-0 right-0 w-full z-20 px-4;
  & span {
    @apply relative;
    &:after {
      @apply absolute w-full h-[3px] rounded-full;
      content: "";
    }
  }

  &-null {
    &:after {
      @apply bg-transparent;
    }
  }

  &-false {
    &:after {
      @apply bg-text_color opacity-20;
    }
  }

  &-true {
    &:after {
      @apply bg-text_color opacity-100;
    }
  }
}
</style>