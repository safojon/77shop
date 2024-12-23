<script setup>
import { defineProps } from "vue";

defineProps({
  type: Array,
});
</script>

<template>
  <div v-if="type == 'category'"
    class="flex items-center min-w-[336px] h-[85px] bg-[rgba(255, 255, 255, 1)] border border-[rgba(234,237,240,1)] rounded-[12px] group hover:border-[#388FF3] cursor-pointer">
    <div class="w-auto h-auto rounded-[12px] ml-[-30px]">
      <p class="bg-slate-200 w-[64px] h-[64px] rounded-[12px]"></p>
    </div>
    <div class="flex items-center justify-between w-full">
      <div>
        <div class="pl-[12px] text-start font-semibold text-[16px]">
          <div class="bg-slate-200 rounded h-2 w-[100px] mb-4"></div>
          <div class="bg-slate-200 rounded h-2 w-[130px]"></div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="type == 'product'"
    class="max-md:w-[161px] max-md:h-[277px] w-[278px] h-[470px] bg-[#FFFFFF] rounded-[12px] cursor-pointer group">
    <div class="max-md:h-[130px] rounded-t-[12px] w-full h-[240px] relative">
      <div class="rounded-t-[12px] max-md:h-[130px] w-full h-[240px] border bg-slate-200"></div>
    </div>
    <div class="max-md:p-[8px] p-[28px] flex flex-col justify-start w-auto max-md:gap-[1px] gap-[7px]">
      <div class="max-md:w-[70px] w-[110px] h-3 rounded-[6px] px-[7px] bg-slate-200">
      </div>
      <div class="max-md:w-[120px] mt-3 rounded-[6px] w-[200px] h-3 bg-slate-200">
      </div>
      <div class="max-md:w-[90px] rounded-[6px] mt-4 w-[110px] h-3 bg-slate-200">
      </div>
      <div class="max-md:w-[120px] rounded-[6px] mt-4 w-[180px] h-3 bg-slate-200">
      </div>
      <div class="max-md:w-[100px] rounded-[6px] mt-4 w-[150px] h-3 bg-slate-200">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
