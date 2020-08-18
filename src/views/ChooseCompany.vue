<template lang="html">
	<div class="pt-5">
		<h3>Escolha a empresa:</h3>
		<div v-for="company in userCompanies" class="">
			<b-button @click="selectCompany(company.id)" type="button" name="button">{{ company.name }}</b-button>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			userCompanies: null
		}
	},
	mounted(){
		this.getCurrentUserCompanies();
	},
	methods:{
		getCurrentUserCompanies(){
			this.$axios.get('/company/CurrentUserCompanies')
			.then((response) => {
				this.userCompanies = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		},
		selectCompany(id){
			localStorage.setItem('currentCompany', id);
			this.$router.push({ name: 'CompanyDashboardHome' })
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
