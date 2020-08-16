<template lang="html">
	<div class="">
		<div class="row mx-4 py-4 border-bottom">
			<div v-for="type in chartTypes"  class="col-lg-3 col-md-6 col-12">
				<div v-if="evalVariableFromString(type.name).datasets[0].data.length">
					<div class="text-left pl-3 pb-3">
						<small class="text-muted">{{ type.message }}</small><br>
						<span class="graph-title font-weight-bolder">R$ 30</span>
						<b-button class="bg-transparent border-0 p-0 align-top " v-b-tooltip.hover.noninteractive="{ variant: 'dark', interactive: false }" :title="type.varianceDescription">
							<small v-if="getGraphVariance(evalVariableFromString(type.name)) < 0" class="text-danger ml-2 font-weight-bolder" >
								{{ getGraphVariance(evalVariableFromString(type.name)) }}%
							</small>
							<small v-else class="text-success align-top ml-2 font-weight-bolder">+{{ getGraphVariance(evalVariableFromString(type.name)) }}%</small>
						</b-button>
					</div>
					<div class="">
						<LineMinimalistGraph style="height: 90px;"  :chartdata="evalVariableFromString(type.name)"/>
					</div>
				</div>
			</div>
		</div>
		<div class="row mx-4 py-4 border-bottom">
			<div class="col-12 col-lg-6">
				<div class="pb-3 chartTitle">Módulos ativos</div>
				<PolarArea v-if="chartPolarAreaModulesSold.datasets[0].data.length" :chartdata="chartPolarAreaModulesSold"/>
			</div>
			<div class="col-12 col-lg-6">
				<div class="pb-3 chartTitle">Localização dos clientes</div>
				<BrazilMap/>
			</div>
		</div>
	</div>
</template>

<script>
import LineMinimalistGraph from './Graphs/LineMinimalistGraph';
import PolarArea from './Graphs/PolarArea';
import BrazilMap from './Graphs/BrazilMap';

export default {
	data(){
		return{
			chartTypes: [
				{name: "chartTodayData", message: "Hoje:", labels: 24, varianceDescription: "Tendência na última hora"},
				{name: "chartThisWeekData", message: "Últimos 7 dias:", labels: 7, varianceDescription: "Tendência de hoje em relação a ontem"},
				{name: "chartThisMonthData", message: "Últimos 31 dias:", labels: 31, varianceDescription: "Tendência da última semana em relação à passada"},
				{name: "chartThisYearData", message: "Último ano:", labels: 12, varianceDescription: "Tendência no último mês em relação ao anterior"},
			],
			chartTodayData: {
				labels: [],
				datasets: [
					{
						label: 'Data One',
						pointBackgroundColor: 'rgba(0,0,0,0)',
						pointBorderColor: 'rgba(0,0,0,0)',
						backgroundColor: 'rgba(0,0,0,0)',
						borderColor: '#0D0630',
						data: [

						]
					}
				]
			},
			chartThisWeekData: {
				labels: [],
				datasets: [
					{
						label: 'Data One',
						pointBackgroundColor: 'rgba(0,0,0,0)',
						pointBorderColor: 'rgba(0,0,0,0)',
						backgroundColor: 'rgba(0,0,0,0)',
						borderColor: '#0D0630',
						data: [

						]
					}
				]
			},
			chartThisMonthData: {
				labels: [],
				datasets: [
					{
						label: 'Data One',
						pointBackgroundColor: 'rgba(0,0,0,0)',
						pointBorderColor: 'rgba(0,0,0,0)',
						backgroundColor: 'rgba(0,0,0,0)',
						borderColor: '#0D0630',
						data: [

						]
					}
				]
			},
			chartThisYearData: {
				labels: [],
				datasets: [
					{
						label: 'Data One',
						pointBackgroundColor: 'rgba(0,0,0,0)',
						pointBorderColor: 'rgba(0,0,0,0)',
						backgroundColor: 'rgba(0,0,0,0)',
						borderColor: '#0D0630',
						data: [

						]
					}
				]
			},
			chartPolarAreaModulesSold:{
				labels: ['Financeiro', 'Monitoramento de dados', 'RH'],
				datasets: [
					{
						label: 'Data One',
						borderWidth: 1,
						backgroundColor: `#${document.$COLORS.base_dark.split("#")[1]}80`,
						hoverBackgroundColor: document.$COLORS.base_dark,
						borderColor: document.$COLORS.base_darker,
						data: [5, 1, 14]
					}
				]
			}
		}
	},
	components: {
		LineMinimalistGraph,
		PolarArea,
		BrazilMap,
	},
	mounted(){
		for (var index in this.chartTypes) {
			let currentChartType = this.chartTypes[index];
			for(var i = 0 ; i < currentChartType.labels ; i++){
				this[currentChartType.name].labels.push(i+1)
				this[currentChartType.name].datasets[0].data.push(
					Math.floor(Math.random() * 100),
				);
			}
		}
	},
	methods: {
		getGraphVariance(arr){
			let lastIndex = arr.datasets[0].data.length - 1;
			let originalNumber = arr.datasets[0].data[lastIndex - 1];
			let variance = arr.datasets[0].data[lastIndex] - arr.datasets[0].data[lastIndex - 1];
			return ((variance / originalNumber) * 100).toFixed(2);
		},
		evalVariableFromString(str){
			return this[str];
		},
	}
}
</script>

<style lang="scss" scoped>
.overviewMoney{
	font-size: 2em;
}

.graph-title{
	font-size: 1.3em;
}

.chartTitle{
	font-size: 0.8rem;
    font-weight: 600;
}
</style>
