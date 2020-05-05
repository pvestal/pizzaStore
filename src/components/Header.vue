<template>
  <header class="row">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">PizzaStore</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link :to="{name: 'Home'}" tag="li">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link :to="{name: 'Menu'}" tag="li">
            <a class="nav-link">Menu</a>
          </router-link>
          <router-link :to="{name: 'About'}" tag="li">
            <a class="nav-link">About</a>
          </router-link>
          <!-- <li v-if="user">{{user.email}}</li> -->
          <router-link :to="{name: 'Login'}" tag="li" v-if="user" class="btn btn-primary">
            {{user.email}}
            <span class="badge badge-light">4</span>
          </router-link>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style>
header {
  margin-bottom: 20px;
}
.navbar-brand {
  font-size: 1.5em;
}
</style>