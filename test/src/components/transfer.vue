<template>
  <div class="transfers">
    <el-transfer v-model="value1" :data="data"></el-transfer>
  </div>
</template>

<script>
import demodata from '../../static/datas.json'
export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value1: [1, 4]
      };
    },
    created() {
        console.log(demodata)
        console.log(demodatas)
    }
}

</script>

<style>

</style>
