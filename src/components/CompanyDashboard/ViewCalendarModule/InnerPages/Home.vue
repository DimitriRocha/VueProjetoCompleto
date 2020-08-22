<template lang="html">
	<div class="rounded shadow-lg w-80 m-auto bg-light pt-5 px-3 position-relative">
		<ViewModalGenerator v-if="viewModalInfo.show" :title="viewModalInfo.title" @close="closeViewModalGenerator()" :url="viewModalInfo.url" :actionType="viewModalInfo.actionType" :formData="viewModalInfo.formData" :objId="viewModalInfo.objId"/>
		<div class="squareLogo shadow-sm p-2 text-light position-absolute">
			<b-icon icon="calendar3" class="w-100 h-100"></b-icon>
		</div>
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
			<div class="col-9 pb-5">
				<FullCalendar :options="calendarOptions"/>
			</div>
		</div>
	</div>
</template>

<script>
import ViewModalGenerator from '@/components/ViewModalGenerator';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
	data(){
		return {
			viewModalInfo: this.getModalInfoReset(),
			value: null,
			calendarOptions: {
				headerToolbar: {
					left: 'dayGridMonth,timeGridWeek,timeGridDay',
					center: 'title',
					right: 'custom1 prev,next'
				},
				customButtons: {
					custom1: {
						text: 'custom 1',
						click: function() {
							alert('clicked custom button 1!');
						}
					}
				},
				plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
				initialView: 'dayGridMonth',
				buttonText:
				{
					today:    'Hoje',
					month:    'Mês',
					week:     'Semana',
					day:      'Dia',
					list:     'Lista'
				},
				dateClick: this.handleDateClick,
				eventClick: this.handleEventClick,
				locale: 'pt-br',
				events: [

				]
			}
		}
	},
	components:{
		FullCalendar,
		ViewModalGenerator
	},
	mounted(){
		this.setCurrentUserEvents();
	},
	methods:{
		setToday() {
			const now = new Date()
			this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		},
		clearDate() {
			this.value = ''
		},
		handleDateClick(arg){
			this.viewModalInfo.actionType = 'add';
			this.viewModalInfo.title = "Adicionar cliente";
			this.viewModalInfo.show = true;
		},
		handleEventClick(arg){
			this.viewModalInfo.actionType = 'edit';
			this.viewModalInfo.objId = parseInt(arg.event.id);
			this.viewModalInfo.title = "Ver cliente";
			this.viewModalInfo.show = true;
			console.log(arg.event);
		},
		setCurrentUserEvents(){
			this.$axios.get('/calendar/appointment/CurrentUserAppointments')
			.then((response) => {
				response.data.forEach((item, i) => {
					this.calendarOptions.events.push({
						id: item.id,
						title: item.name,
						date: this.dateTimeToDate(item.scheduledTime),
					});
				});
			})
			.catch((error) => {
				console.log(error);
			});
		},
		dateTimeToDate(convertDate){
			let dt = new Date(convertDate);
			return dt.toISOString().substring(0, 10);
		},
		getModalInfoReset(){
			return {
				show: false,
				actionType: 'view',
				url: '/calendar/appointment',
				objId: null,
				title: "Adicionar módulo",
				formData: {
					name: {
						idName: "name",
						label: "Nome",
						type: "text",
						value: null,
					},
					scheduledTime: {
						idName: "scheduledTime",
						label: "Inicio",
						type: "datetime",
						value: null,
					},
					scheduledEndTime: {
						idName: "scheduledTime",
						label: "Fim",
						type: "datetime",
						value: null,
					},
				}
			}
		},
		closeViewModalGenerator(){
			this.viewModalInfo = this.getModalInfoReset();
		}
	},
	computed: {

	}
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.fc-daygrid-day-events{
	cursor: pointer;
}

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
