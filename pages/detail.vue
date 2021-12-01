<template>
  <div class="max-w-screen-md m-auto">
    <div class="header-container">
      <AppHeader />
      <div class="flex justify-evenly tab">
        <div>
          <a href="#" class="active">Fanrenheit</a>
        </div>
        <div>
          <a href="#">Celcius</a>
        </div>
      </div>
      <div class="my-5">
        <img src="~static/images/rain.png" class="m-auto" alt="">
      </div>
      <div class="text-large">72°</div>
      <div> 52.498611, 13.406889 </div>
      <div class="my-5">
        <div class="text-xl">Partly Cloudy</div>
        <div class="text-sm">Tuesday, 24 August 2021</div>
      </div>
    </div>

    <div class="container mx-auto px-4 mt-5">
      <div class="text-lg">Details</div>
      <div class="flex justify-between">
        <div class="card-info">
          <div class="flex justify-around items-center p-5">
            <div>
              <img src="~static/icons/tmp.png" alt="">
            </div>
            <div>
              <div>72°</div>
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
              <div>134 mp/h</div>
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
              <div>0.2</div>
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
              <div>48%</div>
              <div class="text-gray-400">Humidity</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="py-5 text-xl">Tips</div>
        <div class="flex justify-around tips">
          <div>
            <img src="~static/icons/star.png" alt="">
          </div>
          <div>Its ok to hangout with your friend!</div>
        </div>
      </div>

      <div class="mb-5">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" @click="toggle()">Add Location</button>
      </div>
    </div>

    <ModalMaps v-if="modalMaps" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import ModalMaps from '@/components/ModalMaps';

export default {
  data() {
    return {
      modalMaps: false,
    }
  },

  components: {
    AppHeader,
    ModalMaps,
  },

  methods: {
    toggle() {
      this.modalMaps = !this.modalMaps;
    },
  }
}
</script>

<style lang="scss" scoped>
  .header-container {
    background-color: #3C6FD1;
    color: white;
    height: 410px;
    text-align: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .tab {
    width: 70%;
    margin: 0 auto;
    border-radius: 20px;
    padding: 0.5rem;
    background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
  }

  .text-large {
    font-size: 36px;
  }

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
