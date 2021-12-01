<template>
  <div>
    <gmap-map
      id="map"
      ref="map"
      :center="center"
      :zoom="15"
      :options="mapOptions"
      style="width:100%;  height: 600px;"
      @center_changed="centerChanged">
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="markerOptions"
        @drag="updateCoordinates"
        @click="center=m.position" />
    </gmap-map>
  </div>
</template>

<script>

export default {
  name: 'GoogleMap',

  props: {
    dataPlace: {
      type: Object,
      default: () => {},
    },

    centerLoc: {
      type: Object,
      default: () => ({
        lat: -6.1841327, lng: 106.8293633,
      }),
    },
  },

  data() {
    return {
      center: {},
      markers: [],
      places: [],
      currentPlace: null,
      coordinates: {},
      mapOptions: {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
      },
      markerOptions: {
        url: '/icons/marker.svg',
      },
    };
  },

  watch: {
    dataPlace(value) {
      this.currentPlace = value;
      this.addMarker();
    },
  },

  created() {
    this.center = this.centerLoc;
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.geolocate();
      this.setDefault();
      this.$nextTick(() => {
        this.$refs.map.$gmapApiPromiseLazy().then(this.loadControls(this.$refs.map.$mapObject));
      });
    },

    setDefault() {
      const coordinates = {
        latLng: {
          lat: this.center.lat,
          lng: this.center.lng,
        },
      };

      // this.geocoder(coordinates);
    },

    loadControls(map) {
      const controlDiv = document.createElement('div');
      const firstChild = document.createElement('button');
      const imgMyLoc = 'url("/icons/my-location.svg")';
      firstChild.style.backgroundColor = '#fff';
      firstChild.style.border = 'none';
      firstChild.style.outline = 'none';
      firstChild.style.width = '28px';
      firstChild.style.height = '28px';
      firstChild.style.borderRadius = '2px';
      firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      firstChild.style.cursor = 'pointer';
      firstChild.style.marginRight = '10px';
      firstChild.style.padding = '0px';
      firstChild.style.position = 'fixed';
      firstChild.style.bottom = '250px';
      firstChild.style.right = '0';
      firstChild.title = 'my-location';
      controlDiv.appendChild(firstChild);
      const secondChild = document.createElement('div');
      secondChild.style.height = '30px';
      secondChild.style.backgroundImage = imgMyLoc;
      secondChild.style.backgroundSize = '1.7rem';
      secondChild.style.backgroundPosition = '0px 0px';
      secondChild.style.backgroundRepeat = 'no-repeat';
      secondChild.id = 'current-location-id';
      firstChild.appendChild(secondChild);
      // window.google.maps.event.addListener(this.$refs.map.$mapObject, 'center_changed', () => {
      //   secondChild.style['background-position'] = '0 0';
      // });
      firstChild.addEventListener('click', () => {
        let imgX = '0';
        const animationInterval = setInterval(() => {
          imgX = imgX === '-18' ? '0' : '-18';
          secondChild.style['background-position'] = `${imgX}px 0`;
        }, 500);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latlng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(latlng);
            clearInterval(animationInterval);
            // secondChild.style['background-position'] = '-144px 0';
          });
        } else {
          clearInterval(animationInterval);
          secondChild.style['background-position'] = '0 0';
        }
      });
      controlDiv.index = 1;
      // this.$refs.map.$mapObject.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers = [];
        this.markers.push({ position: marker });
        this.center = marker;
        this.currentPlace = null;
        this.setData(this.dataPlace.formatted_address, marker, this.dataPlace.name);
      }
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('location ', position);
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.markers.push({ position: this.center });
        // this.geocoder({ latLng: this.center });
      });
    },

    updateCoordinates(location) {
      this.coordinates = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };

      this.center = this.coordinates;
      // this.geocoder(location);
    },

    geocoder(event) {
      this.$emit('is-drag', true);
      const geocoder = new window.google.maps.Geocoder(document.getElementById('map'));
      console.log('geocoder ', geocoder);
      geocoder.geocode({ latLng: event.latLng }, (result, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.setData(result[0].formatted_address, this.coordinates);
          this.$emit('is-drag', true);
        }
      });
    },

    setData(address, coordinate = {}, name = null) {
      const dataAddress = {
        name,
        address,
        coordinate,
        center: this.center,
      };

      this.$emit('set-address', dataAddress);
    },

    centerChanged(payload) {
      const coordinate = {
        latLng: {
          lat: payload.lat(),
          lng: payload.lng(),
        },
      };

      this.markers = [];
      this.markers.push({ position: coordinate.latLng });
      // this.geocoder(coordinate);
    },
  },
};
</script>
