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

    findResult(results, name) {
      const result = results.find(obj => obj.types[0] == name && obj.types[1] == "political")
      return result ? result.long_name : null;
    },
  },
};
