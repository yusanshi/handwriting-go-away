<template>
  <b-container>
    <b-card
      :title="`${index + 1}. ${item.question}`"
      v-for="(item, index) in $t('faq')"
      :key="item.question"
      class="mb-3"
    >
      <div v-html="compiledMarkdown(item.answer)"></div>
    </b-card>
  </b-container>
</template>

<script>
import marked from 'marked';

export default {
  name: 'HomeBody',
  methods: {
    compiledMarkdown(text) {
      return marked(text);
    },
  },
};
</script>
