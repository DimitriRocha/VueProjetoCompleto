<script>
import { Line } from 'vue-chartjs'

export default {
	data(){
		return{
			options: {
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 5,
						right: 5,
						top: 0,
						bottom: 35
					}
				},
				legend: {
					display: false,
				},
				scales: {
					xAxes: [{
						display:false,
					}],
					yAxes: [{
						gridLines: {
							display: false,
						},
						ticks: {
							beginAtZero: true,
							fontSize: 10,
							fontColor: document.$COLORS.base_darker,
							maxTicksLimit: 2,
							padding: 25,
						}
					}]
				},
			}
		}
	},
	extends: Line,
	props: {
		chartdata: {
			type: Object,
			default: null
		}
	},
	mounted () {
		this.renderChart(this.chartdata, this.options)
	}
}
</script>

<style media="screen">

</style>
