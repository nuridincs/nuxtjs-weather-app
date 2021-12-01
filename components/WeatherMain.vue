<template>
  <div>
    <div class="flex justify-evenly tab">
      <div>
        <a href="#" class="active" @click="changeTemp('imperial')">Fanrenheit</a>
      </div>
      <div>
        <a href="#" @click="changeTemp('metric')">Celcius</a>
      </div>
    </div>
    <div>
      <img :src="icon" class="m-auto" alt="">
    </div>
    <div class="text-large">{{ getWeatherMain.temp | round }}°</div>
    <div> {{ coordinate.lat }}, {{ coordinate.lng }} </div>
    <div class="my-5">
      <div class="text-xl capitalize">{{ getWeatherMain.description }}</div>
      <div class="text-sm">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      date: null,
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
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.date = date;
    },

    changeTemp(unit) {
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
