<template lang="html">
	<div id="LoginContainer" class="container-fluid bg-light">
		<div class="row">
			<div class="col-6 pl-0">
				<div class="position-absolute logo">
					<img src="@/assets/empresa_logo.png" alt="">
				</div>
				<div id="wave" class="">
				</div>
			</div>
			<div class="col-6">
				<div class="mt-5 p-5">
					<h4 class="text-dark mt-5">Fazer o login no sistema</h4>
					<BasicDynamicForm :formData.sync="formData" :setValidations="formValidations" :touchAll="isTrySubmitForm" @isFormInvalidStateChanged="(isInvalid) => {isFormInvalid = isInvalid}"></BasicDynamicForm>
					<button @click="loginAction(formData)" class="btn btn-primary mt-4 w-100" type="button" name="button">Entrar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BasicDynamicForm from '@/components/BasicDynamicForm';
import { required } from 'vuelidate/lib/validators';

export default {
	data(){
		return{
			isLoading: true,
			isFormInvalid: true,
			isTrySubmitForm: false,
			formData:{
				login: {
					idName: "login",
					label: "Login",
					type: "text",
					value: null,
					style: {
						color: '$base-dark'
					}
				},
				senha: {
					idName: "senha",
					label: "Senha",
					type: "password",
					value: null,
					style: {
						color: '$base-dark'
					}
				}
			},
			formValidations:{
				login: {
					value: {
						required,
					},
				},
				senha: {
					value: {
						required,
					},
				}
			},
		}
	},
	components:{
		BasicDynamicForm
	},
	created(){

	},
	methods: {
		loginAction(data){
			let context = this;
			//Quando essa propriedade se torna true o formulário é validado
			this.isTrySubmitForm = true;

			if (this.isFormInvalid) {
				return;
			}

			this.$store.dispatch('login', data)
			.then(function (response) {
				context.$router.go();
			})
			.catch(function (error) {
				alert("Algo deu errado, tente novamente");
				context.$router.go();
			});
		}
	}
}
</script>

<style lang="scss" scoped>
#LoginContainer{
	min-height: 100vh;
}

#wave {
	position: relative;
	height: 84.4vh;
	width: 50%;
	background: $base-darker;
}

#wave:before {
	content: "";
	display: block;
	position: absolute;
	border-radius: 0% 100% 0% 0%;
	width: 200%;
	height: 68.5%;
	background-color: $base-darker;
	top: 50%;
}

#wave:after {
	content: "";
	display: block;
	position: absolute;
	border-radius: 0 0 0 100%;
	width: 200%;
	height: 68.5%;
	background-color: $base-lighter;
	left: 0;
}

.logo{
	z-index: 10;
	top: 60%;
	left: 50%;
	transform: translate(-50%, -60%);
	border-radius: 50%;
	background-color: $base-secondary;
	width: 185px;
	height: 185px;
}

.logo img{
	width: 150px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
