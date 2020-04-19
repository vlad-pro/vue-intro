Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
      <div class="product-image">
        <img v-bind:src="image" alt="">
      </div>
      <div class="product-info">
        <h1>
        <a :href="link">
          {{ title }}
        </a>
      </h1>
      <p v-if="inStock > 10">In Stock</p>
      <p v-else-if=" inStock <=10 && inStock > 0 ">Almost our of Stock</p>
      <p v-else>Out of Stock</p>  
      <p v-show="onSale"> On Sale!</p>
      <p> Shipping: {{ shipping }}</p>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

      <div v-for="(variant, index) in colorVariants"
            :key="variant.colorId"
            class="color-box"
            :style="{ backgroundColor: variant.vColor }"
            v-on:mouseover="updateProduct(index)">
      </div>

      <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }">
          Add to Cart
      </button>

      <div class="cart">
        <p>Cart({{cart}})</p>
      </div>

  </div>
  `,
  data() {
    return {
    brand: "Yamaha",
    product: 'YZF-R1M',
    selectedVariant: 0,
    // image: './assets/r1m.jpg',
    link: 'example.com',
    // inStock: true,
    inventory: 5,
    onSale: false,
    details: ["Best bike on the planet","200+ hp","electronic everything"],
    colorVariants: [
      {
        colorId: 2234,
        vColor: "blue",
        vImage: "./assets/r1blue.jpg",
        vQuantity: 10
      },
      {
        colorId: 2235,
        vColor: "red",
        vImage: "./assets/r1red.jpg",
        vQuantity: 0
      }
    ],
    cart: 0
  }
  },
  methods: {
    addToCart: function() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.colorVariants[this.selectedVariant].vImage
    },
    inStock() {
      return this.colorVariants[this.selectedVariant].vQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 999
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false
  }
})