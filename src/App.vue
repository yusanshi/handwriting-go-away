<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  metaInfo(): { titleTemplate: string } {
    return {
      titleTemplate: `%s - ${this.$t('baseTitle')}` as string,
    };
  },
});
</script>
