<template>
  <div>
    <Navbar class="mb-3 mb-sm-4" />
    <b-container>
      <AboutBody class="mb-4" />
      <Footer class="mb-4" />
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AboutBody from '@/components/AboutBody.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'About',
  components: {
    Navbar,
    AboutBody,
    Footer,
  },
  metaInfo() {
    return {
      title: this.$t('nav.about'),
    };
  },
};
</script>
