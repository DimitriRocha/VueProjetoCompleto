<template lang="html">
	<div class="">
		<b-sidebar id="sidebar" :title="userName" text-variant="light" shadow class="bg-darker text-capitalize border-right">
			<img src="@/assets/LOGO-08.png" class="img-fluid w-50">
			<div class="">
				<div v-for="submenu in sidebarSubmenusData" class="px-3 py-2">
					<div class="side-nav-title text-left mt-4">
						{{ submenu.title }}
					</div>
					<ul class="list-group text-left">
						<router-link v-for="link in submenu.links" v-bind:key="link.id" :to="link.linkTo" class="text-decoration-none">
							<li v-if="link.functionNameOnClick" @click="handleDynamicFunctionCalls(link.functionNameOnClick)" class="side-nav-actions list-group-item bg-transparent border-0">
								<b-icon :icon="link.iconClassName" class="mr-2"></b-icon>{{ link.name }}
							</li>
							<li v-else class="side-nav-actions list-group-item bg-transparent border-0">
								<b-icon :icon="link.iconClassName" class="mr-2"></b-icon>{{ link.name }}
							</li>
						</router-link>
					</ul>
				</div>
			</div>
		</b-sidebar>
		<div id="small-sidebar" class="vh-100" style="width: 50px;">
			<b-button v-b-toggle.sidebar class="p-1 bg-transparent border-0 shadow-none"><img src="@/assets/LOGO-02.png" class="img-fluid p-1" alt=""></b-button>
			<div id="iconsHorizontalTray">
				<div v-for="submenu in sidebarSubmenusData">
					<ul class="list-group">
						<router-link v-for="link in submenu.links" :to="link.linkTo" class="text-decoration-none">
							<li v-if="link.functionNameOnClick" @click="handleDynamicFunctionCalls(link.functionNameOnClick)" class="side-nav-actions list-group-item bg-transparent border-0" v-b-tooltip.hover.right.noninteractive="{ variant: 'dark', interactive: false }" :title="link.name">
								<b-icon :icon="link.iconClassName" class=""></b-icon>
							</li>
							<li v-else class="side-nav-actions list-group-item bg-transparent border-0" v-b-tooltip.hover.right.noninteractive="{ variant: 'dark', interactive: false }" :title="link.name">
								<b-icon :icon="link.iconClassName" class=""></b-icon>
							</li>
						</router-link>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			sidebarSubmenusData: {
				general: {
					title: "Geral",
					links: [
						{
							name: "Visão geral",
							linkTo: "/admin",
							iconClassName: "house",
						},
						{
							name: "Módulos",
							linkTo: "/admin/modules",
							iconClassName: "columns-gap",
						},
						{
							name: "Chamados e bugs",
							linkTo: "/admin/bugs",
							iconClassName: "bug",
						},
						{
							name: "Financeiro",
							linkTo: "/admin/finances",
							iconClassName: "cash-stack",
						},
						{
							name: "Clientes",
							linkTo: "/admin/customers",
							iconClassName: "people",
						},
					]
				},
				User: {
					title: "Usuário",
					links: [

						{
							name: "Sair",
							functionNameOnClick : "logout",
							linkTo: "",
							iconClassName: "arrow-bar-left",
						},
					]
				}
			}
		}
	},
	props: {
		userName: String
	},
	methods: {
		handleDynamicFunctionCalls(functionName){
			this[functionName]();
		},
		logout(){
			let context = this;

			this.$store.dispatch('logout')
			.then(function (response) {
				if (response.status == 200) {
					console.log("Deslogado");
					context.$router.push("/login");
				}else{
					console.log("Algo deu errado");
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},
	},
	computed:{

	}
}
</script>

<style lang="scss">
#sidebar{
	background-color: $base-darker !important;
}

.sidebar{
	min-height: 100vh;
}

.side-nav-actions{
	text-decoration: none;
	color: $base-light;
}

.side-nav-actions:hover{
	text-decoration: none;
	color: $base-lighter;
	font-weight: bold;
}

#small-sidebar{
	background-color: $base-darker;
}

button {
	outline: none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}

input:focus, textarea:focus, select:focus, button:focus{
	outline: none;
}

#iconsHorizontalTray{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
</style>
