<template>
  <b-container fluid>
    <Question />
    <Question />
    <Question />
    <Question />
    <Question />
  </b-container>
</template>

<script>
import Question from './Question.vue';

export default {
  name: 'HomeBody',
  components: { Question },
};
</script>
