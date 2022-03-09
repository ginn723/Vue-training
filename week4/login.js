<<<<<<< HEAD
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login(){
      const url = `${site}admin/signin`;
      axios.post(url, this.user)
        .then(res => {
          console.log(res);
          const { token, expired } = res.data;
          console.log(token, expired);
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`; //儲存 cookie
          window.location = 'week3.html'
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
});

app.mount('#app');
=======
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login(){
      const url = `${site}admin/signin`;
      axios.post(url, this.user)
        .then(res => {
          console.log(res);
          const { token, expired } = res.data;
          console.log(token, expired);
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`; //儲存 cookie
          window.location = 'product_week4.html'
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
});

app.mount('#app');
>>>>>>> dc3f841d47dca0871a2e1dbe8f9b81d32476a0bf
