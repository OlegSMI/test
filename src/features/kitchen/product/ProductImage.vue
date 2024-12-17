<script setup lang="ts">
import { useImage } from "@vueuse/core";
import UISkeleton from "@/components/ui/UISkeleton/UISkeleton.vue";

interface Props {
  src?: string | null;
}

const props = defineProps<Props>();
const imageUrl = props.src || "/image/img.webp";
const { isLoading } = useImage(imageUrl, {
  immediate: true,
});
</script>
<template>
  <div class="product-image">
    <img
      v-show="!isLoading"
      :src="imageUrl"
      alt=""
    />
    <UISkeleton
      v-if="isLoading"
      class="w-full h-full"
    />
  </div>
</template>
<style lang="scss" scoped>
.product-image {
  @apply overflow-hidden;

  & > img {
    @apply object-cover object-center w-full h-full;
  }
}
</style>
