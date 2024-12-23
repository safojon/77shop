<script setup>
import Navbar from '../components/navbar.vue';
</script>

<template>
  <Navbar />
  <div class="flex flex-col items-center justify-center w-full mt-[200px]">
    <div class="px-[110px]">
      <img class="h-auto" src="../../public/404/404.png" alt="">
    </div>
    <div class="font-bold text-[24px] mt-[60px] px-[10px] text-center">Страница, которую вы ищете, не найдена</div>
    <div class="font-normal text-[16px] text-[rgba(21,21,21,1)] mt-[12px] px-[10px] text-center">Нам жаль, но, похоже, мы потеряли эту
      страницу, но мы не хотим терять вас.</div>
    <router-link to="/">
      <button
        class="hover:border-[rgba(56,143,243,1)] border-[2px] hover:text-[rgba(56,143,243,1)] hover:bg-white mt-[20px] w-[246px] h-[44px] bg-[rgba(56,143,243,1)] rounded-[8px] text-white font-semibold">
        Вернуться на главную
      </button>
    </router-link>
  </div>
</template>

<style scoped></style>
