<template>
  <div class="mb-5 flex justify-between p-5">
    <div>
      <img src="~static/icons/arrow-left.png" alt="">
    </div>
    <div>
      {{ district }}
    </div>
    <div>
      <img src="~static/icons/more.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    district() {
      return this.$store.state.store.district;
    }
  }
}
</script>