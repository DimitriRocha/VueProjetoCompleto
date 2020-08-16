<template lang="html">
	<div class="mainContainer text-light pt-5 px-3 h-100 text-left">
		<div class="">
			<h5>Ativos:</h5>
			<div v-for="user in usersActivityStatus.connected" class="row no-gutters mt-2">
				<div class="statusCircle float-left mr-3">
					<span class="align-bottom innerCircle rounded-circle bg-success"></span>
				</div>
				<div class="">
					<span>{{ user.username }}</span><br>
					<small class="text-muted">{{ user.email }}</small>
				</div>
			</div>
			<div v-for="user in usersActivityStatus.absent" class="row no-gutters mt-2">
				<div class="statusCircle float-left mr-3">
					<span class="align-bottom innerCircle rounded-circle bg-warning"></span>
				</div>
				<div class="">
					<span>{{ user.username }}</span><br>
					<small class="text-muted">{{ user.email }}</small>
				</div>
			</div>
		</div>
		<div class="mt-5">
			<h5>Últimos eventos:</h5>
			<div v-for="log in latestLogs" class="row no-gutters mt-2">
				<div class="bg-light rounded w-100">
					<div class="tag w-100" v-bind:class="getLogTagClass(log.logType)"></div>
					<div class="text-muted mx-2">
						<small>{{ log.msg }}</small>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			usersActivityStatus: [

			],
			latestLogs: [

			],
		}
	},
	components: {
	},
	mounted(){
		this.setUsersActivity();
		this.setLatestLogs();
	},
	methods: {
		setUsersActivity(){
			this.$axios.get('/user/ConnectedUsers')
			.then((response) => {
				this.usersActivityStatus = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		},
		setLatestLogs(){
			this.$axios.get('/ImportantLogs/5')
			.then((response) => {
				this.latestLogs = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		},
		getLogTagClass(logType){
			if (logType == 'N') {
				return 'bg-success';
			}else if(logType == 'C'){
				return 'bg-danger';
			}else if(logType == 'W'){
				return 'bg-warning';
			}else {
				return 'bg-success';
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.mainContainer{
	background-color: $base-dark;
}

.statusCircle{
	width: fit-content;
}

.innerCircle{
	height: 13px;
	width: 13px;
	display: inline-block;
	border: solid white 1px;
}

.tag{
	height: 10px;
	border: solid white 1px;
}
</style>
