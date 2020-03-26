<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-container fluid>
      <b-navbar-brand to="/">{{ $t('baseTitle') }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">{{ $t('nav.home') }}</b-nav-item>
          <b-nav-item to="/faq">{{ $t('nav.faq') }}</b-nav-item>
          <b-nav-item to="/about">{{ $t('nav.about') }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="$t('language')" right>
            <b-dropdown-item
              v-for="lang in $i18n.availableLocales"
              :key="lang"
              @click="setLang(lang)"
              >{{ $t('langName', lang) }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
    },
  },
};
</script>
