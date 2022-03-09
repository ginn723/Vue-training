import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'cinnroll';

let productModal = {};
let delProductModal = {};

const app = createApp({
  data() {
    return {
      products: [], //定義資料，取得產品資料
      tempProduct: {
        imagesUrl: [], //製作多圖
      },
      isNew: false,
    }
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); //取出 cookie

      axios.defaults.headers.common['Authorization'] = token;
      console.log(token)

      const url = `${site}api/user/check`
      axios.post(url)
        .then(() => {
          this.getProducts(); //觸發 getProducts
        });
    },
    getProducts() {
      const url = `${site}api/${api_path}/admin/products/all`;
      axios.get(url)
        .then(res => {
          this.products = res.data.products
          // console.log(Object.values(this.products)) //物件迴圈
          // Object.values(this.products).forEach((item) => {
          //   console.log(item);  //物件跑迴圈
          // }) 
        });
    },
    openModal(status, product) {
      console.log(status, product);
      if (status === 'isNew') {
        this.tempProduct = {
          imagesUrl: [],
        }
        productModal.show();
        this.isNew = true;
      } else if (status === 'edit') {
        this.tempProduct = { ...product }; //物件傳參考的關係，必須使用淺拷貝或深拷貝的方式
        productModal.show();
        this.isNew = false;
      } else if (status === 'delete') {
        delProductModal.show();
        this.tempProduct = { ...product };
      }
    },
    updateProduct() { //新增品項
      let url = `${site}api/${api_path}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempProduct })
        .then(res => {
          console.log(res);
          this.getProducts();
          productModal.hide(); //把列表關掉
        });
    },
    deleteProduct() {
      let url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
        .then(res => {
          console.log(res);
          this.getProducts();
          productModal.hide(); //把列表關掉
        });
    }
  },
  mounted() {
    this.checkLogin(); //在mounted 觸發多一次
    //抓 dom 元素 
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    delProductModal.show()
  }
});

app.mount('#app');

