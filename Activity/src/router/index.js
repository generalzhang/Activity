import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Gallery from '../components/Gallery.vue'
import Introduction from '../components/Introduction.vue'
import Complain from '../components/Complain.vue'
import Activity from '../components/activity.vue'
import Admin from '../components/Admin.vue'
import userAdmin from '../components/userAdmin.vue'
import actAdmin from '../components/actAdmin.vue'
import comAdmin from '../components/comAdmin.vue'
import AfterActItem from '../components/Afteractitem.vue'
import Afteractivity from '../components/Afteractivity.vue'

export default new VueRouter({
	mode : 'history',
	routes : [
		{ path : '/gallery/:name', component: Gallery,
		  children : [
		  	{ path : '', component : Activity },
			  { path : 'after', component : Afteractivity },
		  	{ path : 'introduction/:introductionId', component : Introduction },
		  	{ path : 'admin', component : Admin,
				children:[
                    { path : '', component : userAdmin },
					{ path : 'user', component : userAdmin},
                    { path : 'act', component : actAdmin},
                    { path : 'complain', component : comAdmin}
				]
			}
		  ]
		},
		{ path : '/login', component : Login },
		{ path : '/register', component : Register },
        { path : '/complain/:name', component : Complain },
		{ path : '*', redirect : '/gallery/visitor' },
        { path : '/item', component : AfterActItem }
	],
	scrollBehavior: (to, from, savedPosition) => ({ x: 0, y: 0 })
})