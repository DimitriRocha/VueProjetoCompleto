<template lang="html">
	<div class="">
		<div class="row">
			<div class="col-12 mt-2" v-for="(form, key) in formData" v-bind:style="form.style">
				<b-form-group  :label="form.label" :disabled="disabled">
					<!-- Caso seja um input padrão -->
					<template v-if="form.type == 'text' || form.type == 'password' || form.type == 'number' || form.type == 'email' || form.type == 'date' || form.type == 'month'">

						<!-- Caso haja validação para esse input -->
						<span v-if="$v.formData[key]" :class="{ 'error-input': $v.formData[key].$error }">

							<!-- Caso não haja máscara para esse input -->
							<b-form-input v-if="!form.mask" v-model="$v.formData[key].value.$model" :id="form.idName" :type="form.type"></b-form-input>

							<!-- Caso haja máscara -->
							<b-form-input v-else v-model="$v.formData[key].value.$model" :id="form.idName" :type="form.type" v-mask="form.mask"></b-form-input>

						</span>

						<!-- Caso não haja validação para o input -->
						<span v-else>

							<!-- Caso não haja máscara para esse input -->
							<b-form-input v-if="!form.mask" v-model="form.value" :id="form.idName" :type="form.type"></b-form-input>

							<!-- Caso haja máscara -->
							<b-form-input v-else v-model="form.value" :id="form.idName" :type="form.type" v-mask="form.mask"></b-form-input>

						</span>
					</template>

					<template v-else-if="form.type == 'textarea'">

						<!-- Caso haja validação para esse input -->
						<span v-if="$v.formData[key]"  :class="{ 'error-input': $v.formData[key].$error }">
							<b-form-textarea class="" name="" v-model="$v.formData[key].value.$model" :rows="(form.rows ? form.rows : 3)" :style="(form.resize ? form.resize : 'resize: none')" :disabled="form.disabled"></b-form-textarea>
						</span>

						<!-- Caso não haja validação para o input -->
						<span v-else>
							<b-form-textarea class="" name="" v-model="form.value" :rows="(form.rows ? form.rows : 3)" :style="(form.resize ? form.resize : 'resize: none')" :disabled="form.disabled"></b-form-textarea>
						</span>

					</template>

					<!-- Caso seja um select -->
					<template v-else-if="form.type == 'select'">

						<!-- Caso haja validação para esse input -->
						<span v-if="$v.formData[key]"  :class="{ 'error-input': $v.formData[key].$error }">
							<b-form-select class="" name="" v-model="$v.formData[key].value.$model" :options="form.options" :value-field="form.selectValueFieldName" :text-field="form.selectLabelFieldName"></b-form-select>
						</span>

						<!-- Caso não haja validação para o input -->
						<span v-else>
							<b-form-select class="" name="" v-model="form.value" :options="form.options" :value-field="form.selectValueFieldName" :text-field="form.selectLabelFieldName"></b-form-select>
						</span>

					</template>

					<!-- Caso seja um checkbox do tipo switch -->
					<template v-else-if="form.type == 'switch'">
						<!-- Caso haja validação para esse input -->
						<span v-if="$v.formData[key]"  :class="{ 'error-input': $v.formData[key].$error }">
							<b-form-checkbox switch size="lg" stacked class="" name="" v-model="$v.formData[key].value.$model" :value="true" :unchecked-value="false"></b-form-checkbox>
						</span>

						<!-- Caso não haja validação para o input -->
						<span v-else>
							<b-form-checkbox switch size="lg" stacked class="" name="" v-model="form.value" :value="true" :unchecked-value="false"></b-form-checkbox>
						</span>
					</template>

					<!-- Resposta do validador -->
					<span v-if="$v.formData[key]">
						<div v-if="$v.formData[key].value.$dirty && $v.formData[key].value.required == false">
							<i><small>Esse campo é obrigatório</small></i>
						</div>
						<div v-if="$v.formData[key].value.$dirty && $v.formData[key].value.minLength == false">
							<i><small>Esse campo possui um mínimo de caracteres: {{ $v.formData[key].value.$params.minLength.min }}</small></i>
						</div>
						<div v-if="$v.formData[key].value.$dirty && $v.formData[key].value.samsAsPass == false">
							<i><small>As senhas precisam ser iguais</small></i>
						</div>
					</span>

				</b-form-group>
			</div>
		</div>
	</div>
</template>

<script>
import {mask} from 'vue-the-mask';

export default {
	data(){
		return{

		}
	},
	props:{
		formData: {
			type: Object,
		},
		updateFunction: {
			type: Function
		},
		disabled: {
			type: Boolean,
			default: false
		},
		setValidations: {
			type: Object,
			default: () => {
				return {};
			}
		},
		touchAll: {
			type: Boolean,
			default: false
		},
	},
	validations(){
		return {
			formData: this.setValidations
		}
	},
	mounted(){

	},
	watch: {
		'$v.$invalid': function(isInvalid){
			this.$emit("isFormInvalidStateChanged" ,isInvalid);
		},
		'touchAll': function(touch){
			if (touch) {
				this.$v.$touch();
			}
		},
	},
	methods:{

	},
	directives: {
		mask
	}
}
</script>

<style lang="scss" scoped>
.error-input input{
	border: solid 1px #D81159 !important;
}
</style>
