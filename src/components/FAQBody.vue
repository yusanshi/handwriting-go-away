<template>
  <div>
    <b-card
      :title="`${index + 1}. ${item.question}`"
      v-for="(item, index) in $t('faq')"
      :key="item.question"
      class="mb-3"
    >
      <div v-html="compiledMarkdown(item.answer)"></div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import marked from 'marked';

export default Vue.extend({
  name: 'HomeBody',
  methods: {
    compiledMarkdown(text: string): string {
      return marked(text);
    },
  },
});
</script>
