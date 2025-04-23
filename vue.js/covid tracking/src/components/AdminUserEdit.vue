<template>
    <div class="centreBox">
    <form @submit.prevent="submitForm">
    <q-card>
        <q-card-section>
          <div class="text-h6">User Information</div>
        </q-card-section>

        <q-separator></q-separator>
        <q-card-section  class="scroll">	
				<div class="centreBox">	
				
				<div>
					<q-input
						v-model="formData.useremail"
						:rules="[ val => isValiduseremailAddress(val) || 'Please enter a valid Email address.']"
						ref="useremail"
						lazy-rules
						outlined
						class="col"
						label="Email"
						stack-label 
						readonly
						/>
				</div>
		        <div>
				  <q-input
					v-model="formData.userfirstname"
					lazy-rules
					ref="userfirstname"
					:rules="[ val => val && val.length > 0 || 'Please enter your first name']"
					outlined
					class="col"
					label="First Name"
		            stack-label/>
				 
				  <q-input
					v-model="formData.userlastname"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please enter your last name']"
					ref="userlastname"
					outlined
					class="col"
					label="Last Name"
		            stack-label/>
				 </div>
			
				<div>
					<q-select v-model="formData.flgsysactive" 
					             :options="booleanFlags" 
					             label="Active"
					             outlined
								 class="col"
								 stack-label
					>
						
					</q-select>
				</div> 
				
				<div>
					<q-select v-model="formData.flglocked" 
					             :options="booleanFlags" 
					             label="Locked"
					             outlined
								 class="col"
								 stack-label
					>
						
					</q-select>
				</div> 
				<div>
					<q-select v-model="formData.flgdisabled" 
					             :options="booleanFlags" 
					             label="Disabled"
					             outlined
								 class="col"
								 stack-label
					>
						
					</q-select>
				</div> 
				
			  </div>	
	    </q-card-section>

        <q-separator></q-separator>
        
        <q-card-actions align="right">
          <q-btn label="Save" type="submit" color="primary"></q-btn>
        </q-card-actions>
        
        <q-card-actions align="center">
			<div v-if="savingFailed" class="text-red">
			 {{ errorMessage }}
		    </div>
        </q-card-actions>

      </q-card>
	  </form>
    </div>
</template>

<script>
    import { Loading } from 'quasar'
	import { mapState, mapGetters, mapActions } from 'vuex'
	import { runSaveRegister, runGetCIMSUser, runUpdateUserProfile } from 'src/lib/dataSource'
	import { uid } from 'quasar'
	export default {
		name: 'EditProfile',
		data() {
			return {
				tab: 'Save',
				userData: {},
				formData: {
					password: '',
					newpassword: '',
					userfirstname:'',
	  				userlastname:'',
					useremail: '',
					userid: '',
	  				flgsysactive: '',
	  				flglocked: '',
	  				flgdisabled: '',
	  				fldrole: ''
				},
				savingFailed: false,
				errorMessage: '',
			    roles: ['Agent', 'Admin', 'System'],
			    booleanFlags: ['True','False']
			    
			}
		},

        async mounted() {
        	        this.userData = this.user
                    let tempUser = {}
        			tempUser = await runGetCIMSUser(this.userData.userid)
        			this.formData.userfirstname = tempUser.userfirstname
  					this.formData.userlastname= tempUser.userlastname
					this.formData.useremail = tempUser.useremail
					this.formData.userid = tempUser.userid
  					this.formData.flgsysactive = tempUser.flgsysactive
  					this.formData.flglocked = tempUser.flglocked
  					this.formData.flgdisabled = tempUser.flgdisabled
  					this.formData.fldrole = tempUser.fldrole
  			
        			//console.log('getUserDetail', this.formData) addUser
        },
        
    	computed: {
    	...mapState('auth', ['loggedIn','user']),
    	},
        	
		methods: {
			...mapActions('auth', ['addUser']),
			async submitForm() {
				    this.savingFailed = false 
					Loading.show()
					let s = {
						status: 0,
						data : null
                     }    

					this.$refs.userfirstname.validate()
					this.$refs.userlastname.validate()

					try {
					   if (!this.$refs.userfirstname.hasError&&
						   !this.$refs.userlastname.hasError
					   ) {
				
						switch(this.tab) {
							case "Save":
								var data = {
									"userfirstname" : this.formData.userfirstname,
					  				"userlastname" : this.formData.userlastname,
									"useremail" : this.formData.useremail.toLowerCase(),
									"userid" : this.formData.userid,
					  				"flgsysactive" :this.formData.flgsysactive,
					  				"flglocked" : this.formData.flglocked,
					  				"flgdisabled" : this.formData.flgdisabled,
					  				"fldrole" : this.formData.fldrole,
					  				"password": this.formData.password,
					  				"newpassword": this.formData.newpassword
								}
								
								//console.log('data=', data)
								
								
								s = await runUpdateUserProfile(data)
								
								this.addUser(data)
								
								//console.log('return=', s)
									
								break;
							case "":
								// code block
								break;
							default:
								// code block
							}

					   }else {
						   Loading.hide()
					   }

					} finally {
						Loading.hide()
					}
					
				
					this.savingFailed = true
					if (s.status== 200) {
					   this.$router.go(this.$router.currentRoute)
					   this.errorMessage ='Data saved successfully.'
					}else {
					   this.errorMessage = 'The user saving failed.'
					}
					
				 	//console.log('status=', s.status)
				 	//console.log('success=', s.success) 
					this.user = s.data
					//console.log('User:', this.user)
			 },
			
		
		},
		filters: {
			titleCase(value) {
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		}
	}
	
</script>

<style scoped>

   .centreBox
	{
	  width:75%;
	  height:50%;
	  margin:0 auto;
	}
	

</style>
