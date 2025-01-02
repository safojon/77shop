<script setup>
import { Products } from "../../data/data";
import Prodect from "../../components/Products/ProdectItem.vue";
import LoadingCard from "../../components/Loading.vue";
import Navbar from '../../components/navbar.vue';
import { Countrys, Citys } from "../../data/data";
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const ListCountries = ref(false);
const ListCitys = ref(false);
const Radio = ref(false);

const products = ref([]);
const filterProducts = ref([]);
const loading = ref(false);

const search = ref("");
const Filter = ref(false);
const Menu = ref(JSON.parse(localStorage.getItem("Menu")));


const listCountries = () => {
    ListCountries.value = !ListCountries.value;
};

const selecteCountriy = (id) => {
    ListCountries.value = !ListCountries.value;
    router.push({ query: { ...route.query, region_id: id } });
};

const selectedCountriy = computed(() => {
    const countryId = parseInt(route.query.region_id);
    const country = Countrys.find(country => country.id === countryId);
    return country ? country.name : 'Выберите регион';
});

const listCitys = () => {
    ListCitys.value = !ListCitys.value;
};

const selecteCitys = (id) => {
    ListCitys.value = !ListCitys.value;
    router.push({ query: { ...route.query, district_id: id } });
};

const selectedCitys = computed(() => {
    const cityId = parseInt(route.query.district_id);
    const city = Citys.find(city => city.id === cityId);
    return city ? city.name : 'Выберите район/город';
});

const filteredCitys = computed(() => {
    const countryId = parseInt(route.query.region_id);
    return Citys.filter(city => city.country === countryId);
});

watch(Radio, () => {
    router.push({ query: { ...route.query, ordering: Radio.value } });
});


const Search = computed(() => {
    return Products.filter((row) =>
        row.name.toLowerCase().includes(search.value.toLowerCase())
    );
});

