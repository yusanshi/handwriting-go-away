<template>
  <div>
    <Navbar class="mb-3 mb-sm-4" />
    <b-container class="px-sm-4 px-xl-5" fluid>
      <HomeBody class="mb-4"/>
      <Footer class="mb-4"/>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import HomeBody from '@/components/HomeBody.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    HomeBody,
    Footer,
  },
  metaInfo() {
    return {
      title: this.$t('nav.home'),
    };
  },
};
</script>
