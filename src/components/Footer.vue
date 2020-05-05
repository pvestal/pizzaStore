<template>
  <header class="row">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav mr-auto">
        <router-link :to="{name: 'Home'}" tag="li">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link :to="{name: 'Menu'}" tag="li">
          <a class="nav-link">Menu</a>
        </router-link>
        <router-link :to="{name: 'Login'}" tag="li">
          <a class="nav-link">Login</a>
        </router-link>
        <router-link :to="{name: 'Admin'}" tag="li">
          <a class="nav-link">Admin</a>
        </router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  margin-bottom: 20px;
}
.navbar-brand {
  font-size: 1.5em;
}
</style>