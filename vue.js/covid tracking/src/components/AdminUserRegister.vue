<template>
    <div class="centreBox">
    <form @submit.prevent="submitForm">
    <q-card>
        <q-card-section>
          <div class="text-h6">User Registration</div>
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
						stack-label />
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
			  </div>	
	    </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="right">
          <q-btn label="Register" type="submit" color="primary"></q-btn>
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
	import { runSaveRegister } from 'src/lib/dataSource'
	import { uid } from 'quasar'
	import CryptoJS from "crypto-js"
    
	export default {
	  props: {
			tab: {
			type: String,
			default: ''
			},
  		},
    
		data() {
			return {
				formData: {
					password: '',
					userfirstname:'',
	  				userlastname:'',
					useremail: '',
					userid: uid(),
	  				flgsysactive: 'True',
	  				flglocked: 'False',
	  				flgdisabled: 'False',
	  				fldrole: 'Admin'
				},
				registrationMessage: false,
				user: null,
				errorMessage: '',
			    roles: ['Agent', 'Admin', 'System'],
			    booleanFlags: ['True','False']
			    
			}
		},


		methods: {
			

		  encrypt (src) {
		    const passphrase = 'naep-covid-19-app'
		    return CryptoJS.AES.encrypt(src, passphrase).toString()
		  },
		
		  decrypt (src) {
		    const passphrase = 'naep-covid-19-app'
		    const bytes = CryptoJS.AES.decrypt(src, passphrase)
		    const originalText = bytes.toString(CryptoJS.enc.Utf8)
		    return originalText
		  },

			...mapActions('auth', ['registerUser', 'loginUser']),
			isValiduseremailAddress(useremail) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		    return re.test(String(useremail).toLowerCase())
			},

			async submitForm() {
				
			
			        let userData = {
						password: '',
						userfirstname:'',
		  				userlastname:'',
						useremail: '',
						userid: uid(),
		  				flgsysactive: 'True',
		  				flglocked: 'False',
		  				flgdisabled: 'False',
		  				fldrole: 'Admin'
                     }  
                     
                    this.formData.userid = uid()
				    this.registrationMessage = false 
					Loading.show()
					let s = {
						status: 0,
						data : null
                     }    

					this.$refs.userfirstname.validate()
					this.$refs.userlastname.validate()
					this.$refs.useremail.validate()
				    this.$refs.password.validate()
					try {
					   if (!this.$refs.useremail.hasError && 
					       !this.$refs.password.hasError &&
						   !this.$refs.userfirstname.hasError&&
						   !this.$refs.userlastname.hasError
					   ) {
					   	
						userData.password = this.formData.password
						userData.userfirstname =this.formData.userfirstname
		  				userData.userlastname =this.formData.userlastname
						userData.useremail  =this.formData.useremail.toLowerCase()
						userData.userid  =this.formData.userid
		  				userData.flgsysactive  =this.formData.flgsysactive
		  				userData.flglocked  =this.formData.flglocked
		  				userData.flgdisabled  =this.formData.flgdisabled
		  				userData.fldrole  =this.formData.fldrole
		  				
		  				//console.log(userData)
                      
                        	
						switch(this.tab) {
							case "register":
								s = await runSaveRegister(userData)
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
					   this.errorMessage ='The new user registered successfully.'
					}else {
					   this.errorMessage = s.errorMessage
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
