<template>
  <div class="container mx-auto px-4 mt-10 text-left">
    <div class="text-lg text-black py-5">Details</div>
      <div class="flex justify-between">
        <div class="card-info">
          <div class="flex justify-around items-center p-5">
            <div>
              <img src="~static/icons/tmp.png" alt="">
            </div>
            <div>
              <div class="text-black">{{ getWeatherInfo.temp | round }}°</div>
              <div class="text-gray-400">Fahrenheit</div>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="flex justify-around items-center p-5">
            <div>
              <img src="~static/icons/pressure.png" alt="">
            </div>
            <div>
              <div class="text-black">{{ getWeatherInfo.wind }}</div>
              <div class="text-gray-400">Pressure</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="card-info">
          <div class="flex justify-around items-center p-5">
            <div>
              <img src="~static/icons/uv.png" alt="">
            </div>
            <div>
              <div class="text-black">{{ getWeatherInfo.clouds }}</div>
              <div class="text-gray-400">UV Index</div>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="flex justify-around items-center p-5">
            <div>
              <img src="~static/icons/humidity.png" alt="">
            </div>
            <div>
              <div class="text-black">{{ getWeatherInfo.humidity }}%</div>
              <div class="text-gray-400">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="py-5 text-xl text-black">Tips</div>
        <div class="flex justify-around tips">
          <div>
            <img src="~static/icons/star.png" alt="">
          </div>
          <div class="text-black">Its ok to hangout with your friend!</div>
        </div>
      </div>

      <div class="py-5">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" @click="toggle()">Add Location</button>
      </div>
      <ModalMaps v-if="modalMaps" @close="toggle()" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalMaps from '@/components/ModalMaps';

export default {
  data() {
    return {
      modalMaps: false,
    }
  },

  components: {
    ModalMaps
  },

  computed:{
    ...mapGetters(["store/getWeatherInfo"]),
    getWeatherInfo() {
      return this["store/getWeatherInfo"]
    }
  },

  methods: {
    toggle() {
      this.modalMaps = !this.modalMaps;
    },
  }
};
</script>

<style lang="scss" scoped>
  .card-info {
    background-color: #FFFFFF;
    width: 50%;
    border-radius: 10px;
    margin: 0.5rem;
  }

  .tips {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1rem;
    align-items: center;
  }
</style>
