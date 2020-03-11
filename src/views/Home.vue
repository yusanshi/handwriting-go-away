<template>
  <div>
    <Navbar class="mb-3 mb-sm-4" />
    <HomeBody class="mb-3 px-3 px-sm-4" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import HomeBody from '@/components/HomeBody.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    HomeBody,
  },
  metaInfo() {
    return {
      title: this.$t('nav.home'),
    };
  },
};
</script>
