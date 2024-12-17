<script setup lang="ts">
import { retrieveLaunchParams } from "@tma.js/sdk";
import AyaIcon from "@/components/icons/aya.vue";

const { initData } = retrieveLaunchParams();
import { toRefs } from "vue";
import { useUserStore } from "@/store/user";
import UIAvatar from "@/components/ui/UIAvatar/UIAvatar.vue";
import { useRouter } from "vue-router";
import { RouteName } from "@/constants/route_name";

const router = useRouter();
const { user, hasAccessCount } = toRefs(useUserStore());
const onLogoClick = async () => {
  if (hasAccessCount.value < 2) {
    return;
  } else {
    await router.push({ name: RouteName.SELECT_FEATURE });
  }
};
</script>

<template>
  <header
    class="max-w-screen overflow-hidden px-4 py-2 flex justify-between items-center"
  >
    <div class="flex items-center gap-3">
      <AyaIcon
        height="24"
        width="64"
        class="text-link_color"
        @click="onLogoClick"
      />
      <span class="w-px h-6 bg-hint_color opacity-40" />
      <span class="text-sm text-hint_color">Kitchen</span>
    </div>
    <div class="flex items-center gap-3 ml-auto">
      <span
        class="text-text_color text-[17px] font-[590] leading-[22px] tracking-[-0.43px] max-w-[120px] truncate"
      >
        {{ initData?.user?.username }}
      </span>
      <UIAvatar
        :image="user?.avatarUrl ?? initData?.user?.photoUrl"
        :username="initData?.user?.username"
      />
    </div>
  </header>
</template>
