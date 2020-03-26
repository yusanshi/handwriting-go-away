<template>
  <footer>
    <hr />
    <p class="text-muted" style="font-size: 0.875em;">
      <span class="mr-3">
        {{ new Date().getFullYear() }} {{ $t('baseTitle') }}</span
      >
      <span>
        <a
          href="http://www.beian.miit.gov.cn/"
          target="_blank"
          class="text-reset"
          >{{ $t('beian') }}</a
        >
      </span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
