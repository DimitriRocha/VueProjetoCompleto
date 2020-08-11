<template>
	<div id="app">
		<Navbar v-if="hasNav"/>
		<router-view/>
	</div>
</template>


<script>
import Navbar from '@/components/Navbar.vue';

export default {
	name: 'Home',
	data(){
		return{
			hasNav: true
		}
	},
	components: {
		Navbar
	},
	created(){
		this.setNav();
	},
	watch: {
		'$route': 'setNav'
	},
	methods: {
		setNav () {
			this.hasNav = this.$route.meta.navbar;
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
