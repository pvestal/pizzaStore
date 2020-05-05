<template>
  <div class="row">
      <div id="home" class="col-sm-12 text-center">
      <div class="background">
          <h1>Welcome to the Pizza Store!</h1>
          <h3>Feeling Hungry?</h3>
          <button class="btn btn-success" @click="goToMenu">Order</button>
      </div>
      </div>

  </div>
</template>

<script>
export default {
methods: {
  goToMenu() {
    this.$router.push({name: 'Menu'})
  }
}
}
</script>

<style>

</style>