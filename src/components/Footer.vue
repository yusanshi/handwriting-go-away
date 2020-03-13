<template>
  <footer>
    <hr />
    <p class="text-muted">
      {{ new Date().getFullYear() }} {{ $t('base-title') }}
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
