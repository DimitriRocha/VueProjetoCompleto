<script>
import { PolarArea } from 'vue-chartjs'

export default {
	data(){
		return{
			options: {
				title: {
					display: false,
					text: "Módulos ativos:"
				},
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 55,
						right: 55,
						top: 0,
						bottom: 0
					}
				},
				legend: {
					align: 'start',
				},
			}
		}
	},
	extends: PolarArea,
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
