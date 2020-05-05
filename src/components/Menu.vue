<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>Size</th>
            <th>Price</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody v-for="menuItem in getMenuItems" :key="menuItem.key">
          <tr>
            <td>
              <strong>{{menuItem.name}}</strong>
            </td>
          </tr>
          <tr v-for="option in menuItem.options" :key="option.key">
            <td>{{option.size}}"</td>
            <td>{{option.price | currency}}</td>
            <td>
              <button class="btn btn-sm btn-outline-success" @click="addToCart(menuItem, option)">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--Shopping Cart -->
    <!-- Take up the full page for small screens and half for medium or larger -->
    <div class="col-sm-12 col-md-6">
      <div v-if="cart.length > 0">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th>Quantity</th>
              <th>Item</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody v-for="cartItem in cart" :key="cartItem.key">
            <tr>
              <td>
                <button class="btn btn-outline-secondary btn-sm" @click="decrease(cartItem)">-</button>
                <span>  {{cartItem.quantity}}  </span>
                <button class="btn btn-outline-secondary btn-sm" @click="increase(cartItem)">+</button>
              </td>
              <td>{{cartItem.name}} {{cartItem.size}}</td>
              <td>{{cartItem.price * cartItem.quantity | currency}}</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Order Total: {{totalPrice | currency}}</strong></p>
        <button class="btn btn-success btn-block" @click.prevent="addOrder">Place Order</button>
      </div>
      <div v-else>
          <p>{{cartText}}</p> {{this.$store.getters.orders}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      // cart: {
      //   name: '',
      //   price: '',
      //   size: '',
      //   quantity: ''
      // },
      cartText: 'Cart is Empty',
      
    };
  },
  computed: {
    getMenuItems() {
      return this.$store.getters.menuItems
    },
    totalPrice() {
      return this.cart.reduce((total, options) => total + options.price * options.quantity, 0)
    }
  },
  methods: {
    addToCart(menuItem, option) {
      this.cart.push({
        name: menuItem.name,
        price: option.price,
        size: option.size,
        quantity: 1,
        subTotal: this.totalPrice
      });
    },
    increase(cartItem) {
        cartItem.quantity++
    },
    decrease(cartItem) {
        cartItem.quantity--
        if(cartItem.quantity === 0) {
            this.removeFromCart(cartItem)
        }
    },
    removeFromCart(cartItem) {
        this.cart.splice(this.cart.indexOf(cartItem), 1)
    },
    addOrder() {
      console.log("cartSubTotal: " + this.totalPrice)
      this.$store.dispatch('addNewOrder', this.cart)
      .then(() => {
        this.cart = {}
        this.cartText = "Thank you for your order!"
        })
      .catch(error => {
        alert(error)
        console.log(error)
        })
    }
  }
};
</script>

<style>
</style>