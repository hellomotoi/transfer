<template>
  <div>
    <h1>{{ text }}</h1>
    <p>{{ value }}</p>
    <third v-bind="$attrs"></third>
  </div>
</template>

<script>
import third from './third.vue'
export default {
  data () {
    return {
      text: 'second'
    }
  },
  components: { third },
  props: ['value'],
  inheritAttrs: false,
    mounted(){
    　　console.log(this.$attrs); //{count:123456}
    }
}
</script>

<style>

</style>