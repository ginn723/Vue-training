<template>
  <h2>購物車</h2>
  <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td style="width: 200px">
                  <div
                    :style="{
                      backgroundImage: `url(${product.imageUrl})`,
                    }"
                    style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    "
                  ></div>
                </td>
                <td>{{ product.title }}</td>
                <td>
                  <div class="h5" v-if="product.price === product.origin_price">
                    {{ product.price }} 元
                  </div>
                  <div v-else>
                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ product.price }} 元</div>
                  </div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      :disabled="isLoadingItem === product.id"
                      @click="openProductModal(product.id)"
                    >
                      查看更多
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="addToCart(product.id)"
                      :disabled="isLoadingItem === product.id"
                    >
                      <span
                        class="spinner-grow spinner-grow-sm"
                        v-show="isLoadingItem === product.id"
                      ></span>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="my-5 row justify-content-center">
          <v-form ref="form" class="col-md-6" v-slot="{ errors }">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                rules="required"
                placeholder="請輸入 Email" v-model="form.user.email"

              ></v-field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required" v-model="form.user.name"
              ></v-field>
              <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field
                id="tel"
                name="電話"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"
              ></v-field>
              <error-message
                name="電話"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required" v-model="form.user.address"
              ></v-field>
              <error-message
                name="地址"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
          </v-form>
        </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cartData: {}, // 購物車列表
      products: [], // 產品列表
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },

  methods: {
    getProducts() {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
        });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id;
      this.$http.post(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
        { data },
      ).then((res) => {
        console.log(res);
        this.isLoadingItem = '';
        // get-cart 加入購物車並觸發事件
        emitter.emit('get-cart');
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};

</script>
