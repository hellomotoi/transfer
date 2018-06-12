<template>
  <div>
    <h1>{{ text }}</h1>
    <p>{{ values }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'third'
    }
  },
  created() {
      console.log(this.$attrs)
  },
  props: ['values']
}
</script>

<style>

</style>