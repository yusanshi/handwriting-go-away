<template>
  <b-container>
    <b-card :title="$t('nav.about')">
      <b-card-text v-html="$t('about')"></b-card-text>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'AboutBody',
};
</script>
