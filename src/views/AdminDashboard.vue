<template lang="html">
	<div class="container-fluid dash_content_container bg-light p-0">
		<div class="float-left">
			<Sidebar :userName="userName"/>
		</div>
		<div class="vh-100">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Sidebar from '@/components/AdminDashboard/Sidebar'

export default {
	name: "DashboardEmpresa",
	data(){
		return{

		}
	},
	mixins: [

	],
	components: {
		Sidebar
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

.template-background-secondary{
	min-height: $base-secondary;
}

#small-sidebar{
	height: 100vh;
	background-color: $base-secondary;
}
</style>
