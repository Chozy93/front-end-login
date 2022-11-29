import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
  
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
  
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/user',
    name: 'user',
  
    component: () => import('../views/BoardUser.vue')
  },
  {
    path: '/login',
    name: 'login',
  
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
  
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/register',
    name: 'register',
  
    component: () => import('../views/RegisterView.vue')
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// TODO: 아래 소스로 불법적인 접근을 하면 강제 로그인페이지로 이동
// 않하면 서버쪽 권한체크로 에러코드를 화면에 보이게 만듬
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
export default router
