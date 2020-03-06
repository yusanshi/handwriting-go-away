<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container fluid>
    <b-navbar-brand to="/">Handwriting Generator</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/faq">FAQ</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">中文</b-dropdown-item>
          <b-dropdown-item href="#">English</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
     </b-container>
  </b-navbar>
</template>

<script>

export default {
  name: 'Navbar',
};
</script>
