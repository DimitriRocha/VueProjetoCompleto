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
					navbar: false,
					authorize: true
				},
				component: () => import('../components/AdminDashboard/ViewHome/Index.vue')
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
					navbar: false,
					authorize: true
				},
				component: () => import('../components/CompanyDashboard/ViewHome/Index.vue')
			},
		]
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
		else if(Store.getters.isCompanyAdmin && to.path.split("/")[1] != 'dashboard'){
			return next('/dashboard');
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
