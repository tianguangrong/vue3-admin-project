import { defineStore } from "pinia";
// import type { INavItem } from "@/types/nav";

export const useNavStack = defineStore('nav', {
  state() {
    return {
      currentNav: {
        url: '/dashboard',
        name: '数据看板',
        icon: 'DataLine'
      },
      navStack: [{
        url: '/dashboard',
        name: '数据看板',
        icon: 'DataLine'
      }]
    }
  },
  actions: {
    addNavToStack(url: string, name: string, icon: string): void {
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
    }
  },
  getters: {

  }
});