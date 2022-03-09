<<<<<<< HEAD
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';
import pagination from '/pagination.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'cinnroll';

let productModal = {};
let delProductModal = {};

const app = createApp({
  components: {
    pagination
  },

  data() {
    return {
      products: [], //定義資料，取得產品資料
      tempProduct: {
      imagesUrl: [], //製作多圖
      },
      isNew: false,
      pagination: {}, //定義 pagination
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
    getProducts(page = 1) { //參數預設值（不帶任何參數的情況下，會用第一頁）
      //參數 - query or  param
      const url = `${site}api/${api_path}/admin/products/?page=${page}`;
      axios.get(url)
        .then(res => {
          this.products = res.data.products;
          this.pagination = res.data.pagination; //取出 pagination
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
    
    deleteProduct() {
      let url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
        .then(res => {
          console.log(res);
          this.getProducts();
          delProductModal.hide(); //把列表關掉
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

app.component('productModal',{ //全域注冊，一次只注冊一個
  props: ['tempProduct'],
  template: '#templateForProductModal',
  methods:{
    updateProduct() { //新增品項
      let url = `${site}api/${api_path}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempProduct })
        .then(res => {
          this.$emit('get-products'); //使用 emit 觸發外層 get-products事件
          productModal.hide(); //把列表關掉
        });
    },
  }
})

app.mount('#app');

=======
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';
import pagination from '/pagination.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'cinnroll';

let productModal = {};
let delProductModal = {};

const app = createApp({
  components: {
    pagination
  },

  data() {
    return {
      products: [], //定義資料，取得產品資料
      tempProduct: {
      imagesUrl: [], //製作多圖
      },
      isNew: false,
      pagination: {}, //定義 pagination
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
    getProducts(page = 1) { //參數預設值（不帶任何參數的情況下，會用第一頁）
      //參數 - query or  param
      const url = `${site}api/${api_path}/admin/products/?page=${page}`;
      axios.get(url)
        .then(res => {
          this.products = res.data.products;
          this.pagination = res.data.pagination; //取出 pagination
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
    
    deleteProduct() {
      let url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;

      axios.delete(url)
        .then(res => {
          console.log(res);
          this.getProducts();
          delProductModal.hide(); //把列表關掉
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

app.component('productModal',{ //全域注冊，一次只注冊一個
  props: ['tempProduct'],
  template: '#templateForProductModal',
  methods:{
    updateProduct() { //新增品項
      let url = `${site}api/${api_path}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempProduct })
        .then(res => {
          this.$emit('get-products'); //使用 emit 觸發外層 get-products事件
          productModal.hide(); //把列表關掉
        });
    },
  }
})

app.mount('#app');

>>>>>>> dc3f841d47dca0871a2e1dbe8f9b81d32476a0bf
