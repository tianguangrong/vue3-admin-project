import { defineStore } from "pinia";
import http from '../utils/http';
import type { User, IUsercofig, IMenu } from "@/types";
import { reactive } from "vue";
export const useUserStore = defineStore('user', () => {
  const user = JSON.parse(sessionStorage.getItem('user') as string);
  let userConfigDatas = reactive<IUsercofig>({
    menulist: JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('menulist')))) || [],
    token:  sessionStorage.getItem('token') ||'',
    user: {
      username:  user?.username ?? '',
      role:  user?.role ?? []
    }
  });
  async function login(url:string, params:User): Promise<string> {
    try {
      const { data } = await http.post(url, params)
      if (data) {
        const {  menulist, token, user } = data as IUsercofig;
        userConfigDatas.menulist = menulist;
        userConfigDatas.token = token;
        userConfigDatas.user = user;
        sessionStorage.setItem('menulist', JSON.stringify(userConfigDatas.menulist));
        sessionStorage.setItem('token', userConfigDatas.token)
        sessionStorage.setItem('user', JSON.stringify(userConfigDatas.user))
      }
      return Promise.resolve('登录成功')
    } catch(error) {
      return Promise.reject('登录失败')
      throw new Error('系统错误，请联系管理员！');
    }
  }
  function logout():Promise<string> {
    userConfigDatas.menulist = [];
    userConfigDatas.token = '';
    userConfigDatas.user.username = '';
    userConfigDatas.user.role = [];
    sessionStorage.clear();
    return Promise.resolve('退出成功');
  }
  return {
    login,
    logout,
    userConfigDatas,
  }
})
