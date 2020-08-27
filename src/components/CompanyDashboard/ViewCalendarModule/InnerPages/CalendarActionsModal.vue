<template lang="html">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container col-lg-8 col-md-10 col-12">
					<div class="modal-header align-items-end">
						<slot name="header">
							<div class="float-left">
								<h5 class="text-dark">{{ title }}</h5>
							</div>
							<div class="float-right">
								<b-button class="ml-auto rounded bg-danger border-0" @click="$emit('close')">
									X
								</b-button>
							</div>
						</slot>
					</div>

					<div class="modal-body overflow-auto text-left">
						<slot name="body">
							<b-form-group>
								<label>Nome</label>
								<b-form-input v-model="objData.name"/>
							</b-form-group>
							<b-form-group>
								<b-form-checkbox v-model="allDay">Evento dura o dia todo</b-form-checkbox>
							</b-form-group>
							<b-form-group>
								<label>Inicio</label>
								<b-form-input type="datetime-local" v-model="objData.scheduledTime"/>
							</b-form-group>
							<b-form-group v-if="allDay == false">
								<label>Fim</label>
								<b-form-input type="datetime-local" v-model="objData.scheduledEndTime"/>
							</b-form-group>
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							<b-button v-if="actionType != 'view'" @click="(actionType == 'add' ? sendPostRequest() : sendPutRequest())">Enviar</b-button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	data(){
		return{
			disabled: (this.actionType == 'view' ? true : false),
			allDay: false,
			objData: {
				name: null,
				scheduledTime: this.setUpDate,
				scheduledEndTime: null,
			}
		}
	},
	props:{
		actionType:{
			default: 'add',
			validator: function (value) {
				return ['view', 'edit', 'add'].indexOf(value) !== -1
			}
		},
		objId: {
			required: false,
			type: Number
		},
		setUpDate: {
			required: false,
			type: String,
		},
		title: {
			required: true,
			type: String,
			default: "Ver item do calendário"
		},
		url: {
			required: true,
			type: String,
			default: "/calendar/appointment"
		},
	},
	created(){
		if (this.actionType != 'add') {
			this.getObject(this.objId);
		}
	},
	methods:{
		sendPostRequest(){
			let requestObj = this.objData;

			this.$axios.post(`${this.url}`, requestObj)
			.then((response) => {
				this.payload = response.data;
				this.$emit('close');
			})
			.catch((error) => {
				console.log(error);
				alert("Algo deu errado tente novamente mais tarde");
			});
		},
		sendPutRequest(){
			let requestObj = this.objData;

			this.$axios.put(`${this.url}/${this.objId}`, requestObj)
			.then((response) => {
				this.payload = response.data;
				this.$emit('close');
			})
			.catch((error) => {
				console.log(error);
				alert("Algo deu errado tente novamente mais tarde");
			});
		},
		getObject(){
			this.$axios.get(`${this.url}/${this.objId}`)
			.then((response) => {
				this.objData = response.data;
				if (!response.data.scheduledEndTime) {
					this.allDay = true;
				}
			})
			.catch((error) => {
				console.log(error);
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
}

.modal-body{
	max-height: 60vh;
}
/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
