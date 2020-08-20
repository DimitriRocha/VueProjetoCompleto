<template lang="html">
	<div class="rounded shadow-lg w-80 m-auto bg-light text-light p-relative">
		<ViewModalGenerator v-if="viewModalInfo.show" :title="viewModalInfo.title" @close="closeViewModalGenerator()" :url="viewModalInfo.url" :actionType="viewModalInfo.actionType" :formData="viewModalInfo.formData" :objId="viewModalInfo.objId"/>
		<div class="squareLogo shadow-sm p-2">
			<b-icon icon="columns-gap" class="w-100 h-100"></b-icon>
		</div>
		<div class="px-4">
			<b-button @click="openModalGenerator('add')" class="add-button float-right rounded-circle">+</b-button>
		</div>
		<div class="p-4">
			<div class="text-left">
				<h3 class="text-dark">Módulos</h3>
			</div>
			<b-table table-variant="secondary-light" head-variant="dark" striped hover bordered :fields="modulesTable.fields" :items="modulesTable.items">
				<template v-slot:cell(actions)="row">
					<b-button class="mr-2" @click="openModalGenerator('view', row.item.id)"><b-icon icon="eye-fill" aria-hidden="true"></b-icon></b-button>
					<b-button @click="openModalGenerator('edit', row.item.id)"><b-icon icon="pencil-square" aria-hidden="true"></b-icon></b-button>
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
import ViewModalGenerator from '@/components/ViewModalGenerator';

export default {
	data() {
		return {
			viewModalInfo: this.getModalInfoReset(),
			modulesTable: {
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
		}
	},
	components:{
		ViewModalGenerator
	},
	mounted(){
		this.$axios.get(`/module`)
		.then((response) => {
			this.modulesTable.items = response.data;
		})
		.catch((error) => {
			console.log(error);
		});
	},
	methods:{
		openModalGenerator(actionType, objId = null){
			this.viewModalInfo.actionType = actionType;
			switch (actionType) {
				case 'view': {
					this.viewModalInfo.objId = objId;
					this.viewModalInfo.title = "Visualizar módulo";
					this.viewModalInfo.show = true;
					break;
				}
				case 'add': {
					this.viewModalInfo.title = "Adicionar módulo";
					this.viewModalInfo.show = true;
					break;
				}
				case 'edit':{
					this.viewModalInfo.title = "Editar módulo";
					this.viewModalInfo.objId = objId;
					this.viewModalInfo.show = true;
					break;
				}
				default:{

				}
			}
		},
		closeViewModalGenerator(){
			this.viewModalInfo = this.getModalInfoReset();
		},
		getModalInfoReset(){
			return {
				show: false,
				actionType: 'view',
				url: '/module',
				objId: null,
				title: "Adicionar módulo",
				formData: {
					name: {
						idName: "name",
						label: "Nome",
						type: "text",
						value: null,
						style: {
							color: document.$COLORS.base_dark
						}
					},
					active: {
						idName: "senha",
						label: "Ativo",
						type: "switch",
						value: false,
						style: {
							color: document.$COLORS.base_dark
						}
					},
					desc: {
						idName: "desc",
						label: "Descrição",
						type: "textarea",
						value: null,
						style: {
							color: document.$COLORS.base_dark
						}
					},
					freeDesc: {
						idName: "desc",
						label: "Descrição do plano grátis",
						type: "textarea",
						value: null,
						style: {
							color: document.$COLORS.base_dark
						}
					},
					premiumDesc: {
						idName: "desc",
						label: "Descrição do premium",
						type: "textarea",
						value: null,
						style: {
							color: document.$COLORS.base_dark
						}
					},
				}
			}
		}
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

.add-button{
	transition: all 0.5s;
}
</style>
