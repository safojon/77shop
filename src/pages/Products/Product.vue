<script setup>
import Navbar from '../../components/navbar.vue';
import NotFound from '../NotFound.vue';
import { Products } from "../../data/data";
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const product = ref(route.params.id);

const SearchProduct = computed(() => {
    const Product = Products.filter((row) =>
        row.id.toString() === product.value.toString()
    );
    return Product[0];
});


</script>

<template>
    <div v-if="SearchProduct">
        <Navbar />
        <div class="w-full h-[1500px] flex justify-center">
            <div class="w-[1440px] max-md:px-[0%] px-[8%] mt-[112px]">
                <div class="ml-[16px]">
                    <router-link to="/">
                        <div class="font-medium text-[14px]">Главная</div>
                    </router-link>
                </div>
                <div class="mt-[32px] w-full flex gap-[24px] flex-wrap md:flex-nowrap">
                    <div class="h-auto w-full md:w-[75%]">
                        <div class="p-[24px] bg-white md:rounded-[16px]">
                            <div>
                                <img class="w-full h-[300px] md:h-[481px] rounded-[16px]" :src="SearchProduct.photo"
                                    alt="">
                            </div>
                            <div class="flex items-center gap-[8px]">
                                <div class="mt-[24px] text-gray-500 font-normal text-[14px]">Электроника</div>
                                <div class="bg-blue-500 w-[4px] h-[4px] rounded-full mt-[27px]"></div>
                            </div>
                            <div class="mt-[8px] text-[20px] font-bold">{{ SearchProduct.name }}</div>
                            <div class="flex gap-[16px] mt-[16px] flex-wrap">
                                <div
                                    class="bg-gray-200 text-gray-600 text-[14px] font-normal px-[8px] py-[4px] rounded-[6px]">
                                    {{ SearchProduct.date }}</div>
                                <div
                                    class="bg-gray-200 text-gray-600 text-[14px] font-normal px-[8px] py-[4px] rounded-[6px]">
                                    {{ SearchProduct.country }}</div>
                            </div>
                            <div class="flex w-full justify-between md:items-center max-md:flex-col">
                                <div class="flex gap-[8px] mt-[28px]">
                                    <div class="font-bold text-[28px] text-gray-900">{{ SearchProduct.price }}</div>
                                    <div class="text-blue-500 mt-[11px] font-medium text-[18px]">{{
                                        SearchProduct.currency }}</div>
                                </div>
                                <div class="flex w-auto h-auto mt-[15px]">
                                    <button
                                        class="max-md:justify-center w-full hover:bg-blue-600 bg-blue-500 px-[20px] py-[10px] flex gap-[5px] font-semibold rounded-[8px] text-[14px] text-white">
                                        <img src="../../../public/Phone.svg" alt=""> +998 71 200 70 07
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white mt-[16px] px-[24px] md:rounded-[16px]">
                            <div class="font-bold text-[24px] text-gray-900 pt-[20px]">Описание</div>
                            <div class="pb-[24px] mt-[12px] font-normal text-[16px] text-gray-800">
                                {{ SearchProduct.description }}
                            </div>
                        </div>
                        <div class="bg-white mt-[16px] px-[24px] md:rounded-[16px]">
                            <div class="font-bold text-[24px] pt-[20px]">Продавец</div>
                            <div class="mt-[16px] pb-[20px] flex max-md:flex-col md:items-center justify-between">
                                <div class="flex gap-[12px]">
                                    <div>
                                        <img class="w-[48px] h-[48px] rounded-[10px]" src="../../../public/user.svg"
                                            alt="">
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="font-semibold text-[16px]">Admin</p>
                                        <p class="text-gray-600 text-[12px]">ID: 1326547</p>
                                    </div>
                                </div>
                                <div class="max-md:hidden text-[16px] font-semibold">+998 71 200 70 07</div>
                                <div class="md:hidden flex items-center mt-[23px] justify-between">
                                    <div class="text-[16px] font-semibold">+998 71 200 70 07</div>
                                    <div>
                                        <button class="bg-[rgba(234,237,240,1)] hover:bg-[#cfcfcf] rounded-[8px] px-[12px] py-[8px] text-[12px] font-semibold">Все объявления</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-[16px] w-full md:w-[25%]">
                        <div class="w-full bg-white rounded-[16px]">
                            <div class="p-[16px] max-md:hidden  ">
                                <div class="flex gap-[12px]">
                                    <div>
                                        <img class="w-[40px] h-[40px] rounded-[10px]" src="../../../public/user.svg"
                                            alt="">
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="font-semibold text-[16px]">Admin</p>
                                        <p class="text-gray-600 text-[11px]">ID: 1326547</p>
                                    </div>
                                </div>
                                <div class="mt-[12px]">
                                    <p class="text-[16px] font-semibold text-gray-900 hover:text-blue-500">+998 71 200
                                        70 07</p>
                                </div>
                                <div class="mt-[30px] w-full">
                                    <button
                                        class="text-center w-full py-[10px] font-semibold text-[14px] bg-gray-200 hover:bg-gray-300 rounded-[8px]">
                                        Все объявления
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="w-full bg-white md:rounded-[16px] flex flex-col gap-[10px]">
                            <div class="px-[16px] pt-[16px] font-bold text-[20px]">Местоположение</div>
                            <div class="max-md:hidden ml-[17px] w-full h-[1px] bg-gray-200"></div>
                            <div class="font-medium text-[14px] px-[16px] flex gap-[8px] items-center">
                                <div class="icon-location text-[20px] text-blue-500"></div>
                                <div class="text-[14px]">г.Ташкент, ул.Олмачи 1-й проезд 13 дом</div>
                            </div>
                            <div class="">
                                <img class="w-full h-[150px] rounded-b-[16px]" src="../../../public/Map.png" alt="">
                            </div>
                        </div>
                        <div class="w-full">
                            <button
                                class="text-blue-500 rounded-[8px] w-full bg-blue-100 hover:bg-blue-200 py-[10px] flex justify-center items-center gap-[8px] font-semibold text-[14px]">
                                Скачать в галерею <img src="../../../public/download.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="mb-[100px]">
        <NotFound />
    </div>
</template>

<style scoped></style>