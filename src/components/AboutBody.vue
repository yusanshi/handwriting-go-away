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
    return {
      donateQRCode: '',
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(
        this.$t('about').replace('[DONATE_QRCODE]', this.donateQRCode),
      );
    },
  },
  methods: {
    async updateDonateQRCode() {
      const tasks = this.$t('donate').map((item) => QRCode.toString(item.QRCode, {
        width: 200,
        margin: 0,
        color: {
          dark: '#444444ff',
        },
      }).then((data) => `\n\n**${item.name}**\n\n${data}\n\n`));

      Promise.all(tasks)
        .then((values) => {
          this.donateQRCode = values.join('');
        })
        .catch(() => {
          this.donateQRCode = '\n\n**Error while loading QR code.**\n\n';
        });
    },
  },
  mounted() {
    this.updateDonateQRCode();
  },
  watch: {
    '$i18n.locale': 'updateDonateQRCode',
  },
};
</script>
