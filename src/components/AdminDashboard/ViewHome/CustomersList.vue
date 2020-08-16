<template lang="html">
	<div class="pt-2 text-left">
		<div class="py-5 border-bottom">
			<h5>Clientes:</h5>
			<b-form-input type="text"></b-form-input>
		</div>
		<div class="py-3">
			<div>
				<b-table id="customersTable" small hover borderless :fields="customerTable.fields" :items="customerTable.items" :per-page="customerTable.perpage" :current-page="customerTable.currentPage" thead-class="d-none">
					<template v-slot:cell(id)="data">
						<div class="modules-circle rounded-circle p-2 my-2 bg-dark text-light text-center">
							{{ data.item.companyUser.length }}
						</div>
					</template>
					<template v-slot:cell(name)="data">
						<span>
							{{ data.item.name }}
						</span>
						<br>
						<small class="text-muted">
							Legenda
						</small>
					</template>
					<template v-slot:cell(actions)="data">
						<b-button class="border-0 bg-transparent text-dark p-0" name="button"><b-icon icon="three-dots-vertical" aria-hidden="true"></b-icon></b-button>
					</template>
				</b-table>
				<b-pagination
				v-model="customerTable.currentPage"
				:total-rows="customerTable.items.length"
				:per-page="customerTable.perpage"
				align="fill"
				size="sm"
				class="my-0"
				:hide-goto-end-buttons="true"
				page-class="customerTableGotoPagePagination"
				></b-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			customerTable: {
				perpage: 8,
				currentPage: 1,
				fields: [
					{ key: 'id', label: '#', sortable: true, sortDirection: 'asc' },
					{ key: 'name', label: 'Nome', sortable: true, sortDirection: 'asc' },
					{ key: 'actions', label: 'Ações'},
				],
				items: [

				]
			},
		}
	},
	mounted(){
		this.getCustomers();
	},
	methods:{
		getCustomers(){
			this.$axios.get(`/company`)
			.then((response) => {
				this.customerTable.items = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.modules-circle{
	height: 40px;
	width: 40px;
}
</style>

<style lang="scss">
#customersTable td{
	vertical-align: middle !important;
}

.customerTableGotoPagePagination.active button{
	color: white !important;
	background-color: $base-darker !important;
}

.customerTableGotoPagePagination button{
	color: $base-darker !important;
}

button.page-link span.page-link{
	color: $base-darker !important;
}
</style>
