const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// 定義規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

// 載入多國語系-讀取外部的資源
loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  // 用來做一些設定
  generateMessage: localize("zh_TW"), //啟用 locale
});

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "cinnroll";

Vue.createApp({
  data() {
    return {
      cartData: {}, //購物車列表
      products: [], //產品列表
      productId: "",
      isLoadingItem: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        console.log(res);
        this.products = res.data.products;
      });
    },
    openProductModal(id) {
      this.productId = id;
      this.$refs.productModal.openModal();
    },
    getCart() {
      axios.get(`${apiUrl}/api/${apiPath}/cart`).then((res) => {
        console.log(res);
        this.cartData = res.data.data;
      });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      axios.post(`${apiUrl}/api/${apiPath}/cart`, { data }).then((res) => {
        console.log(res);
        this.getCart();
        this.$refs.productModal.closeModal();
        this.isLoadingItem = "";
      });
    },
    removeCartItem(id) {
      this.isLoadingItem = id;
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`).then((res) => {
        console.log(res);
        this.getCart();
        this.isLoadingItem = "";
      });
    },
    updateCartItem(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id;
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          console.log(res);
          this.getCart();
          this.isLoadingItem = "";
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})

  // $refs
  .component("product-modal", {
    props: ["id"],
    template: "#userProductModal",
    data() {
      return {
        modal: {},
        product: {},
        qty: 1,
      };
    },
    watch: {
      id() {
        this.getProduct();
      },
    },
    methods: {
      openModal() {
        this.modal.show();
      },
      closeModal() {
        this.modal.hide();
      },
      getProduct() {
        axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`).then((res) => {
          this.product = res.data.product;
        });
      },
      addToCart() {
        this.$emit("add-cart", this.product.id, this.qty);
      },
    },
    mounted() {
      this.modal = new bootstrap.Modal(this.$refs.modal);
    },
  })
  .mount("#app");
