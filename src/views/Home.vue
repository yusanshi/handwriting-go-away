<template>
  <div>
    <Navbar />
    <HomeBody/>
    <Footer/>
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
};
</script>
