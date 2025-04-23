<template>
    <div class="centreBox">
    <form @submit.prevent="submitForm">
    <q-card>
        <q-card-section>
          <div class="text-h6">User Profile</div>
        </q-card-section>

        <q-separator></q-separator>
        <q-card-section style="max-height:50vh;width:500px" class="scroll">
      	
		        <div>
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
					<q-select v-model="formData.fldrole" 
					             :options="roles" 
					             label="Role"
					             outlined
								 class="col"
								 stack-label
					>
						
					</q-select>
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
				
	    </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="right">
          <q-btn flat label="Save" type="submit" color="primary"></q-btn>
          <q-btn flat label="Close" color="primary" @click="close()" v-close-popup></q-btn>
        </q-card-actions>
        
        <q-card-actions v-if="savingFailed">
        	<q-banner align="center" class="text-red bg-grey-3 col">
			 {{ errorMessage }}
			</q-banner>
        </q-card-actions>	
      </q-card>
	  </form>
    </div>
</template>

<script>
    import { Loading } from 'quasar'
	import { mapGetters, mapActions } from 'vuex'
	import { runUpdateUserProfile } from 'src/lib/dataSource'
	import { uid } from 'quasar'
	export default {
	  props: {
			userData: {
			type: Object,
			},
  		},
    
		data() {
			return {
				tab: 'Save',
				formData: {
					password: '',
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
				user: null,
				errorMessage: '',
			    roles: ['Agent', 'Admin', 'System'],
			    booleanFlags: ['True','False']
			    
			}
		},

        mounted() {
			this.formData.userfirstname = this.userData.userfirstname
  			this.formData.userlastname= this.userData.userlastname
			this.formData.useremail = this.userData.useremail.toLowerCase()
			this.formData.userid = this.userData.userid
  			this.formData.flgsysactive = this.userData.flgsysactive
  			this.formData.flglocked = this.userData.flglocked
  			this.formData.flgdisabled = this.userData.flgdisabled
  			this.formData.fldrole = this.userData.fldrole
        	//console.log('getUserDetail', this.formData)
        },
        
        computed: {
    		...mapGetters('auth', ['getUser']),
    		...mapGetters('appsession', ['getReload','getAdminTab']),
		  
		},
		methods: {
			
			...mapActions('appsession', ['setReload', 'setAdminTab']),
			
			close(){
				   let reload = this.getReload
			       if (reload) {
			       	 this.setAdminTab('manage')
			         this.$router.go(this.$router.currentRoute)
			         this.setReload(false)
			       }
			},
			
			async submitForm() {
				    this.savingFailed = false 
					Loading.show()
					let savingAttemptFailed = false 
					let s = {
						status: 0,
						data : null
                     }    

					this.$refs.userfirstname.validate()
					this.$refs.userlastname.validate()
					
					//console.log(this.tab)

					try {
					   if (!this.$refs.userfirstname.hasError&&
						   !this.$refs.userlastname.hasError
					   ) {
				
				        //console.log(this.tab)
				        
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
					  				"password": null,
					  				"newpassword": null
								}
								//console.log('data=', data)
								s = await runUpdateUserProfile(data)
								
								this.setReload(true)
								this.setAdminTab("manage")
								let reload = this.getAdminTab
								//console.log('tab=', reload)
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
					
					if (s.status== 200) {
					   this.savingAttemptFailed = false
					   this.savingFailed = true
					}else {
					   this.savingAttemptFailed = true
					   if (s.status ==500) {
						   this.savingFailed = true
					   }	
					}
					
					this.user = s.data
					//console.log('User:', this.user)

					if (s.errorMessage ==='') {
						this.errorMessage ='The user saving successfully. '
					} else {
						this.errorMessage = 'The user saving failed.'
					}
		
				    
			 },
			
		
		},
		filters: {
			titleCase(value) {
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		}
	}
	
</script>
