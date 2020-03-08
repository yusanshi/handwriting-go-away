<template>
  <div>
    <Navbar class="mb-3 mb-sm-4" />
    <FAQBody class="mb-3" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import FAQBody from '@/components/FAQBody.vue';

export default {
  name: 'FAQ',
  components: {
    Navbar,
    FAQBody,
  },
  metaInfo() {
    return {
      title: this.$t('nav.faq'),
    };
  },
};
</script>