function LoadCategory() {
    loading.value = true;
    setTimeout(() => {
        products.value = Search.value.map((item) => ({
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
    }, 500);
}

watch(Search, () => {
    LoadCategory();
});

onMounted(() => {
    LoadCategory();
});


const FilterBtn = () => {
    Filter.value = !Filter.value;
};

const closeFilter = () => {
    Filter.value = false;
};

const MenuBtn = (type) => {
    if (type == 'list') {
        Menu.value = true;
        localStorage.setItem("Menu", JSON.stringify(true));
    } else if (type == 'grid') {
        Menu.value = false;
        localStorage.setItem("Menu", JSON.stringify(false));
    }
};
</script>

<template>
    <Navbar />
    <div class="mt-[112px] w-full flex justify-center">
        <div class="w-[1440px] md:px-[128px] flex gap-[24px]">
            <div class="max-md:hidden">
                <div class="flex items-center gap-[6px]">
                    <router-link to="/">
                        <div class="font-medium text-[14px]">Главная</div>
                    </router-link>
                    <div class="w-[4px] h-[4px] bg-[rgba(213,216,219,1)] rounded-[4px]"></div>
                    <div class="font-medium text-[14px] text-[rgba(184,187,189,1)] cursor-pointer">Объявления</div>
                </div>
                <div class="w-[278px] h-[974px] bg-[rgba(255,255,255,1)] mt-[30px] rounded-[12px] p-[16px]">
                    <div class="font-semibold text-[20px]">
                        Фильтр <router-link to="/products/">
                            <button :class="Object.keys(route.query).length > 0 ? '' : 'hidden'"
                                class="ml-[109px] text-[13px] font-normal text-[rgba(56,143,243,1)]   ">Сбросить</button></router-link>
                    </div>
                    <div class="mt-[16px]">
                        <div class="font-medium text-[14px] text-[rgba(99,103,108,1)]">Регион</div>
                        <div>
                            <button @click="listCountries"
                                class="flex items-center gap-[20px] text-start px-[12px] font-normal text-[14px] w-[246px] h-[44px] rounded-[8px] border-[1px] border-[rgba(234,237,240,1)]">
                                <p class="w-[200px]">{{ selectedCountriy }}</p>
                                <p :class="!ListCountries ? '' : 'rotate-90'"
                                    class="transition-transform duration-300 icon-stroke text-[10px] text-[rgba(142,146,151,1)]">
                                </p>
                            </button>
                        </div>
                        <transition name="citys">
                            <div v-if="ListCountries"
                                class="transition rounded-[8px] drop-shadow-lg bg-white absolute w-[246px] z-20">
                                <ul class="rounded-[8px]">
                                    <li v-for="country in Countrys" :key="country.id"
                                        class="px-4 py-2 cursor-pointer hover:text-[rgba(56,143,243,1)] border-b-[1px]"
                                        @click="selecteCountriy(country.id)">
                                        {{ country.name }}
                                        <span
                                            :class="selectedCountriy == country.name ? 'icon-check-mark text-[9px] pl-1 text-[rgba(56,143,243,1)]' : 'hidden'"></span>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                    <div class="mt-[16px]">
                        <div class="font-medium text-[14px] text-[rgba(99,103,108,1)]">Регион</div>
                        <div>
                            <button @click="listCitys" :disabled="filteredCitys.length === 0"
                                class="flex items-center gap-[20px] text-start px-[12px] font-normal text-[14px] w-[246px] h-[44px] rounded-[8px] border-[1px] border-[rgba(234,237,240,1)]">
                                <p :class="filteredCitys.length > 0 ? 'hidden' : ''" class="w-[200px] text-[#707070]">
                                    Выберите район/город</p>
                                <p :class="filteredCitys.length > 0 ? '' : 'hidden'" class="w-[200px]">{{ selectedCitys
                                    }}</p>
                                <p :class="!ListCitys ? '' : 'rotate-90'"
                                    class="transition-transform duration-300 icon-stroke text-[10px] text-[rgba(142,146,151,1)]">
                                </p>
                            </button>
                        </div>
                        <transition name="citys">
                            <div v-if="ListCitys"
                                class="transition rounded-[8px] drop-shadow-lg bg-white absolute w-[246px] z-10">
                                <ul class="rounded-[8px]">
                                    <li v-for="city in filteredCitys" :key="city.id"
                                        class="px-4 py-2 cursor-pointer hover:text-[rgba(56,143,243,1)] border-b-[1px]"
                                        @click="selecteCitys(city.id)">
                                        {{ city.name }}
                                        <span
                                            :class="selectedCitys == city.name ? 'icon-check-mark text-[9px] pl-1 text-[rgba(56,143,243,1)]' : 'hidden'"></span>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                    <div class="font-medium text-[14px] text-[rgba(99,103,108,1)] mt-[20px]">Сортировать</div>
                    <div class="flex flex-col text-[rgba(22,25,29,1)] absolute">
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input v-model="Radio" class="w-[20px] h-[20px]" type="radio" id="price" name="radio"
                                value="price" :checked />
                            <label for="price">Дешёвые сперва</label>
                        </div>
                        <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input v-model="Radio" class="w-[20px] h-[20px]" type="radio" id="-price" name="radio"
                                value="-price" />
                            <label for="-price">Дорогие сперва</label>
                        </div>
                        <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                        <div class="flex items-center gap-[10px] font-medium h-[44px]">
                            <input v-model="Radio" class="w-[20px] h-[20px]" type="radio" id="published_at" name="radio"
                                value="published_at" />
                            <label for="published_at">Новые сперва</label>
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
                <div class="font-bold text-[32px] max-md:mx-[17px] flex items-center gap-[14px]">
                    <router-link to="/" class="md:hidden">
                        <div class="icon-arrow text-[20px] mt-[5px]"></div>
                    </router-link>
                    <div>Результаты поиска</div>
                </div>
                <div class="flex h-[10px] w-full items-center gap-[15px] max-md:px-[17px] mt-[24px]">
                    <div class="w-full relative">
                        <span class="icon-search text-[rgba(213,216,219,1)] absolute top-4 left-3 text-[15px]"></span>
                        <input v-model="search" placeholder="Поиск..." class="w-full h-[44px] rounded-[8px] pl-[42px]"
                            type="text">
                    </div>
                    <div class="md:hidden">
                        <button @click="FilterBtn" class="rounded-[8px] px-[8px] py-[8px]">
                            <img class="text-[55px]" src="../../../public/filter.svg" alt="">
                        </button>
                    </div>
                    <div>
                        <button @click="MenuBtn('list')"
                            :class="Menu ? 'text-[rgba(56,143,243,1)]' : 'text-[rgba(184,187,189,1)]'"
                            class="icon-colum text-[25px]"></button>
                    </div>
                    <div>
                        <button @click="MenuBtn('grid')"
                            :class="!Menu ? 'text-[rgba(56,143,243,1)]' : 'text-[rgba(184,187,189,1)]'"
                            class="icon-menu text-[25px]"></button>
                    </div>
                </div>
                <div class="text-[rgba(142,146,151,1)] font-medium text-[14px] max-md:ml-[17px] mt-[30px]">
                    {{ filterProducts.length }}
                    объявлений</div>
                <div :class="(filterProducts.length > 0) ? '' : 'hidden'">
                    <div v-if="loading"
                        class="grid pb-10 mt-10 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5">
                        <LoadingCard type="product" v-for="i in 12" :key="i" />
                    </div>
                    <div v-else :class="!Menu ? 'grid max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 pb-10 gap-x-5 gap-y-5'
                        : ''" class="mt-10">
                        <div v-for="product in filterProducts" :key="product.id">
                            <Prodect :id="product.id" :type="!Menu ? 'grid' : 'list'" :photo="product.photo"
                                :country="product.country" :name="product.name" :description="product.description"
                                :date="product.date" :number="product.number" :price="product.price"
                                :currency="product.currency" />
                        </div>
                    </div>
                </div>
                <div :class="(filterProducts.length < 1) ? '' : 'hidden'"
                    class="ml-[100px] mt-[30px] flex flex-col items-center">
                    <div><img src="../../../public/no-data.svg" alt=""></div>
                    <div class="font-bold text-[20px]">Объявлений нет</div>
                    <div class="font-normal text-[13px]">Упс! Мы не смогли найти ни одного подходящего результата по
                        вашему запросу</div>
                </div>

            </div>
        </div>
    </div>


    <div v-if="Filter" class="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="w-[378px] h-[550px] bg-white rounded-[12px] flex flex-col p-[16px]">
            <div class="w-full bg-[rgba(255,255,255,1)] rounded-[12px]">
                <div class="w-full font-semibold text-[20px] flex justify-between">
                    <div>Фильтр</div>
                    <div><button @click="closeFilter">X</button></div>
                </div>
                <div class="mt-[16px] w-full">
                    <div class="font-medium text-[14px] text-[rgba(99,103,108,1)]">Регион</div>
                    <div>
                        <button @click="listCountries"
                            class="flex items-center gap-[20px] text-start px-[12px] font-normal text-[14px] w-full h-[44px] rounded-[8px] border-[1px] border-[rgba(234,237,240,1)]">
                            <p class="w-full">{{ selectedCountriy }}</p>
                            <p :class="!ListCountries ? '' : 'rotate-90'"
                                class="transition-transform duration-300 icon-stroke text-[10px] text-[rgba(142,146,151,1)]">
                            </p>
                        </button>
                    </div>
                    <transition name="citys">
                        <div v-if="ListCountries"
                            class="transition rounded-[8px] drop-shadow-lg bg-white absolute w-[345px] z-20">
                            <ul class="rounded-[8px]">
                                <li v-for="country in Countrys" :key="country.id"
                                    class="px-4 py-2 cursor-pointer hover:text-[rgba(56,143,243,1)] border-b-[1px]"
                                    @click="selecteCountriy(country.id)">
                                    {{ country.name }}
                                    <span
                                        :class="selectedCountriy == country.name ? 'icon-check-mark text-[9px] pl-1 text-[rgba(56,143,243,1)]' : 'hidden'"></span>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <div class="mt-[16px]">
                    <div class="font-medium text-[14px] text-[rgba(99,103,108,1)]">Регион</div>
                    <div>
                        <button @click="listCitys" :disabled="filteredCitys.length === 0"
                            class="flex items-center gap-[20px] text-start px-[12px] font-normal text-[14px] w-full h-[44px] rounded-[8px] border-[1px] border-[rgba(234,237,240,1)]">
                            <p :class="filteredCitys.length > 0 ? 'hidden' : ''" class="w-[200px] text-[#707070]">
                                Выберите район/город</p>
                            <p :class="filteredCitys.length > 0 ? '' : 'hidden'" class="w-full">{{ selectedCitys
                                }}</p>
                            <p :class="!ListCitys ? '' : 'rotate-90'"
                                class="transition-transform duration-300 icon-stroke text-[10px] text-[rgba(142,146,151,1)]">
                            </p>
                        </button>
                    </div>
                    <transition name="citys">
                        <div v-if="ListCitys"
                            class="transition rounded-[8px] drop-shadow-lg bg-white absolute w-[345px] z-10">
                            <ul class="rounded-[8px]">
                                <li v-for="city in filteredCitys" :key="city.id"
                                    class="px-4 py-2 cursor-pointer hover:text-[rgba(56,143,243,1)] border-b-[1px]"
                                    @click="selecteCitys(city.id)">
                                    {{ city.name }}
                                    <span
                                        :class="selectedCitys == city.name ? 'icon-check-mark text-[9px] pl-1 text-[rgba(56,143,243,1)]' : 'hidden'"></span>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <div class="font-medium text-[14px] text-[rgba(99,103,108,1)] mt-[20px]">Сортировать</div>
                <div class="flex flex-col text-[rgba(22,25,29,1)] absolute">
                    <div class="flex items-center gap-[10px] font-medium h-[44px]">
                        <input v-model="Radio" class="w-[20px] h-[20px]" type="radio" id="price" name="radio"
                            value="price" :checked />
                        <label for="price">Дешёвые сперва</label>
                    </div>
                    <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                    <div class="flex items-center gap-[10px] font-medium h-[44px]">
                        <input v-model="Radio" class="w-[20px] h-[20px]" type="radio" id="-price" name="radio"
                            value="-price" />
                        <label for="-price">Дорогие сперва</label>
                    </div>
                    <div class="w-[230px] h-[1px] bg-[rgba(234,237,240,1)] relative left-8"></div>
                    <div class="flex items-center gap-[10px] font-medium h-[44px]">
                        <input v-model="Radio" class="w-[20px] h-[20px]" type="radio" id="published_at" name="radio"
                            value="published_at" />
                        <label for="published_at">Новые сперва</label>
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
