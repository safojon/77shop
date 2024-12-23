<script setup>
import { Products } from "../../data/data";
import Prodect from "./ProdectItem.vue";
import LoadingCard from "../Loading.vue";
import { ref, watch, onMounted } from "vue";

const products = ref([]);
const filterProducts = ref([]);
const loading = ref(false);

function LoadCategory() {
  loading.value = true;
  setTimeout(() => {
    products.value = Products.map((item) => ({
      id: item.id,
      photo: item.photo,
      country: item.country,
      name: item.name,
      date: item.date,
      number: item.number,
      price: item.price,
      currency: item.currency,
    }));
    filterProducts.value = products.value;
    loading.value = false;
  }, 1000);
}

onMounted(() => {
  LoadCategory();
});

</script>

<template>
  <main class="w-full h-auto flex flex-col items-center pb-[100px]">
    <div class="max-md:mx-[80px] flex flex-col items-center">
      <div class="font-bold text-black text-[32px] mt-[64px]">Объявления</div>
      <div class=" h-10 text-center font-normal text-[#8E9297] text-[16px] mt-[8px] text-md md:text-base">
        Вы можете найти все категории, которые вам нужны от покупателя
      </div>
    </div>
    <div v-if="loading" class="grid pb-10 mt-10 max-md:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-5 gap-y-5">
      <LoadingCard type="product" v-for="i in 12" :key="i" />
    </div>
    <div v-else class="grid pb-10 mt-10 max-md:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-5 gap-y-5">
      <Prodect v-for="product in filterProducts" :key="product.id" :id="product.id" :photo="product.photo"
        :country="product.country" :name="product.name" :date="product.date" :number="product.number"
        :price="product.price" :currency="product.currency" />
    </div>
    <router-link to="/products/list">
      <button
        class="px-[25px] gap-[10px] flex items-center hover:border-[rgba(214,214,214,0.54)] border-[2px] border-[rgba(214,214,214,0.5)] hover:bg-white mt-[20px] w-auto h-[44px] bg-[rgba(234,237,240,1)] rounded-[100px] text-[rgba(22,25,29,1)] font-semibold">
        Загрузить больше
        <div class="mt-1">
          <p class="icon-stroke rotate-90 text-[9px]"></p>
          <p class="icon-stroke rotate-90 text-[9px] mt-[-5px]"></p>
        </div>
      </button>

    </router-link>
  </main>
</template>

<style scoped></style>
