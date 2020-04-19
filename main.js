var eventBus = new Vue(
  // v-on:review-submitted="addReview"
)

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
            v-on:mouseover="updateProduct(index)"
            >
      </div>

      <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
          Add to Cart
      </button>

    </div>

    <product-tabs :reviews="reviews"></product-tabs>

</div>
  `,
  data() {
    return {
      brand: "Yamaha",
      product: 'YZF-R1M',
      selectedVariant: 0,
      link: 'example.com',
      inventory: 5,
      onSale: false,
      details: ["Best bike on the planet", "200+ hp", "electronic everything"],
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
      reviews: []
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.colorVariants[this.selectedVariant].colorId)
    },
    updateProduct(index) {
      this.selectedVariant = index
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
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
  <ul>
    <li v-for="error in errors">{{ error }}</li>
  </ul>
  </p>

  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: Number(this.rating)
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        if(!this.name) this.errors.push("Name required.")
        if(!this.review) this.errors.push("Review required.")
        if(!this.rating) this.errors.push("Rating required.")
      }
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab"
      >
      {{ tab }}
      </span>

      <div v-show="selectedTab === 'Reviews' ">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul v-else>
        <li v-for="review in reviews">
        <p>{{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.review }}</p>
        </li>
      </ul>
      </div>
  
      <product-review v-show="selectedTab === 'Make a Review' "
      ></product-review>

    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review' ],
      selectedTab: 'Reviews'
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})
