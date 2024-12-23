<script setup>
import CustomHeader from "../components/Base/CustomHeader.vue";
import Footer from '../components/footer.vue';
</script>

<template>
  <CustomHeader />
  <slot />
  <Footer />
</template>

<style scoped></style>
