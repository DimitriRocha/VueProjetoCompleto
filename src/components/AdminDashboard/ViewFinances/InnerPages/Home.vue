<template lang="html">
	<div class="rounded shadow-lg w-80 m-auto bg-light text-light p-relative">
		<div class="squareLogo shadow-sm p-2">
			<b-icon icon="cash-stack" class="w-100 h-100"></b-icon>
		</div>
		<div class="p-4">
			<div class="text-left">
				<h3 class="text-dark">Finanças da empresa</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	mounted(){

	}
}
</script>

<style lang="scss" scoped>
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
