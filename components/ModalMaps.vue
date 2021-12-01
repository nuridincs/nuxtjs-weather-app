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
        :center-loc="centerLoc"
        @is-drag="setDrag"
        @set-address="setAddress" />
    </div>
    <div class="fixed-bottom shadow bg-white p-3">
      <div v-if="detailAddress.districts" class="maps-info">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="mr-5">
              <img src="~static/icons/map.png" alt="map"  />
            </div>

            <div>
              <div class="font-bold">
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
            <div>
              72°
            </div>
          </div>
        </div>
        <hr class="my-5" />

        <div class="flex justify-between items-center">
          <div class="mr-2">
            <div class="text-sm">Longitude and latitude</div>
            <div>{{ detailAddress.center.lng }}, {{ detailAddress.center.lat }}</div>
          </div>
          <div>
            <div class="text-sm">Wind</div>
            <div>134 mp/h</div>
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

export default {
  components: {
    Maps,
  },
  props: {
    centerLoc: {
      type: Object,
      default: () => ({
        lat: -6.1841327, lng: 106.8293633,
      }),
    },
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

  mounted() {
    this.geolocate();
  },

  methods: {
    handleSelectLocation() {
      this.$emit('set-place', this.address);
      this.$emit('close');
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordinate = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },

    setPlace(place) {
      this.place = place;
    },

    setDrag(payload) {
      this.isDrag = payload;
    },

    setAddress(payload) {
      console.log(payload);
      this.detailAddress = payload;
    },
  },
};
</script>

<style lang="scss" scoped>
#modal-maps {
  .fixed-bottom {
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
  }

  .input-search {
    padding-left: 2.375rem;
    background-color: #eeeeee;
    border: none;
    height: 36px;
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
    margin: 0 10px;
  }
}
</style>
