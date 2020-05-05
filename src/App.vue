<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
#home {
  background: url("../src/assets/Artisan_Pizza.jpg") no-repeat fixed center;
  height: 650px;
  padding: 10%;
}

.background {
  background: #eee;
  opacity: 0.8;
  max-width: 60%;
  margin: 0 auto;
  padding: 20px 0;
}
.row {
  margin-left: 15px;
}
</style>
