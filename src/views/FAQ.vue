<template>
  <div>
    <Navbar />
    <FAQBody/>
    <Footer/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import FAQBody from '@/components/FAQBody.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    FAQBody,
    Footer,
  },
};
</script>
