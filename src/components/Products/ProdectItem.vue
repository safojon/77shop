<script setup>
import { defineProps, ref, onMounted, watch } from "vue";

defineProps({
  id: Array,
  photo: Array,
  country: Array,
  name: Array,
  date: Array,
  number: Array,
  price: Array,
  currency: Array,
});

const likes = ref({});

onMounted(() => {
  const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
  likes.value = savedLikes;
});

const Like = (id) => {
  likes.value[id] = !likes.value[id];
  const updatedLikes = {
    ...JSON.parse(localStorage.getItem("likes") || "{}"),
    [id]: likes.value[id],
  };
  localStorage.setItem("likes", JSON.stringify(updatedLikes));
};
</script>

<template>
  <main class="max-md:w-[161px]  md:w-[278px] h-auto bg-[#FFFFFF] rounded-[12px] cursor-pointer group">
    <div class="rounded-t-[12px] w-full h-auto relative">
      <span :class="likes[id] ? 'icon-liked' : 'icon-like'"
        class="max-md:text-[24px] text-[40px] absolute font-semibold ml-[10px] mt-[10px]" @click="Like(id)"></span>
      <img class="rounded-t-[12px] w-auto h-auto" :src="photo" alt="">
    </div>
    <div class="max-md:p-[8px] md:p-[28px] flex flex-col justify-start w-auto gap-[7px]">
      <div class="max-md:text-[10px] max-md:w-[80px] md:w-[120px] h-auto max-w-13 text-[rgba(99,103,108,1)] rounded-[6px] px-[7px] color-[rgba(234,237,240,1)] bg-[rgba(234,237,240,1)]">{{ country }}
      </div>
      <div class="max-md:text-[14px] max-md:w-[150px] max-md:h-[60px] h-[50px] font-semibold text-[18px] group-hover:text-[#388FF3]">
        {{ name }}
      </div>
      <div class="h-[20px] font-normal text-[14px] text-[#8E9297]">{{ date }}</div>
      <div class="font-semibold text-[16px] text-[#8E9297]">
        {{ number }}
      </div>
      <div class="max-md:text-[16px] h-[50px] font-bold text-[24px] text-[rgba(22,25,29,1)]">{{ price }} <span
          class="max-md:text-[12px] font-medium text-[16px] text-[rgba(56,143,243,1)]">{{ currency }}</span></div>
    </div>
  </main>
</template>

<style scoped></style>