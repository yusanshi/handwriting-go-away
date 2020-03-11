<template>
  <div>
    <Navbar class="mb-3 mb-sm-4" />
    <AboutBody class="mb-3" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AboutBody from '@/components/AboutBody.vue';

export default {
  name: 'About',
  components: {
    Navbar,
    AboutBody,
  },
  metaInfo() {
    return {
      title: this.$t('nav.about'),
    };
  },
};
</script>
