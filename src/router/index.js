import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
		meta:{
			navbar: false,
			authorize: false
		},
	},
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta:{
			navbar: true,
			authorize: false
		},
	},
	{
		path: '/admin',
		component: () => import('../views/AdminDashboard.vue'),
		children: [
			{
				path: '',
				name: 'AdminDashboardHome',
				meta:{
					authorize: true
				},
				component: () => import('../components/AdminDashboard/ViewHome/Index.vue')
			},
			{
				path: 'modules',
				component: () => import('../components/AdminDashboard/ViewModules/Index.vue'),
				children: [
					{
						path: '',
						name: 'AdminDashboardModules',
						meta:{
							authorize: true
						},
						component: () => import('../components/AdminDashboard/ViewModules/InnerPages/Home.vue'),
					},
				]
			},
			{
				path: 'bugs',
				component: () => import('../components/AdminDashboard/ViewBugs/Index.vue'),
				children: [
					{
						path: '',
						name: 'AdminDashboardBugs',
						meta:{
							authorize: true
						},
						component: () => import('../components/AdminDashboard/ViewBugs/InnerPages/Home.vue'),
					},
				]
			},
			{
				path: 'finances',
				component: () => import('../components/AdminDashboard/ViewFinances/Index.vue'),
				children: [
					{
						path: '',
						name: 'AdminDashboardFinances',
						meta:{
							authorize: true
						},
						component: () => import('../components/AdminDashboard/ViewFinances/InnerPages/Home.vue'),
					},
				]
			},
			{
				path: 'customers',
				component: () => import('../components/AdminDashboard/ViewCustomers/Index.vue'),
				children: [
					{
						path: '',
						name: 'AdminDashboardCustomers',
						meta:{
							authorize: true
						},
						component: () => import('../components/AdminDashboard/ViewCustomers/InnerPages/Home.vue'),
					},
				]
			},
		]
	},
	{
		path: '/dashboard',
		component: () => import('../views/CompanyDashboard.vue'),
		children: [
			{
				path: '',
				name: 'CompanyDashboardHome',
				meta:{
					authorize: true
				},
				component: () => import('../components/CompanyDashboard/ViewHome/Index.vue')
			},
			{
				path: 'shop',
				name: 'CompanyDashboardShop',
				meta:{
					authorize: true
				},
				component: () => import('../components/CompanyDashboard/ViewStore/Index.vue')
			},
		]
	},
	{
		path: '/select_company',
		name: 'ChooseCompany',
		component: () => import('../views/ChooseCompany.vue'),
		meta:{
			authorize: true
		},
	},
]

const router = new VueRouter({
	routes
})

router.beforeEach(async (to, from, next) => {
	await Store.dispatch('checkAuth');

	//Caso o usuário tente acessar uma página não autorizada redireciona para o login
	if (to.meta.authorize && !Store.getters.loggedIn) {
		console.log("Went to login");
		return next('/login');
	}
	//Administradores e empresas devem sempre ficar em suas rotas
	if (Store.getters.loggedIn) {
		if (Store.getters.isAdmin && to.path.split("/")[1] != 'admin') {
			return next('/admin');
		}
		else if(Store.getters.isCompanyAdmin && to.path.split("/")[1] != 'dashboard' && Store.getters.isCompanyAdmin && to.path.split("/")[1] != 'select_company'){
			if (localStorage.getItem('currentCompany')) {
				return next('/dashboard');
			}else{
				return next('/select_company');
			}
		}
	}

	//Usuários não podem acessar o login
	// (TODO): Provavelmente remover registrar e o outro meio de login ou mudar essa lógica
	if (to.meta.authorize && Store.getters.loggedIn) {
		if(Store.getters.isCostumer && to.path == '/login'){
			return next('/');
		}
	}

	return next();
});

export default router
