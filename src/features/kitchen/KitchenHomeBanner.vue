<script setup lang="ts">
import { useImage } from "@vueuse/core";
import UISkeleton from "@/components/ui/UISkeleton/UISkeleton.vue";

const imageUrl = "/image/banner.webp";
const { isLoading } = useImage(imageUrl, {
  immediate: true,
});
</script>
<template>
  <div>
    <div class="h-[172px]">
      <img
        v-show="!isLoading"
        :src="imageUrl"
        alt=""
        class="rounded-3"
      />
      <UISkeleton
        v-if="isLoading"
        class="rounded-3 w-full h-full"
      />
    </div>
  </div>
</template>
