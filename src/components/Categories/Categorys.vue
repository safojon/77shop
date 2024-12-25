<script setup>
import { Categories } from "../../data/data";
import Card from "./CategoriesItem.vue";
import LoadingCard from "../Loading.vue";
import { ref, watch, onMounted } from "vue";

const categories = ref([]);
const filterCategory = ref([]);
const searchInputVal = ref("");
const loading = ref(false);

function LoadCategory() {
  loading.value = true;
  setTimeout(() => {
    categories.value = Categories.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      product_count: item.count,
    }));
    filterCategory.value = categories.value;
    loading.value = false;
  }, 1000);
}

watch(searchInputVal, () => {
  filterCategory.value = categories.value.filter((category) =>
    catesgory.name.toLowerCase().includes(searchInputVal.value.toLowerCase())
  );
});

onMounted(() => {
  LoadCategory();
});

const openSearchModal = ref(false);

const openSearchInputModal = () => {
  openSearchModal.value = true;
};

const closeSearchInputModal = () => {
  openSearchModal.value = false;
};

</script>

<template>
  <!-- Search Modal -->
  <div v-if="openSearchModal"
    class="w-full min-h-[914px] fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="flex flex-col ">
      <div class="flex flex-col gap-3">
        <div class="relative flex items-center mt-[-265px]">
          <span class="mt-1 icon-search text-[rgba(213,216,219,1)] absolute left-[13px]"></span>
          <input
            class="max-md:w-[335px] w-[580px] h-[60px] pl-10 border border-[rgba(234,237,240,1)] rounded-[5px] placeholder-gray-400 focus:border-black"
            type="text" placeholder="Что вы ищите?" v-model="searchInputVal">
          <button
            class="w-[107px] h-[44px] text-[#ffffff] bg-[black] rounded-[6px] absolute right-[8px] font-semibold text-[14px] leading-[20px] hover:text-[black] hover:bg-white hover:border-2 hover:border-black">
            Поиск
          </button>
        </div>
        <div class="mt-10 flex justify-center gap-[12px] md:gap-[72px] flex-wrap w-full max-w-[1184px]">
          <Card v-for="categories in filterCategory" :key="category.id" :icon="category.icon" :name="category.name"
            :count="category.product_count" />
        </div>
      </div>
      <div>
        <div class="bg-white w-[580px] h-[52px] flex items-center font-medium text-[16px]">
          <p class="text-[16px]"> <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.579 2.26159C9.75114 1.9128 10.2485 1.9128 10.4206 2.26159L12.649 6.77669C12.7173 6.9152 12.8495 7.0112 13.0023 7.03341L17.985 7.75744C18.3699 7.81337 18.5236 8.28639 18.2451 8.55788L14.6396 12.0724C14.529 12.1802 14.4785 12.3355 14.5046 12.4878L15.3558 17.4504C15.4215 17.8337 15.0191 18.126 14.6749 17.9451L10.2182 15.602C10.0815 15.5302 9.91815 15.5302 9.78144 15.602L5.32477 17.9451C4.98049 18.126 4.57812 17.8337 4.64387 17.4504L5.49502 12.4878C5.52113 12.3355 5.47066 12.1802 5.36006 12.0724L1.75453 8.55788C1.47601 8.28639 1.6297 7.81337 2.01461 7.75744L6.99733 7.03341C7.15017 7.0112 7.28231 6.9152 7.35066 6.77669L9.579 2.26159Z"
                stroke="#FAAC36" stroke-width="1.5" stroke-linejoin="round" />
            </svg>
          </p>
          <p class="pl-1"> Холодильники</p>
        </div>
      </div>
    </div>
  </div>

  <main class="w-full min-h-[914px] bg-white flex flex-col gap-4 items-center px-4 pb-[36px] mt-[150px]">
    <div class="relative flex items-center mt-[-35px]">
      <span class="mt-1 icon-search text-[rgba(213,216,219,1)] absolute left-[13px]"></span>
      <input
        class="max-md:w-[335px] w-[580px] h-[60px] pl-10 border border-[rgba(234,237,240,1)] rounded-[5px] placeholder-gray-400 focus:border-black"
        type="text" placeholder="Что вы ищите?" v-model="searchInputVal">
      <button
        class="w-[107px] h-[44px] text-[#ffffff] bg-[black] rounded-[6px] absolute right-[8px] font-semibold text-[14px] leading-[20px] hover:text-[black] hover:bg-white hover:border-2 hover:border-black"
        >
        Поиск
      </button>
    </div>
    <div class="flex flex-col items-center text-center">
      <div class="pt-10 text-2xl font-bold md:text-3xl">Категории</div>
      <div class="h-2 text-[rgba(142,146,151,1)] font-normal mt-2 text-md md:text-base">
        Вы можете найти все категории, которые вам нужны от покупателя
      </div>
      <div class="w-full pt-[35px]">
        <div v-if="loading" class="grid pb-10 pl-10 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
          <LoadingCard type="category" v-for="i in 21" :key="i" />
        </div>
        <div v-else
          class="grid pb-10 pl-10 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
          <Card v-for="category in filterCategory" :key="category.id" :icon="category.icon" :name="category.name"
            :count="category.product_count"/>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped></style>
