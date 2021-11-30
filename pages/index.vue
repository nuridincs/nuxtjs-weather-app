<template>
  <div id="app" class="app">
    <transition name="fade" mode="out-in" appear>
      <div class="card">
        <!-- <WeatherSearch /> -->
        <WeatherMain />
        <WeatherInfo />
      </div>
    </transition>
  </div>
</template>

<script>
import WeatherSearch from "@/components/WeatherSearch";
import WeatherMain from "@/components/WeatherMain";
import WeatherInfo from "@/components/WeatherInfo";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      location:null,
      gettingLocation: false,
      errorStr:null
    }
  },
  components: {
    WeatherSearch,
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
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos.coords;
        this['store/fetchWeatherData'](this.location);
        // this.setData();
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    },
  },
  created() {
    this.getCurrentLocation();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;0,800;0,900;1,300;1,500&display=swap");
:root {
  --cardWidth: 360px;
  --darkColor: #666;
  --grayColor: #999;
  --cardBgColor: #f1f1f1;
  --cloudAnimateTime: 150s;
  --clearAnimationTime: 120s;
  --snowAnimateTime: 15s;
  --rainAnimateTime: 70s;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}
body {
  background-color: #E5E5E5;
  overflow: hidden;
}
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  max-width: var(--cardWidth);
  width: 100%;
  padding: 40px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0 0 70px fade(black, 30);
  z-index: 9999;
  background-color: var(--cardBgColor);

  @media (max-height: 767px) {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 30px;
  }
}

.footer-text {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    text-shadow: 0 2px 3px fade(black, 20);
    span {
      font-size: 18px;
      margin-left: 5px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>