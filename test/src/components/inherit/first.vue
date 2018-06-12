<template>
  <div>
    <h1>{{ text }}</h1>
    <second :value='text'></second>
  </div>
</template>

<script>
import second from './second.vue'
export default {
  data () {
    return {
      text: 'first'
    }
  },
  components: { second }
}
</script>

<style>

</style>