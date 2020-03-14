<template>
  <div>
    <Navbar class="mb-3 mb-sm-4" />
    <b-container>
      <FAQBody class="mb-4"/>
      <Footer class="mb-4"/>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import FAQBody from '@/components/FAQBody.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'FAQ',
  components: {
    Navbar,
    FAQBody,
    Footer,
  },
  metaInfo() {
    return {
      title: this.$t('nav.faq'),
    };
  },
};
</script>
