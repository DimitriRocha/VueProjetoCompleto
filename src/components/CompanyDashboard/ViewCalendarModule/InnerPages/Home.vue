<template lang="html">
	<div class="container-fluid pt-5">
		<div class="row">
			<div class="col-3">
				<b-calendar	:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="pt-br">
					<div class="d-flex" dir="ltr">
						<b-button
						size="sm"
						variant="outline-danger"
						v-if="value"
						@click="clearDate">Clear date</b-button>
						<b-button
						size="sm"
						variant="outline-primary"
						class="ml-auto"
						@click="setToday">Set Today</b-button>
					</div>
				</b-calendar>
			</div>
			<div class="col-3">
				<BasicDynamicForm :formData.sync="formData"></BasicDynamicForm>
			</div>
		</div>
	</div>
</template>

<script>
import BasicDynamicForm from '@/components/BasicDynamicForm';

export default {
	data(){
		return {
			value: null,
			formData:{
				date: {
					idName: "date",
					label: "date",
					type: "datetime-local",
					value: null,
				}
			}
		}
	},
	methods: {
		setToday() {
			const now = new Date()
			this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		},
		clearDate() {
			this.value = ''
		}
	},
	computed: {
		
	},
	components:{
		BasicDynamicForm
	}
}
</script>

<style lang="css" scoped>
</style>
