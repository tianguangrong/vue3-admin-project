import router from ".";
import { useUserStore } from "@/store/User";
router.beforeEach((to, from) => {
  const userStore = useUserStore(); 
  const token = userStore.userConfigDatas.token;
  if (token) {
    if (to.path === '/login') {
      return { path:  from.path || '/' };
    }
  } else {
    if (to.path !== '/login') {
      return { path: '/login' };
    }
  }
  
})