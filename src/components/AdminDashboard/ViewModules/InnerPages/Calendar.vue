<template lang="html">
	<div class="">
		<!-- TODO: Criar configurações de módulo -->
		{{ data }}
	</div>
</template>

<script>
export default {
	data(){
		return{
			data: null
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		getData(){
			this.$axios.get(`/calendar/appointment`)
			.then((response) => {
				this.data = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}
}
</script>

<style lang="css" scoped>
</style>
