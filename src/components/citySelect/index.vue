
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
  <div>
    <select v-model="state.city" @change="onCityChange">
      <option value="">請選擇</option>
      <option v-for="city in state.cities" :key="city.name" :value="city.name">{{ city.name }}</option>
    </select>
    <select v-model="state.district" @change="onChange">
      <option value="">請選擇</option>
      <option v-for="district in state.districts" :key="district.zip" :value="district.name">{{ district.name }}</option>
    </select>
  </div>
</template>