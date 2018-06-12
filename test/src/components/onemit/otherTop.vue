<template>
  <div>
    <h1 @click="change">{{ txt }}</h1>
    <p>{{value}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      txt: 'otherTop'
    }
  },
  created () {
    //   this.txt = this.value;
  },
  props: ['value'],
  methods: {
      change() {
          this.$emit('update:value',"changeTop")
      }
  }
}
</script>

<style>

</style>
