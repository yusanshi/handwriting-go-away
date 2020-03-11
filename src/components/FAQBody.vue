<template>
  <b-container>
    <b-card
      :title="`${index + 1}. ${item.question}`"
      v-for="(item, index) in $t('faq')"
      :key="item.question"
      class="mb-3"
    >
      <b-card-text>
        {{ item.answer }}
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'HomeBody',
};
</script>
