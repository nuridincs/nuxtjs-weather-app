export default {
  methods: {
    staticUrl(url) {
      return process.env.BASE_URL ? `${process.env.BASE_URL}${url}` : url;
    },

    digitGrouping(str) {
      if (!str) return 0;
      return this.$numeral(str).format('$0,0');
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
