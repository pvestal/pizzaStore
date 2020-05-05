<template>
  <div class="row">
    <form v-if="!user" class="move">
      <div class="form-group">
        <label class="col-sm-3">Email(test@test.com)</label>
        <input type="email" class="form-control" v-model="email" placeholder="Email" />
      </div>
      <div class="form-group">
        <label class="col-sm-3">Password(test2020)</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />
      </div>
      <button class="btn btn-primary" @click.prevent="signIn">Sign In</button>
    </form>
    <form v-if="user" class="move">
      <div class="form-group">
      <button class="btn btn-danger" @click.prevent="signOut">Sign Out</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("signUserIn", { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: "Menu" });
        })
        .catch(err => alert(err));
      // firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      // .then(res => {
      //     console.log(res.user)
      //     alert(res.user.email + " is now signed in.")
      //     this.email = ''
      //     this.password = ''
      // })
      // .catch(err => alert(err))
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(res => {
          console.log(res);
          alert("User signed out of Firebase");
        })
        .catch(err => alert(err));
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
.move {
  margin-left: 25px;
}
</style>