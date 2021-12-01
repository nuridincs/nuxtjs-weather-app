<template>
  <BaseModalWindow id="modal-maps" :is-solid="true" :is-wide="true" @close="$emit('close')">
    <template #header-middle>
      <div class="text-center text-sm">Change Location</div>
    </template>

    <div class="has-search">
        <img src="~static/icons/search.png" class="form-control-feedback" alt="Search"  />
        <gmap-autocomplete
          name="search"
          class="form-control input-search"
          :options="options"
          @place_changed="setPlace" />
    </div>
    <LoadingSpinner v-if="isLoading" key="isLoading" />
    <div class="maps-content">
      <Maps
        :data-place="place"
        @is-drag="setDrag"
        @set-address="setAddress" />
    </div>
    <div class="fixed-bottom shadow bg-white p-3">
      <div v-if="detailAddress.province" class="maps-info">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="mr-5">
              <img src="~static/icons/map.png" alt="map"  />
            </div>

            <div>
              <div class="font-medium text-black">
                {{ detailAddress.districts }}
              </div>
              <div class="text-sm text-gray-400">
                {{ detailAddress.province }} {{ detailAddress.country }}
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <div class="mr-2">
              <!-- <img src="~static/images/rain.png" alt="sun" /> -->
            </div>
            <div class="text-black">
              {{ getWeatherInfo.temp | round }}°
            </div>
          </div>
        </div>
        <hr class="my-5" />

        <div class="flex justify-between items-center">
          <div class="mr-2">
            <div class="text-md text-black">Longitude and latitude</div>
            <div class="text-gray-400 text-sm">{{ detailAddress.center.lng }}, {{ detailAddress.center.lat }}</div>
          </div>
          <div class="text-black">
            <div class="text-sm">Wind</div>
            <div class="text-gray-400">{{ getWeatherInfo.wind }} mp/h</div>
          </div>
        </div>
        <hr class="my-5" />
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto w-full" @click="handleSelectLocation">
        <span class="text-uppercase">Change Location</span>
      </button>
    </div>
  </BaseModalWindow>
</template>

<script>
import Maps from '@/components/Maps';
import { mapGetters } from "vuex";

export default {
  components: {
    Maps,
  },

  data() {
    return {
      detailAddress: {},
      isLoading: false,
      isDrag: false,
      coordinate: {
        lat: 0,
        lon: 0,
      },
      place: {},
      options: {
        fields: ['geometry', 'address_components', 'formatted_address', 'name'],
      },
    };
  },

  computed: {
    ...mapGetters(["store/getWeatherInfo"]),
    getWeatherInfo() {
      return this["store/getWeatherInfo"];
    }
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    handleSelectLocation() {
      this.$emit('close');
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordinate = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // this.geocoder(this.coordinate);
      });
    },

    setPlace(place) {
      this.place = place;
    },

    setDrag(payload) {
      this.isDrag = payload;
    },

    setAddress(payload) {
      this.detailAddress = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
#modal-maps {-bottom {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
    bottom: 0;
  }

  .maps-info {
    padding: 1rem;

    .detail-address {
      margin: 1rem 0;
    }
  }

  .maps-content {
    background: #eee;
    height: 100%;
  }

  .has-search {
    display: flex;
    align-items: center;
    background-color: #E5E5E5;
  }

  .input-search {
    padding-left: 2.375rem;
    background-color: #ffffff;
    border: none;
    height: 36px;
    border-radius: 20px;
    margin: 1rem;
    width: 100%;
    color: black;
  }

  .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 1rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
    margin: 0 30px;
  }
}
</style>
