<script setup>
import Default from "./layouts/default.vue";
import Empty from "./layouts/empty.vue";
import { useRoute } from "vue-router";

const layouts = {
  default: Default,
  empty: Empty,
};

const route = useRoute();
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[rgba(240,243,247,1)]">
    <component :is="layouts[route.meta.layout]">
      <router-view></router-view>
    </component>
  </div>
</template>

<style scoped>
</style>
