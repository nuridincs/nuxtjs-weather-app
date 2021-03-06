import axios from 'axios';

const state = () => ({
  apiBase: process.env.API_URL,
  apiKey: process.env.API_KEY,
  defaultSearch: "jakarta",
  district: "",
  unit: "imperial",
  coordinate: {},
  search: {},
  isError: false,
  weatherData: {},
})

const getters = {
  getWeatherMain(state) {
    const { temp, feelsLike, description, icon, info } = state.weatherData;
    return {
      temp,
      feelsLike,
      description,
      info,
      icon,
    };
  },
  getWeatherInfo(state) {
    const { temp, wind, clouds, humidity } = state.weatherData;
    return {
      wind,
      clouds,
      humidity,
      temp,
    };
  },
  getWeatherCountry(state) {
    return state.weatherData.country;
  },
  isSearched(state) {
    return state.search !== "";
  },
  coordinate(state) {
    return state.coordinate;
  },
  getError(state) {
    return state.isError;
  },
};

const mutations = {
  SET_SEARCH(state, search) {
    if (!search) return;
    state.search = search;
  },
  SET_WEATHER_DATA(state, data) {
    state.weatherData = data;
  },
  SET_ERROR(state, value) {
    state.isError = value;
  },
  SET_COORDINATE(state, value) {
    state.coordinate = value;
  },
  SET_DISTRICT(state, value) {
    state.district = value;
  },
  SET_UNIT(state, value) {
    state.unit = value;
  },
};

const actions = {
  async fetchWeatherData({ commit, state }, coordinate) {
    try {
      commit("SET_SEARCH", coordinate);
      commit("SET_COORDINATE", coordinate);
      const response = await axios.get(
        `${state.apiBase}weather?lat=${coordinate.lat}&lon=${coordinate.lng}&units=${state.unit}&APPID=${state.apiKey}`
      );

      const newWeatherData = {
        name: response.data.name,
        temp: response.data.main.temp,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        feelsLike: response.data.main.feels_like,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon.substring(0, 2),
        info: response.data.weather[0].main,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        clouds: response.data.clouds.all,
        country: response.data.sys.country,
      };
      commit("SET_WEATHER_DATA", newWeatherData);
      commit("SET_ERROR", false);
    } catch (error) {
      console.log(error);
      commit("SET_ERROR", true);
      commit("SET_WEATHER_DATA", {});
    }
  },

  setDistrict({ commit }, distc) {
    commit("SET_DISTRICT", distc);
  },

  setUnit({ commit }, distc) {
    commit("SET_UNIT", distc);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
