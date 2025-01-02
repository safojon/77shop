<script setup>
import { defineProps, ref, onMounted, watch } from "vue";

defineProps({
  id: Array,
  type: Array,
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
  <div v-if="type == 'grid'">
    <main class="max-w-[291px] h-auto bg-[#FFFFFF] rounded-[12px] cursor-pointer group">
      <span :class="likes[id] ? 'icon-liked' : 'icon-like'"
        class="max-md:text-[24px] text-[40px] absolute font-semibold ml-[10px] mt-[10px] z-40" @click="Like(id)"></span>
      <router-link :to="`/product/${id}`">
        <div class="rounded-t-[12px] w-full h-auto relative">
          <img class="rounded-t-[12px] w-full h-auto" :src="photo" alt="">
        </div>
        <div class="max-md:p-[8px] md:p-[28px] flex flex-col justify-start w-auto gap-[7px]">
          <div class="flex">
            <p
              class="flex max-md:text-[10px] w-auto h-auto max-w-13 text-[rgba(99,103,108,1)] rounded-[6px] px-[7px] bg-[rgba(234,237,240,1)]">
              {{ country }}</p>
          </div>
          <div class="max-md:text-[14px] max-md:h-[60px] h-[80px] font-semibold text-[18px] group-hover:text-[#388FF3]">
            {{ name }}
          </div>
          <div class="h-[20px] font-normal text-[14px] text-[#8E9297]">{{ date }}</div>
          <div class="font-semibold text-[16px] text-[#8E9297]">
            {{ number }}
          </div>
          <div class="max-md:text-[16px] h-[50px] font-bold text-[24px] text-[rgba(22,25,29,1)]">{{ price }} <span
              class="max-md:text-[12px] font-medium text-[16px] text-[rgba(56,143,243,1)]">{{ currency }}</span></div>
        </div>
      </router-link>
    </main>
  </div>
  <div v-else>
    <router-link :to="`/product/${id}`">
      <main class="max-w-[882px] h-auto bg-[#FFFFFF] rounded-[12px] cursor-pointer group flex mb-[10px]">
        <div class="">
          <img class="p-[1px] rounded-l-[12px] w-auto h-auto" :src="photo" alt="">
        </div>
        <div class="w-full ml-[20px] mr-[12px]">
          <div class="w-full flex justify-between mt-[12px]">
            <div class="font-semibold text-[18px] h-[60px]">{{ name }}</div>
            <div class="flex">
              <p
                class="flex max-md:text-[10px] w-auto h-[26px] max-w-13 text-[rgba(99,103,108,1)] rounded-[6px] px-[7px] bg-[rgba(234,237,240,1)]">
                {{ country }}</p>
            </div>
          </div>
          <div>
            <div class="max-md:text-[16px] h-[50px] font-bold text-[24px] text-[rgba(22,25,29,1)]">
              {{ price }} <span class="max-md:text-[12px] font-medium text-[16px] text-[rgba(56,143,243,1)]">
                {{ currency }}</span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="h-[20px] font-normal text-[14px] text-[#8E9297]">{{ date }}</div>
            <div class="font-semibold text-[16px] text-[#8E9297]">{{ number }}</div>
          </div>
        </div>
      </main>
    </router-link>
  </div>
</template>

<style scoped></style>