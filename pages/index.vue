<template>
  <div class="max-w-screen-md m-auto">
    <div class="header-container">
      <AppHeader />
      <WeatherMain />
      <WeatherInfo />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import WeatherMain from "@/components/WeatherMain";
import WeatherInfo from "@/components/WeatherInfo";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      location:null,
      gettingLocation: false,
      errorStr:null,
    }
  },
  components: {
    AppHeader,
    WeatherMain,
    WeatherInfo
  },
  computed: {
    ...mapGetters(["store/isSearched"])
  },
  methods: {
    ...mapActions(['store/fetchWeatherData']),
    getCurrentLocation() {
      if(!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }

      this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos.coords;
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        this['store/fetchWeatherData'](coords);
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    }
  },
  created() {
    this.getCurrentLocation();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");

.header-container {
  background-color: #3C6FD1;
  color: white;
  height: 410px;
  text-align: center;
  min-height: 410px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
