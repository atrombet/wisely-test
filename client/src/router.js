import Vue from 'vue';
import Router from 'vue-router';
import Reservations from './views/Reservations';
import Inventory from './views/Inventory';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/reservations'
    },
    {
      path: '/reservations',
      component: Reservations
    },
    {
      path: '/inventory',
      component: Inventory
    }
  ]
});
