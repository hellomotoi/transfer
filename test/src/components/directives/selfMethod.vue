<template>
  <div>
    <h1 v-color>{{ text }}</h1>

    <div id="qrcode"></div>
    <input id="yqlink" readonly/>
    <button class="copyBtn" data-clipboard-target="#yqlink">复制邀请链接</button>
  </div>
</template>

<script>
import VueQArt from 'vue-qart';
import QRCode from '../../assets/qr.js'; // qr
import qrious from 'qrious';
import Clipboard from 'clipboard';
export default {
  data () {
    return {
      text: 'directives',
      config: {
          value: 'https://www.baidu.com',
          imagePath: '../../assets/logo.png',
          filter: 'color'
      }
    }
  },
  created() {
    
  },
  mounted() {
    new QRCode(document.getElementById('qrcode'), 'https://www.baidu.com');
    document.getElementById('yqlink').value = 'https://www.baidu.com';
    var clipboard = new Clipboard('.copyBtn');
    //优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
    clipboard.on('success', function(e) {
       alert('复制成功!');
        e.clearSelection();
    });
  },
  methods: {

  },
  components: {VueQArt},
  directives: {
    color: {
        // 指令的定义
        bind: function (el) {
            el.style.color = 'red';
        }
    }
  }
}
</script>

<style>
#qrcode{
        height: 200px;
        width: 200px;
        margin: auto;
    }
</style>
