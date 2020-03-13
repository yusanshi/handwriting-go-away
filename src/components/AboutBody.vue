<template>
  <b-card>
    <div v-html="compiledMarkdown"></div>
  </b-card>
</template>

<script>
import marked from 'marked';
import QRCode from 'qrcode';

export default {
  name: 'AboutBody',
  data() {
    return { donateQRCode: '' };
  },
  computed: {
    compiledMarkdown() {
      return marked(
        this.$t('about').replace('[DONATE_QRCODE]', this.donateQRCode),
      );
    },
  },
  mounted() {
    this.$t('donate').forEach((item) => {
      QRCode.toString(item.QRCode, {
        width: 200,
        margin: 0,
        color: {
          dark: '#444444ff',
        },
      })
        .then((data) => {
          this.donateQRCode += `\n\n**${item.name}**\n\n${data}\n\n`;
        })
        .catch((err) => {
          this.donateQRCode += err;
        });
    });
  },
};
</script>
