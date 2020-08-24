import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('../views/layout/Home.vue'),
      },
      {
        path: '/about',
        component: () => import('../views/layout/About.vue'),
      },
      {
        path: '/products',
        component: () => import('../views/layout/Products.vue'),
      },
      {
        path: '/product/:id',
        component: () => import('../views/layout/Product.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/layout/Cart.vue'),
      },
      {
        path: '/login',
        component: () => import('../views/layout/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
