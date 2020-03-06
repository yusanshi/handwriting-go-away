<template>
  <div>
    <Navbar />
    <AboutBody/>
    <Footer/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import AboutBody from '@/components/AboutBody.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    AboutBody,
    Footer,
  },
};
</script>
