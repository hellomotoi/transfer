<template>
  <div>
    <h1>{{ text }}</h1>
    <other-top :value.sync='text'></other-top>
  </div>
</template>

<script>
import otherTop from './otherTop.vue'
export default {
  data () {
    return {
      text: 'top'
    }
  },
  components: { otherTop }
}
</script>

<style>

</style>
