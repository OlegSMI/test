<script setup lang="ts">
defineProps<{
  img: string;
  title: string;
  text: string;
  route: string;
}>();
</script>

<template>
  <router-link :to="route" class="router">
    <img :src="img" alt="" />
    <div class="description">
      <p class="title">{{ title }}</p>
      <p class="text">{{ text }}</p>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.router {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--tertiary-fill-background);
  color: var(--text-color);
  border-radius: 12px;
  text-decoration: none;
  height: 80px;
  transition: background-color 0.3 s ease;

  img {
    margin-right: 12px;
  }

  &:hover {
    cursor: pointer;
  }
}

.title {
  font-weight: 590;
  font-size: 17px;
  line-height: 22px;
}
</style>
