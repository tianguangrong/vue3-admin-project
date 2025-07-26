import { defineStore } from "pinia";
// import type { INavItem } from "@/types/nav";
import type { IMenu } from "@/types";
interface IUserState<T> {
  currentNav: T;
  navStack: T[];
}
export const useNavStack = defineStore('nav', {
  state():IUserState<IMenu> {
    return {
      currentNav: {
        url: '/dashboard',
        name: '数据看板',
        icon: 'DataLine'
      },
      navStack: [],
    }
  },
  actions: {
    addNavToStack(url: string = '', name: string, icon: string): void {
      if (!(this.navStack.some(item => item.url === url))) {
        this.navStack.push({
          name, url, icon
        })
      }
    },
    updateCurrentNav(url: string, name: string, icon: string): void {
      if (this.currentNav.url !== url) {
        this.currentNav = {name, url, icon}
      }
    },
    removeSliceOnNavStack(url: string, index: number):void {
      console.log(url, index);
      if (index !== 0 && this.currentNav.url === url) {
        // 改变原数组的方法
        this.navStack.splice(index, 1);
        this.currentNav = this.navStack[index - 1];
        return
      } else if (this.currentNav.url !== url) {
        this.navStack.splice(index, 1);
      }
    }
  },
  getters: {
  }
});