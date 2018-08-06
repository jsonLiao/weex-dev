/*global Vue*/
import Router from 'vue-router'
import home from '@/pages/home/index'
import sort from '@/pages/sort/index'
import store from '@/pages/store/index'
import myLeadr from '@/pages/store/my-leader'
import myGroup from '@/pages/store/my-group'
import myRecord from '@/pages/store/my-record'
import myGroupEidt from '@/pages/store/my-group-eidt'
import shop from '@/pages/shop/index'
import user from '@/pages/user/index'
import login from '@/pages/login/index'
import search from '@/pages/search'
import leaderstep from '@/pages/team/leaderstep'

Vue.use(Router)

export default new Router({
    //mode: 'history',
    routes: [{
            path: '/',
            // redirect: '/team/leaderstep'
            redirect: '/store/my-group'
            // redirect: '/store/my-leader'
            // redirect: '/store/my-record'
        },
        {
            path: '/home/index',
            component: home
        },
        {
            path: '/sort/index',
            component: sort
        },
        {
            path: '/store/index',
            component: store
        },
        {
            path: '/store/my-group',
            component: myGroup
        },
        {
            path: '/store/my-group-eidt',
            component: myGroupEidt
        },
        {   
            path: '/store/my-leader',
            component: myLeadr
        },
        {
            path: '/store/my-record',
            component: myRecord
        },
        {
            path: '/shop/index',
            component: shop
        },
        {
            path: '/user/index',
            component: user
        },
        {
            path: '/login/index',
            component: login
        },
        {
            path: '/search',
            component: search
        },
        {
            path: '/team/leaderstep',
            component: leaderstep
        },
    ]
})