<template>
  <div>
    <div class="grid grid-cols-2 gap-4 tab">
      <div>
        <a href="#" :class="{ 'text-gray-300' : isActive === 'imperial' }" @click="changeTemp('imperial')">Fanrenheit</a>
      </div>
      <div>
        <a href="#" :class="{ 'text-gray-300' : isActive === 'metric' }" @click="changeTemp('metric')">Celcius</a>
      </div>
    </div>
    <div>
      <img :src="icon" class="m-auto" alt="">
    </div>
    <div class="text-large">{{ getWeatherMain.temp | round }}°</div>
    <div class="text-gray-300"> {{ coordinate.lat }}, {{ coordinate.lng }} </div>
    <div class="my-5">
      <div class="text-xl capitalize">{{ getWeatherMain.description }}</div>
      <div class="text-sm text-gray-300">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      date: null,
      isActive: 'imperial'
    };
  },

  computed: {
    ...mapGetters(["store/getWeatherMain"]),
    getWeatherMain() {
      return this["store/getWeatherMain"];
    },
    icon() {
      return `http://openweathermap.org/img/wn/${this.getWeatherMain.icon}d@2x.png`;
    },
    coordinate() {
      return this.$store.state.store.coordinate;
    }
  },

  created() {
    this.getNow();
  },

  methods: {
    ...mapActions(['store/fetchWeatherData', 'store/setUnit']),
    getNow() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const now = new Date();
        const date = days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear()
        this.date = date;
    },

    changeTemp(unit) {
      this.isActive = unit;
      this['store/setUnit'](unit);
      this['store/fetchWeatherData'](this.coordinate);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
