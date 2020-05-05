<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <!-- New pizza component -->
        <NewItem />
      </div>
      <div class="col-sm-12 col-md-6">
        <h3>Menu Inventory</h3>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>Item-Id</th>
              <th>Remove from Menu</th>
            </tr>
          </thead>
          <tbody v-for="menuItem in menuItems" :key="menuItem.key">
            <tr>
              <td>{{menuItem.name}}-{{menuItem.id}}</td>
              <td class="text-center">
                <button class="btn btn-outline-danger btn-sm" @click.prevent="removeMenuItem(menuItem.id)">X</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <h3>Current Orders: {{orderCount}}</h3>
        <table class="table table-hover table-sm">
          <thead class="thead-light">
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody v-for="order in orders" :key="order.key">
            <div>
              <strong>
                <em>Order Number: {{order}}</em>
              </strong>
              <button class="btn btn-outline-danger btn-sm" @click="removeOrder(order.id)">X</button>
            </div>
            <tr>
              <td>{{order.name}}</td>
              <td>{{order.size}}"</td>
              <td>{{order.quantity}}</td>
              <td>{{order.price | currency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NewItem from "@/components/NewItem";
import { mapGetters } from "vuex";

export default {
  components: {
    NewItem
  },
  computed: {
    ...mapGetters(["menuItems", "orderCount", "orders"])
  },
  methods: {
    removeMenuItem(id) {
      this.$store.dispatch('removeMenuItem', id)
    },
    removeOrder(id) {
      this.$store.dispatch('removeOrder', id)
    }
  }
};
</script>

<style>
</style>