<template lang="html">
	<div class="container-fluid p-0 h-100">
		<div class="row no-gutters h-100">
			<div class="col-lg-2 col-12 border-right shadow vh-md-100 px-2">
				<CustomersList/>
			</div>
			<div class="col-lg-8 col-12">
				<div class="row pt-5 mx-4 border-bottom border-muted">
					<div class="col-12 col-md-6 text-left">
						<div class="">
							<small class="text-muted">Tipo de resumo</small><br>
							<b-form-select v-model="selectOverviewType.selected" :options="selectOverviewType.options" class="border-0 bg-transparent w-auto pr-5 pl-0 font-weight-bold selectTypeOfOverview"></b-form-select>
						</div>
						<div class="py-3">
							<div class=" font-weight-bold">
								<span class="overviewMoney mr-4">R$20.948,00</span>
								<small class="align-top text-muted"><b-icon icon="dash" class="mr-1" aria-hidden="true"></b-icon>2.000,00</small>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-6">
						<b-button class="float-right bg-transparent text-muted font-weight-bold">Configurar</b-button>
					</div>
				</div>
				<Overview v-if="selectOverviewType.selected == null"/>
			</div>
			<div class="col-lg-2 col-12 border-left shadow">
				<SideInfo/>
			</div>
		</div>
	</div>
</template>

<script>
import Overview from './Overview';
import CustomersList from './CustomersList';
import SideInfo from './SideInfo';

export default {
	data(){
		return{
			selectOverviewType:{
				selected: null,
				options: [
					{ value: null, text: "Geral" },
					{ value: 1, text: "Financeiro" }
				],
			}
		}
	},
	components: {
		CustomersList,
		Overview,
		SideInfo,
	}
}
</script>

<style lang="scss" scoped>

.selectTypeOfOverview{
	font-size: 1.6em;
}

</style>
