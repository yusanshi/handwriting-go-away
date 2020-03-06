<template>
  <b-container fluid>
    <Control />
    <Preview />
  </b-container>
</template>

<script>
import Control from './Control.vue';
import Preview from './Preview.vue';

export default {
  name: 'HomeBody',
  components: { Control, Preview },
};
</script>
