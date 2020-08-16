<template lang="html">
	<div class="rounded shadow-lg w-80 m-auto bg-light text-light p-relative">
		<div class="squareLogo shadow-sm p-2">
			<b-icon icon="people" class="w-100 h-100"></b-icon>
		</div>
		<div class="p-4">
			<div class="text-left">
				<h3 class="text-dark">Clientes</h3>
			</div>
			<b-table table-variant="secondary-light" head-variant="dark" striped hover bordered :fields="fields" :items="items">
				<template v-slot:cell(actions)="row">
					a
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			fields: [
				{ key: 'id', label: '#', sortable: true, sortDirection: 'asc' },
				{ key: 'name', label: 'Nome', sortable: true, sortDirection: 'asc' },
				{ key: 'active', label: 'Ativo', formatter: (value, key, item) => {
					return value ? 'Sim' : 'Não'
				}, },
				{ key: 'actions', label: 'Ações' }
			],
			items: [

			]
		}
	},
	mounted(){
		this.$axios.get(`/company`)
		.then((response) => {
			this.items = response.data;
		})
		.catch((error) => {
			console.log(error);
		});
	}
}
</script>

<style lang="scss" scoped>
.squareLogo{
	height: 50px;
	width: 50px;
	border-radius: 5px;
	background-color: $base-dark;
	position: relative;
	top: -25px;
	left: 25px;
}
</style>
