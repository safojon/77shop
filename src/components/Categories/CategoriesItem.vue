<script setup>
import { defineProps } from "vue";

defineProps({
  icon: Array,
  name: Array,
  count: Array,
});
</script>

<template>
  <div
    class="flex items-center w-full h-[85px] bg-[rgba(255, 255, 255, 1)] border border-[rgba(234,237,240,1)] rounded-[12px] group hover:border-[#388FF3] cursor-pointer">
    <div
      class="text-[14px] ml-[-32px] bg-[white] w-[64px] h-[64px] flex items-center justify-center border border-[rgba(234,237,240,1)] rounded-[12px] group-hover:border-[#388FF3]">
      <span :class="icon" class="p-[16px] text-[32px] text-[#388FF3]"></span>
    </div>
    <div class="flex items-center justify-between w-full">
      <div>
        <div class="pl-[12px] text-start font-semibold text-[16px]">
          <p>{{ name }}</p>
          <p class="font-normal text-[16px] text-[rgba(142,146,151,1)]">
            {{ count }} объявлений
          </p>
        </div>
      </div>
      <div>
        <span class="icon-stroke text-[10px] text-[#B8BBBD] group-hover:text-[#388FF3] pr-[15px]"></span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
