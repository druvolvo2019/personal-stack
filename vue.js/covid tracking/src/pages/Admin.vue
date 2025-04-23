<template> 
	<q-page padding>
		<div class="q-gutter-y-md">
		 <br>
		 <br>
		 <q-card  class="reg-assign-title col">
			<q-card-section>
				USER REGISTRATION AND MANAGEMENT
			</q-card-section>
		</q-card>

		<q-card class="[tab=='register' ? authtabsregister : authtabsassignmet]">
		  <q-tabs
		    v-model="tab"
		    dense
		    class="text-grey"
		    active-color="primary"
		    indicator-color="primary"
		    align="justify"
		    narrow-indicator
		  >
		  	<q-tab name="user" label="User Information" />
		  	<q-tab name="password" label="Change Password" />
		    <q-tab name="manage" label="management"  v-if="isAdmin()"/>
		    <q-tab name="register" label="Register"  v-if="isAdmin()"/>
			<q-tab name="reset" label="Reset Password"  v-if="isSuperUser()"/>
		  </q-tabs>

		  <q-separator />

		  <q-tab-panels v-model="tab" animated>
		    <q-tab-panel name="register">
		       <register :tab="tab"></register>
		    </q-tab-panel>

		    <q-tab-panel name="manage">
		      <manage :tab="tab"></manage>
		    </q-tab-panel>
		    
		    <q-tab-panel name="user">
		       <edituser />
		    </q-tab-panel>
		    
		    <q-tab-panel name="password">
		       <change-password :userData="user" :tab="tab" />
		    </q-tab-panel>

			<q-tab-panel name="reset">
		       <reset-password :userData="user" :tab="tab" />
		    </q-tab-panel>

		  </q-tab-panels>
		</q-card>
		</div>
	</q-page>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex'
    import { runGetCIMSUser } from 'src/lib/dataSource'
	export default {
		name: 'School',
		data () {
	    return {
	      tab: null,
	      authtabsregister: {
			'max-width': '500px',
			'margin': '0 auto'
			},
	      authtabsAssignment: {
			'max-width': '800px',
			'margin': '0 auto'
			},
	    }
	  },
	  computed: {
      ...mapState('auth', ['loggedIn','user']),
      ...mapGetters('appsession', ['getReload','getAdminTab']),
      },
      
      mounted(){
      	
      	this.tab = this.getAdminTab
      	if (Object.is(this.tab, null)) {
      	  this.tab = 'user'
          this.setAdminTab('user')	
		}else {
		  this.setAdminTab(this.tab)	
		}
      	
      	console.log('tab', this.tab)
      },
      
      methods:{
      	 ...mapActions('appsession', ['setReload', 'setAdminTab']),
         isAdmin() {
           return (this.user.fldrole.toLowerCase() == "admin")
		},

		isSuperUser(){
			let ret = false 
			switch (this.user.useremail.toLowerCase()) {
			case 'christiankapombe@westat.com':
                ret = true 
				break;
			case 'sandyhuang@westat.com':
				ret = true 
				break;
			case 'betsymagrini@westat.com':
				ret = true 
				break;
			}
			return ret
		}
      },
      
	  components: {
		  'register' : require('components/AdminUserRegister.vue').default,
		  'manage' : require('components/AdminUserManage.vue').default,
		  'edituser' : require('components/AdminUserEdit.vue').default,
		  'change-password': require('components/AdminUserChangePassword.vue').default,
		  'reset-password': require('components/AdminUserResetPassword.vue').default
	  }
	}
</script>
<style scoped>

   .auth-tabs {
		max-width: 500px;
		margin: 0 auto;
	}
	.auth-tabs-register {
		max-width: 500px;
		margin: 0 auto;
	}
	
	.auth-tabs-assignent {
		max-width: 800px;
		margin: 0 auto;
	}

    .reg-assign-title {
		margin: 0 auto;
		font-size: 30px;
		text-align: left;
		margin-top: 25px;
	}
	.reg-assign-title-register {
		max-width: 500px;
		margin: 0 auto;
		font-size: 30px;
		text-align: left;
		margin-top: 25px;
	}
    .reg-assign-title-assigment {
		max-width: 500px;
		margin: 0 auto;
		font-size: 30px;
		text-align: left;
		margin-top: 25px;
	}
</style>