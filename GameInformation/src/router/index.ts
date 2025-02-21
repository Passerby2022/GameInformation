import { createMemoryHistory, createRouter } from 'vue-router'
import Cookies from 'js-cookie';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const routes = [
  { path: '/login', component: () => import('../views/login/index.vue')},
  { path:'/', component: () => import('../views/home/index.vue')},
  { path:'/cencern', component: () => import('../views/home/cencern.vue')},
  { path:'/game', component: () => import('../views/home/game.vue')},
  { path:'/group', component: () => import('../views/group/index.vue')},
  { path:'/information', component: () => import('../views/information/index.vue')},
  { path:'/discuss', component: () => import('../views/discuss/index.vue')},
  { path:'/podcast', component: () => import('../views/podcast/index.vue')},
  { path:'/edit', component: () => import('../views/edit/index.vue')},
  { path:'/video', component: () => import('../views/video/index.vue')},
  { path:'/audioBook', component: () => import('../views/audioBook/index.vue')},
  { path:'/order', component: () => import('../views/order/index.vue')},
  { path:'/specialSubject', component: () => import('../views/specialSubject/index.vue')},
  { path:'/warehouse', component: () => import('../views/warehouse/index.vue')},
  { path:'/userIndex', component: () => import('../views/userIndex/index.vue')},
  { path:'/detailedIndex', component: () => import('../views/video/detailed.vue')},
  { path:'/discussDetailed', component: () => import('../views/discuss/detailed.vue')},
  { path:'/informationDetailed', component: () => import('../views/information/detailed.vue')},
  { path:'/editDetailed', component: () => import('../views/edit/detailed.vue')},
  { path:'/podcastDetailed', component: () => import('../views/podcast/detailed.vue')},
  { path:'/chooseGroup', component: () => import('../views/group/choose.vue')},
  { path:'/chooseGroup', component: () => import('../views/group/choose.vue')},
  { path:'/upData', component: () => import('../views/group/updata.vue')},
  { path:'/setting', component: () => import('../views/setting/index.vue')},
  { path:'/contributeArticle', component: () => import('../views/contribute/article.vue')},
  { path:'/contributeInformation', component: () => import('../views/contribute/information.vue')},
  { path:'/contributePodcast', component: () => import('../views/contribute/podcast.vue')},
  { path:'/contributeVideo', component: () => import('../views/contribute/video.vue')},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 检查特定的cookie是否存在
  const requiredCookie = Cookies.get('user');
  if (requiredCookie) {
    // 如果cookie存在，允许跳转
    next();
  } else {
    // 如果cookie不存在，重定向到登录页面或显示错误消息
    if (to.path !== '/login') {
      next('/login'); // 重定向到登录页面
    } else {
      // 如果已经在登录页面，则不需要进一步操作
      next();
    }
  }
});

export default router
