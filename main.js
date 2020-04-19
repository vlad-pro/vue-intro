var app = new Vue({
  el: '#app',
  data: {
    brand: "Yamaha",
    product: 'YZF-R1M',
    image: './assets/r1m.jpg',
    link: 'example.com',
    inStock: true,
    inventory: 5,
    onSale: false,
    details: ["Best bike on the planet","200+ hp","electronic everything"],
    colorVariants: [
      {
        colorId: 2234,
        vColor: "blue",
        vImage: "./assets/r1blue.jpg"
      },
      {
        colorId: 2235,
        vColor: "red",
        vImage: "./assets/r1red.jpg"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1
    },
    updateProduct(variantImage) {
      this.image = variantImage
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    }
  }
})