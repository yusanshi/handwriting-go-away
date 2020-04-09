<template>
  <footer>
    <hr />
    <p class="text-muted" style="font-size: 0.875em;">
      <span>
        {{ new Date().getFullYear() }} {{ $t('baseTitle') }}</span
      >
      <span v-for="item in $i18n.t('beian')" :key=item.text class="ml-3 d-none d-sm-inline">
        <a
          :href="item.link"
          target="_blank"
          class="text-reset"
          v-text="item.text"
          ></a
        >
      </span>
    </p>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer',
});
</script>
