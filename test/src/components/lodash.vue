<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'lodash',
  data () {
    return {
      msg: 'lodash',
      newarr: "1,2,3,1,5,7,3,6,2,1,9,0"
    }
  },
  created() {
    this.msg = this.formatData(this.newarr);
  },
  methods: {
    formatData(params) {
      if (typeof params === 'string')
      params = params.split(',');
      let obj = {};
      let newarr = [];
      for (let index = 0; index < params.length; index++) {
        if (!obj[params[index]]) {
          obj[params[index]] = 1;
          newarr.push(params[index]);
        }
      }
      return newarr.join(',');
    }
  }
}
</script>

<style>

</style>
