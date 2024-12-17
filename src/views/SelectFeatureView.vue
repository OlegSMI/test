<script setup lang="ts">
import UIButton from "@/components/ui/UIButton/UIButton.vue";
import AddIcon from "@/components/icons/add.vue";
import { useRouter } from "vue-router";
import { useWebApp } from "@/composables/useWebApp";
import AyaIcon from "@/components/icons/aya.vue";
import { RouteName } from "@/constants/route_name";

const router = useRouter();
const { backButton, mainButton } = useWebApp();
if (backButton.isVisible) {
  backButton.hide();
}
if (mainButton.isVisible) {
  mainButton.hide();
}
</script>

<template>
  <div class="p-4 flex flex-col items-center justify-center app-container">
    <div class="mb-8">
      <AyaIcon
        width="160"
        class="text-link_color"
      />
    </div>
    <div class="flex gap-4 justify-center">
      <UIButton
        size="s"
        variant="primary"
        @click="router.push({ name: RouteName.KITCHEN_ROOT })"
      >
        Kitchen
      </UIButton>
      <UIButton
        size="s"
        variant="primary"
        @click="router.push({ name: RouteName.TASK_SELECT_TOPIC })"
      >
        <template #left>
          <AddIcon class="w-3 h-3" />
        </template>
        Task
      </UIButton>
    </div>
  </div>
</template>
