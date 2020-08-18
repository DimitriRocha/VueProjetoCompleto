<template lang="html">
	<div>
		<b-navbar toggleable="lg" type="dark" class="bg-darker d-md-flex d-none">
			<b-navbar-brand href="#">Projeto Kokytos</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">
						<router-link class="text-light" to="/">
							Test1
						</router-link>
					</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<div v-if="loggedIn">
						<b-nav-item-dropdown right>
							<template v-slot:button-content>
								<em>Usuário</em>
							</template>
							<b-dropdown-item href="#">Perfil</b-dropdown-item>
							<b-dropdown-item @click="logout()" href="#">Sair</b-dropdown-item>
						</b-nav-item-dropdown>
					</div>
					<div v-else>
						<b-nav-item-dropdown right>
							<template v-slot:button-content>
								<em>Conta</em>
							</template>
							<b-dropdown-item href="#">
								<router-link class="text-dark" to="/login">
									Login
								</router-link>
							</b-dropdown-item>
							<b-dropdown-item href="#">
								<router-link class="text-dark" to="/register">
									Registrar
								</router-link>
							</b-dropdown-item>
						</b-nav-item-dropdown>
					</div>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {

		};
	},
	components:{

	},
	methods: {
		logout(){
			debugger;
		}
	},
	computed:{
		loggedIn(){
			return this.$store.getters.loggedIn;
		}
	}
};
</script>

<style lang="scss" scoped>
.bg-darker{
	background-color: $base-darker;
}
</style>
