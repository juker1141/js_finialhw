import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/frontend/Home.vue'),
      },
      {
        path: 'information',
        component: () => import('../views/frontend/Information.vue'),
      },
      {
        path: 'payment',
        component: () => import('../views/frontend/Payment.vue'),
      },
      {
        path: 'paycheck',
        component: () => import('../views/frontend/Paycheck.vue'),
      },
      {
        path: 'paydone',
        component: () => import('../views/frontend/Paydone.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'orderlist',
        component: () => import('../views/frontend/Orderlist.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/frontend/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/backend/Adminhome.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orderlist',
        component: () => import('../views/backend/Orderlist.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'picturelibrary',
        component: () => import('../views/backend/Picturelibrary.vue'),
      },
      {
        path: 'simulateorder',
        component: () => import('../views/backend/Simulateorder.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
