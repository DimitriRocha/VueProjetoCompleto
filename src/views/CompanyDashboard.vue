<template lang="html">
	<div class="container-fluid dash_content_container bg-light p-0">
		<Sidebar :userName="userName"/>
		<Navbar/>
		<div class="h-100">
			<router-view/>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardEmpresa",
	data(){
		return{

		}
	},
	mixins: [

	],
	components: {

	},
	mounted(){

	},
	methods:{


	},
	computed: {
		userName(){
			return this.$store.getters.getUserName;
		}
	}
}
</script>

<style lang="scss" scoped>
.dash_content_container{
	min-height: 100vh;
}
</style>
