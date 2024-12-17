<template>
  <div
    class="wrap"
    :class="{
      error: props.error,
    }"
  >
    <span
      class="label"
      v-if="props.label"
      >{{ props.label }}</span
    >
    <textarea
      ref="textareaEl"
      class="textarea"
      :maxlength="props.nativeMaxLength"
      :placeholder="props.placeholder"
      :autofocus="props.autofocus"
      rows="8"
      v-model="modelValue"
    ></textarea>

    <div class="helper-text-wrap">
      <span
        v-if="props.error"
        class="error"
        >{{ props.error }}</span
      >

      <span
        v-else-if="props.helperText"
        class="helper-text"
        >{{ props.helperText }}</span
      >

      <span
        class="count"
        v-if="props.totalCharactersInCounter"
        >{{ charactersCount }} / {{ props.totalCharactersInCounter }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

type TextareaProps = {
  error?: string;
  helperText?: string;
  label?: string;
  nativeMaxLength?: number;
  totalCharactersInCounter?: number;
  placeholder?: string;
  autofocus?: boolean;
};

const props = defineProps<TextareaProps>();
const modelValue = defineModel<string | number | null>({
  default: null,
});

const emit = defineEmits<{
  characterCounting: [count: number];
}>();
const textareaEl = ref<HTMLTextAreaElement | null>(null);
const charactersCount = computed(() => {
  if (modelValue.value) {
    return String(modelValue.value).length;
    // String(modelValue.value).replace(/\s/g, "").length;
  } else {
    return 0;
  }
});

watch(charactersCount, (newVal) => {
  emit("characterCounting", newVal);
});
</script>

<style scoped lang="scss">
.textarea {
  @apply appearance-none transition-all px-3 py-2 border border-button_color rounded-3
  w-full focus-visible:ring-2 ring-bg_color bg-bg_color;
  resize: none;
}

.label {
  @apply leading-4;
}

.wrap {
  @apply flex flex-col items-stretch gap-1;
}

.wrap.error {
  //.label {
  //  @apply text-fg-red;
  //}
  //
  //.textarea {
  //  @apply border-fg-red;
  //}
  //
  //.error {
  //  @apply text-fg-red;
  //}
}

.helper-text-wrap {
  @apply flex items-center justify-between text-3.5;
}

.count {
  @apply text-3.5 leading-4 ml-auto;
}

.helper-text {
  @apply text-3.5;
}
</style>
