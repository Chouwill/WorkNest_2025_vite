
<script setup>
import { reactive, computed, defineEmits } from 'vue'
import citiesJson from './cities.json'

const emits = defineEmits(['change'])

const state = reactive({
  cities: citiesJson,
  districts: [],
  city: '',
  district: '',
})

const onCityChange = () => {
  const cityInfo = state.cities.find(city => city.name === state.city)
  state.districts = cityInfo ? cityInfo.districts : []
  emits('change', { city: state.city, district: '' })
}


const onChange = () => {
  emits('change', { city: state.city, district: state.district })
}

</script>

<template>
  <div class="p-4 bg-gray-50 flex items-center space-x-4">
    <!-- 縣市選單 -->
    <div class="flex-[1.5]">
      <label for="city" class="block text-sm font-medium text-gray-700">選擇縣市</label>
      <select
        id="city"
        v-model="state.city"
        @change="onCityChange"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      >
        <option value="">請選擇縣市</option>
        <option v-for="city in state.cities" :key="city.name" :value="city.name">{{ city.name }}</option>
      </select>
    </div>

    <!-- 行政區選單 -->
    <div class="flex-[1.7]">
      <label for="district" class="block text-sm font-medium text-gray-700">選擇行政區</label>
      <select
        id="district"
        v-model="state.district"
        @change="onChange"
        class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      >
        <option value="">請選擇行政區</option>
        <option v-for="district in state.districts" :key="district.zip" :value="district.name">{{ district.name }}</option>
      </select>
    </div>
  </div>
</template>


