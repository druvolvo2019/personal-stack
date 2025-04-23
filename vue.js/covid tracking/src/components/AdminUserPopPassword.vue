<template>
    <div class="centreBox">
    <form @submit.prevent="submitForm">
    <q-card>
        <q-card-section>
          <div class="text-h6">Change Password</div>
        </q-card-section>

        <q-separator></q-separator>
        <q-card-section style="max-height:50vh;width:500px" class="scroll">
      	
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
				
	    </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="right">
          <q-btn flat label="Save" type="submit" color="primary"></q-btn>
          <q-btn flat label="Close" color="primary" v-close-popup></q-btn>
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
	import { mapActions } from 'vuex'
	import {  runUpdateUserPassword } from 'src/lib/dataSource'
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
					newpassword: '',
					useremail: '',
					
				},
				savingFailed: false,
				user: null,
				errorMessage: '',
			    roles: ['Agent', 'Admin', 'System'],
			    booleanFlags: ['True','False']
			    
			}
		},

        mounted() {
			this.formData.useremail = this.userData.useremail
        	//console.log('getUserDetail', this.formData)
        },
        
		methods: {
			isValiduseremailAddress(useremail) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		    return re.test(String(useremail).toLowerCase())
			},
			async submitForm() {
				    this.savingFailed = false 
					Loading.show()
					let savingAttemptFailed = false 
					let s = {
						status: 0,
						data : null,
						errorMessage: ''
                     }    

					this.$refs.useremail.validate()
				    this.$refs.password.validate()
				    this.$refs.newpassword.validate()
				    
				    //console.log(this.tab)
				    
					try {
					   if (!this.$refs.useremail.hasError && 
					       !this.$refs.password.hasError &&
						   !this.$refs.newpassword.hasError
					   ){
				
				        //console.log(this.tab)
				        
						switch(this.tab) {
							case "Save":
								var data = {
									"useremail" : this.formData.useremail.toLowerCase(),
									"password" : this.formData.password,
								    "newpassword" : this.formData.newpassword,
								}
								//console.log('data=', data)
								
								s = await  runUpdateUserPassword(data)
								
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
				
					if (s.errorMessage ==='') {
						this.errorMessage ='User password changed successfully. '
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
