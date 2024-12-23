<script setup>
import Navbar from '../../components/navbar.vue';
import { Countrys, Citys } from "../../data/data";
import { ref } from 'vue';
const ListCountries = ref(false);
const ListCitys = ref(false);
const selectedCountriy = ref(localStorage.getItem("selectedCountriy") || "");
const selectedCity = ref(localStorage.getItem("selectedCity") || "");

const listCountries = () => {
    ListCountries.value = !ListCountries.value;
};

const selecteCountriy = (name) => {
    selectedCountriy.value = name;
    localStorage.setItem("selectedCountriy", name);
    ListCountries.value = !ListCountries.value;
};

const listCitys = () => {
    ListCitys.value = !ListCitys.value;
};

const selectCity = (name) => {
    selectedCity.value = name;
    localStorage.setItem("selectedCity", name);
    ListCitys.value = !ListCitys.value;
};

</script>

<template>
    <Navbar />
    <div class="mt-[112px] w-full flex justify-center">
        <div class="w-[1440px] px-[128px] flex gap-[24px]">
            <div class="">
                <div class="flex items-center gap-[6px]">
                    <router-link to="/">
                        <div class="font-medium text-[14px]">Главная</div>
                    </router-link>
                    <div class="w-[4px] h-[4px] bg-[rgba(213,216,219,1)] rounded-[4px]"></div>
                    <div class="font-medium text-[14px] text-[rgba(184,187,189,1)] cursor-pointer">Объявления</div>
                </div>
                <div class="w-[278px] h-[974px] bg-[rgba(255,255,255,1)] mt-[30px] rounded-[12px] p-[16px]">
                    <div class="font-semibold text-[20px]">
                        Фильтр
                    </div>
                    <div class="mt-[16px]">
                        <div class="font-medium text-[14px] text-[rgba(99,103,108,1)]">Регион</div>
                        <div>
                            <button @click="listCountries"
                                class="flex items-center gap-[40px] text-start px-[12px] font-normal text-[14px] w-[246px] h-[44px] rounded-[8px] border-[1px] border-[rgba(234,237,240,1)]">
                                <p :class="selectedCountriy ? '' : 'hidden'" class="w-[200px] text-[rgba(22,25,29,1)]">
                                    {{ selectedCountriy }}</p>
                                <p :class="selectedCountriy ? 'hidden' : ''" class="w-[200px] text-[rgba(22,25,29,1)]">
                                    Все</p>
                                <p :class="!selectedCountriy ? '' : 'rotate-90'"
                                    class="transition-transform duration-300 icon-stroke text-[10px] text-[rgba(142,146,151,1)]">
                                </p>
                            </button>
                        </div>
                        <transition name="citys">
                            <div v-if="ListCountries"
                                class="transition rounded-[8px] drop-shadow-lg bg-white absolute w-[246px] z-10">
                                <ul class="rounded-[8px]">
                                    <li v-for="country in Countrys" :key="country.id"
                                        class="px-4 py-2 cursor-pointer hover:text-[rgba(56,143,243,1)] border-b-[1px]"
                                        @click="selecteCountriy(country.name)">
                                        {{ country.name }}
                                        <span
                                            :class="selectedCountriy == country.name ? 'icon-check-mark text-[9px] pl-1 text-[rgba(56,143,243,1)]' : 'hidden'"></span>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>

                    <div class="mt-[16px]">
                        <div class="font-medium text-[14px] text-[rgba(99,103,108,1)]">Район/город</div>
                        <div>
                            <button @click="listCitys"
                                class="flex items-center gap-[40px] text-start px-[12px] font-normal text-[14px] w-[246px] h-[44px] rounded-[8px] border-[1px] border-[rgba(234,237,240,1)]">
                                <p :class="selectedCity ? '' : 'hidden'" class="w-[200px] text-[rgba(22,25,29,1)]">
                                    {{ selectedCity }}</p>
                                <p :class="selectedCity ? 'hidden' : ''" class="w-[200px] text-[rgba(22,25,29,1)]">Все
                                </p>
                                <p :class="!selectedCity ? '' : 'rotate-90'"
                                    class="transition-transform duration-300 icon-stroke text-[10px] text-[rgba(142,146,151,1)]">
                                </p>
                            </button>
                        </div>
                        <transition name="citys">
                            <div v-if="ListCitys"
                                class="transition rounded-[8px] drop-shadow-lg bg-white absolute w-[246px] z-10">
                                <ul class="rounded-[8px]">
                                    <li v-for="city in Citys" :key="city.id"
                                        class="px-4 py-2 cursor-pointer hover:text-[rgba(56,143,243,1)] border-b-[1px]"
                                        @click="selectCity(city.name)">
                                        {{ city.name }}
                                        <span
                                            :class="selectedCity == city.name ? 'icon-check-mark text-[9px] pl-1 text-[rgba(56,143,243,1)]' : 'hidden'"></span>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                    <div class="font-medium text-[14px] text-[rgba(99,103,108,1)] mt-[20px]">Сортировать</div>
                    <div class="flex flex-col text-[rgba(22,25,29,1)] absolute">
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input class="w-[20px] h-[20px]" type="radio" name="" id=""> Дешёвые сперва
                        </div>
                        <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                        <div class="pr-[10px] flex items-center gap-[10px] font-medium h-[44px]">
                            <input class="w-[20px] h-[20px]" type="radio" name="" id=""> Дорогие сперва
                        </div>
                        <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input class="w-[20px] h-[20px]" type="radio" name="" id=""> Новые сперва
                        </div>

                    </div>
                    <div class="font-medium text-[14px] text-[rgba(99,103,108,1)] mt-[150px]">Подкатегории</div>
                    <div class="flex flex-col text-[rgba(22,25,29,1)] absolute">
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input class="w-[20px] h-[20px]" type="checkbox" name="" id=""> Все разделы
                        </div>
                        <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                        <div class="pr-[10px] flex items-center gap-[10px] font-medium h-[44px]">
                            <input class="w-[20px] h-[20px]" type="checkbox" name="" id=""> Парфюмерия
                        </div>
                        <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input class="w-[20px] h-[20px]" type="checkbox" name="" id=""> Лицо
                        </div>

                    </div>
                </div>
            </div>
            <div class="mt-[40px] w-full">
                <div class="font-bold text-[32px]">Результаты поиска</div>
                <div class="w-full mt-[12px] relative flex">
                    <span class="icon-search text-[rgba(213,216,219,1)] absolute top-4 left-3 text-[15px]"></span>
                    <input class="w-full h-[44px] rounded-[8px] pl-[42px]" type="text">
                </div>
                <div class="text-[rgba(142,146,151,1)] font-medium text-[14px] mt-[16px]">0 объявлений</div>
                <div class="ml-[100px] mt-[80px] flex flex-col items-center">
                    <div><img src="../../../public/no-data.svg" alt=""></div>
                    <div class="font-bold text-[20px]">Объявлений нет</div>
                    <div class="font-normal text-[13px]">Упс! Мы не смогли найти ни одного подходящего результата по вашему запросу</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.citys-enter-active,
.citys-leave-active {
    transition: 0.3s;
}

.citys-enter-from,
.citys-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
