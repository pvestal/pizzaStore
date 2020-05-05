import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        menuItems: [],
        orders: [] //{id, name, quantity [options: price, size] }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_MENU(state, menu) {
            state.menuItems = menu
        },
        SET_ORDERS(state, orders) {
            state.orders = orders
        },
        ADD_MENU_ITEM(state, menuItem) {
            state.menuItems.push(menuItem)
        },
        REMOVE_MENU_ITEM(state, menuItemId) {
            const menuItem = state.menuItems.map(menuItem => menuItem.id).indexOf(menuItemId);
            state.menuItems.splice(menuItem, 1);
        },
        ADD_ORDER(state, order) {
            state.orders.push(order)
        },
        REMOVE_ORDER(state, orderItemId) {
            const orderItem = state.orders.map(orderItem => orderItem.id).indexOf(orderItemId);
            state.orders.splice(orderItem, 1);
        },
    },
    actions: {
        addNewOrder({ commit }, newOrder) {
            console.log("newOrder: " + newOrder)
            commit('ADD_ORDER', newOrder)
            let docRef = firebase.firestore().collection("orders").doc()
            console.log("docRef: " + docRef.id)
            // firebase.firestore().collection("orders").add(newOrder)
            //     .then(() => commit('ADD_ORDER', newOrder))
            //     .catch(error => console.log(error))
        },
        removeOrder({commit}, orderId) {
            commit('REMOVE_ORDER', orderId)
        },
        getOrders({ commit }) {
            firebase.firestore().collection("orders").get()
                .then((querySnapshot) => {
                    let ordersArray = []
                    querySnapshot.forEach((doc) => {
                        let order = doc.data()
                        order.id = doc.id
                        ordersArray.push(order)
                    })
                    commit('SET_ORDERS', ordersArray)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        getMenuItems({ commit }) {
            firebase.firestore().collection("menu").get()
                .then((querySnapshot) => {
                    let menuArray = []
                    querySnapshot.forEach((doc) => {
                        let menu = doc.data()
                        menu.id = doc.id
                        menuArray.push(menu)
                    })
                    commit('SET_MENU', menuArray)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        addMenuItem({ commit }, menuItem) {
            firebase.firestore().collection("menu").add(menuItem)
                .then(() => commit('ADD_MENU_ITEM', menuItem))
                .catch(error => console.log(error))
        },
        removeMenuItem({ commit }, id) {
            firebase.firestore().collection("menu").doc(id).delete()
                .then(() => commit('REMOVE_MENU_ITEM', id))
                .catch(error => console.log(error))
        },
        signUserUp({ commit }, payload) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('SET_LOADING', false)
                    const newUser = {
                        id: user.user.uid,
                        email: user.user.email
                    }
                    commit('SET_USER', newUser)
                    return newUser;
                })
                .then(newUser => {
                    console.log("newUser: ", newUser)
                    firebase.firestore().collection('profiles').doc(newUser.id).set(newUser)
                })
                .catch(err => {
                    commit('SET_LOADING', false)
                    commit('SET_ERROR', err)
                    console.log(err)
                })

        },
        signUserIn({ commit }, payload) {
            console.log("attempting to sign user in.")
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const userData = {
                        id: user.user.uid,
                        email: user.user.email,
                        photoURL: user.user.photoURL,
                        displayName: user.user.displayName
                    }
                    commit('SET_USER', userData)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        autoSignIn({ commit }, payload) {
            console.log("autoSignIn")
            commit('SET_USER', payload)
        },
        signOut({ commit }) {
            commit('SET_LOADING', true)
            firebase.auth().signOut()
                .then(() => {
                    commit('SET_LOADING', false)
                    commit('SET_USER', null)
                })
                .catch(err => {
                    commit('SET_LOADING', false)
                    commit('SET_ERROR', err)
                    console.log(err)
                })
        }
    },
    modules: {
    },
    getters: {
        user: state => state.user,
        menuItems: state => state.menuItems,
        orders: state => state.orders,
        orderCount: state => state.orders.length,
        cartTotalPrice: (state, getters) => {
            return getters.orders.reduce((total, order) => total + order.price * order.quantity, 0)
        }
    }
})