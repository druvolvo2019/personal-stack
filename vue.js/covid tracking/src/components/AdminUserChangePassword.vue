<template>
    <div class="centreBox">
    <form @submit.prevent="submitForm">
    <q-card>
        <q-card-section>
          <div class="text-h6">Change Password</div>
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
						v-model="formData.password"
						:rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
						ref="password"
						lazy-rules
						type="password"
						outlined
						class="col"
						label="Password"
						stack-label />
				</div>
				
				<div>
					<q-input
						v-model="formData.newpassword"
						:rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
						ref="newpassword"
						lazy-rules
						type="password"
						outlined
						class="col"
						label="New Password"
						stack-label />
				</div>
			  </div>	
	    </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="right">
          <q-btn label="Update" type="submit" color="primary"></q-btn>
        </q-card-actions>
        
        <q-card-actions align="center">
			<div v-if="registrationMessage" class="text-red">
			 {{ errorMessage }}
		    </div>
        </q-card-actions>
      </q-card>
	  </form>
    </div>
</template>

<script>
    import { Loading } from 'quasar'
	import { mapActions } from 'vuex'
	import { runUpdateUserPassword } from 'src/lib/dataSource'
	
	export default {
	  props: {
			userData: {
				type: Object,
				required: true
			},
			tab: {
				type: String,
				default: ''
			},
  		},
    
		data() {
			return {
				formData: {
					password: '',
					newpassword: '',
					useremail: '',
					
				},
				registrationMessage: false,
				user: null,
				errorMessage: '',
			    roles: ['Agent', 'Admin', 'System'],
			    booleanFlags: ['True','False']
			    
			}
		},
		
		mounted() {
		  this.formData.useremail = this.userData.useremail
		  //console.log(this.formData)
		},

		methods: {
			...mapActions('auth', ['registerUser', 'loginUser']),
			isValiduseremailAddress(useremail) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		    return re.test(String(useremail).toLowerCase())
			},

			async submitForm() {
				
			
			        let userData = {
						password: '',
						newpassword: '',
						useremail: '',
                     }  
                     
				    this.registrationMessage = false 
					Loading.show()
					let s = {
						status: 0,
						data : null
                     }    

					this.$refs.useremail.validate()
				    this.$refs.password.validate()
				    this.$refs.newpassword.validate()
					try {
					   if (!this.$refs.useremail.hasError && 
					       !this.$refs.password.hasError &&
						   !this.$refs.newpassword.hasError
					   ) {
					   	
					   	userData.useremail  =this.formData.useremail.toLowerCase()
						userData.password = this.formData.password
						userData.newpassword =this.formData.newpassword
		  				
						switch(this.tab) {
							case "password":
							    //console.log('userData=', userData)
								s = await  runUpdateUserPassword(userData)
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
					
					this.registrationMessage = true
					if (s.status== 200) {
					   this.errorMessage ='User password changed successfully.'
					}else {
					   this.errorMessage = s.errorMessage
					}
					
				 	//console.log('status=', s.status)
				 	//console.log('success=', s.success) 
					//this.user = s.data
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
