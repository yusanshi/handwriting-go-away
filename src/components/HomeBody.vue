<template>
  <b-container fluid>
    <b-row>
      <b-col lg="5"><Control @generate="generate" @download="download"/></b-col>
      <b-col lg="7"><Preview /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import Control from './Control.vue';
import Preview from './Preview.vue';

export default {
  name: 'HomeBody',
  components: { Control, Preview },
  methods: {
    generate(form) {
      return form;
    },
    download() {},
  },
};
</script>
