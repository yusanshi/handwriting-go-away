<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo() {
    return {
      titleTemplate: `%s - ${this.$t('base-title')}`,
    };
  },
};
</script>
