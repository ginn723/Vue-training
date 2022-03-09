import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'cinnroll';

const app = createApp({
  data() {
    return {
      products: [], //定義資料，取得產品資料
      tempProduct: {},
    }
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); //取出 cookie

      axios.defaults.headers.common['Authorization'] = token;
      console.log(token)

      const url = `${site}api/user/check`
      axios.post(url)
        .then(()=> {
          this.getProducts(); //觸發 getProducts
        });
    },
    getProducts() {
      const url = `${site}api/${api_path}/admin/products/all`;
      axios.get(url)
        .then(res => {
          this.products = res.data.products
          // console.log(Object.values(this.products)) //物件迴圈
          Object.values(this.products).forEach((item) => {
            console.log(item);  //物件跑迴圈
          }) 
        });
    }
  },
  mounted() {
    this.checkLogin() //在mounted 觸發多一次
  }
});

app.mount('#app');


// 產品資料格式
// const products = [
//   {
//     category: "甜甜圈",
//     content: "尺寸：14x14cm",
//     description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
//     id: "-L9tH8jxVb2Ka_DYPwng",
//     is_enabled: 1,
//     origin_price: 150,
//     price: 99,
//     title: "草莓莓果夾心圈",
//     unit: "個",
//     num: 10,
//     imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
//       "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//     ]
//   },
//   {
//     category: "蛋糕",
//     content: "尺寸：6寸",
//     description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
//     id: "-McJ-VvcwfN1_Ye_NtVA",
//     is_enabled: 16,
//     origin_price: 1000,
//     price: 900,
//     title: "蜂蜜檸檬蛋糕",
//     unit: "個",
//     num: 1,
//     imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
//     imagesUrl: [
//       "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
//     ]
//   },
//   {
//     category: "蛋糕",
//     content: "尺寸：6寸",
//     description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
//     id: "-McJ-VyqaFlLzUMmpPpm",
//     is_enabled: 1,
//     origin_price: 700,
//     price: 600,
//     title: "暗黑千層",
//     unit: "個",
//     num: 15,
//     imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//     imagesUrl: [
//       "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//       "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//     ]
//   }
// ];