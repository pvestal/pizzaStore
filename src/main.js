import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import {currency} from '@/currency'

Vue.config.productionTip = false

Vue.filter('currency', currency)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "xxx",
      authDomain: "xxx",
      databaseURL: "xxx",
      projectId: "xxx",
      storageBucket: "xxx",
      messagingSenderId: "xxx",
      appId: "xxx"

    });
    
    //check if auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log("main.js user obj", user)
        //if user signed set user state
        store.dispatch('autoSignIn', user)
        // this.$store.dispatch('fetchUserData', user)
      } else {
        //set user state to null
        store.dispatch('autoSignIn', null)
      }
    })
    //This gets the menu items stored in firebase
    store.dispatch('getMenuItems')
  }
}).$mount('#app')
