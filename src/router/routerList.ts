import { type RouteRecordRaw } from 'vue-router';

const routes:Array<RouteRecordRaw> = [
  {
    name: 'defaultLayout',
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/pageLayout/defaultPage.vue'),
    children:[
        {
            path:"/dashboard",
            name:"dashboard",
            component:()=>import("@/views/dashBoard/index.vue"),
            meta: {
              roleAuth: ['admin']
            }
        },
        {
            path:"/chargingstation/monitor",
            name:"monitor",
            component:()=>import("@/views/chargingstation/monitor.vue")
        },
        {
            path:"/chargingstation/revenue",
            name:"revenue",
            component:()=>import("@/views/chargingstation/revenue.vue")
        },
        {
            path:"/chargingstation/fault",
            name:"fault",
            component:()=>import("@/views/chargingstation/manage.vue")
        },
        {
            path:"/map",
            name:"map",
            component:()=>import("@/views/map/index.vue")
        },
        {
            path:"/operations/orders",
            name:"orders",
            component:()=>import("@/views/operations/order.vue"),
            meta:{
                keepAlive:true
            }
        },
        {
            path:"/operations/detail",
            name:"detail",
            component:()=>import("@/views/operations/detail.vue")
        },
        {
            path:"/operations/total",
            name:"total",
            component:()=>import("@/views/operations/total.vue")
        },
        {
            path:"/alarm",
            name:"alarm",
            component:()=>import("@/views/alarm/index.vue")
        },
        {
            path:"/equipment",
            name:"equipment",
            component:()=>import("@/views/equipment/index.vue"),   
        },
        {
            path:"/document",
            name:"document",
            component:()=>import("@/views/document/index.vue"),
            meta:{
                needAuth:["admin","manager"]
            }
        },
        {
            path:"/system",
            name:"system",
            component:()=>import("@/views/system/index.vue"),
            meta:{
                needAuth:["admin"]
            }
        },
        {
            path:"/personal",
            name:"personal",
            component:()=>import("@/views/personal/index.vue")
        },
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pageLayout/login.vue')
  },
  {
    name: 'error',
    path: '/:catchAllError404(.*)*',
    component: () => import('@/pageLayout/error404.vue')
  },
];
export default routes;