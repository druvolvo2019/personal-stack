<template>
	<q-page padding>
		<q-img
			class="rounded-borders"
			alt="Quasar logo"
			src="~assets/naep-covid-19-homepage.png"
			>
			<div class="absolute-bottom text-h2">
				The COVID Incident Management System
			</div>
    	</q-img>
		<q-card class="auth-tabs">

		  <q-tab-panels v-model="tab" animated>
		    <q-tab-panel name="login">
		      <auth-login :tab="tab" ></auth-login>
		    </q-tab-panel>
		  </q-tab-panels>
		</q-card>
	</q-page>
</template>

<script>
	export default {
		name: 'Login',
		data () {
	    return {
	      tab: 'login'
	    }
	  },
	  components: {
	  	'auth-login' : require('components/LoginAuthentication.vue').default
	  }
	}
</script>

<style scoped>
	.auth-tabs {
		max-width: 500px;
		margin: 0 auto;
	}
</style>