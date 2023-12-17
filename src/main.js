
import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store.js';
import 'normalize.css';
import router from './router/router.js';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');


