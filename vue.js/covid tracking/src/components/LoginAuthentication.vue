<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-input
        v-model="formData.useremail"
        :rules="[
          (val) =>
            isValiduseremailAddress(val) ||
            'Please enter a valid Email address.',
        ]"
        ref="useremail"
        lazy-rules
        outlined
        class="col"
        label="Email"
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[
          (val) => val.length >= 6 || 'Please enter at least 6 characters.',
        ]"
        ref="password"
        lazy-rules
        type="password"
        outlined
        class="col"
        label="Password"
        stack-label
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
    <br />
    <div class="row q-mb-md">
      <q-banner v-if="loginFailed" class="text-red bg-grey-3 col">
        {{ errorMessage }}
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        You are accessing a U.S. Government information system, which includes:
        1) this computer, 2) this computer network, 3) all computers connected
        to this network, and 4) all devices and storage media attached to this
        network or to a computer on this network. You understand and consent to
        the following: you may access this information system for authorized use
        only; you have no reasonable expectation of privacy regarding any
        communication of data transiting or stored on this information system;
        at any time and for lawful Government purpose, the Government may
        monitor, intercept, and search and seize any communication or data
        transiting or stored on this information system; and any communications
        or data transiting or stored on this information system may be disclosed
        or used for any lawful Government purpose.
      </q-banner>
    </div>
  </form>
</template>

<script>
import { Loading } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import { runSaveLogin } from 'src/lib/dataSource'
import CryptoJS from "crypto-js"

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        useremail: '',
        password: '',
      },
      loginFailed: false,
      user: null,
      errorMessage: 'Invalid useremail address or password',
    }
  },
  mounted() {
    this.cleanUpWhenTimeExpired()
    //console.log('Changed State')
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
  },
  methods: {
    async submitForm() {
      
      let logiData= {
        useremail: '',
        password: '',
      }
      this.loginFailed = false
      Loading.show()
      let loginAttemptFailed = false
      let s = {
        status: 0,
        data: null,
      }

      this.$refs.useremail.validate()
      this.$refs.password.validate()
      try {
        if (!this.$refs.useremail.hasError && !this.$refs.password.hasError) {
           //logiData.useremail = this.formData.useremail.toLowerCase()
           //logiData.password = this.encrypt(this.formData.password)
          
           //console.log('Password=',this.formData.password)
					 //console.log('Encrypt Password=',logiData.password)
					 //console.log('Encrypt Password=',logiData.password.substring(0, 29));
					 //console.log('dencrypt Password=',this.decrypt(logiData.password))
					 
					 logiData.useremail = this.formData.useremail.toLowerCase()
					 logiData.password = this.formData.password
          
          
          s = await runSaveLogin(logiData)
        } else {
          Loading.hide()
        }
      } finally {
        Loading.hide()
      }

      if (s.status == 200) {
        this.loginAttemptFailed = false
      } else {
        this.loginAttemptFailed = true
        if (s.status == 500) {
          this.loginFailed = true
        }
      }

      //console.log('loginAttemptFailed', this.loginAttemptFailed)
      //console.log('email=', this.formData.useremail.toLowerCase())
      //console.log('password=', this.formData.password)
      //console.log('got login', s)
      //console.log('success', !s.success)
      this.user = s.data
      //console.log('User:', this.user)

      if (this.loginAttemptFailed === true) {
        ;('Nothing ')
        this.errorMessage = s.errorMessage
      } else {
        this.user = s.data
        //	console.log('-------------------------')
        //	console.log('User:', this.user)
        //console.log('-------------------------')

        this.loginUser(this.user)
        this.$router.replace('/')
      }
    },
    ...mapActions('auth', ['loginUser', 'cleanUpWhenTimeExpired', 'addUser']),
    isValiduseremailAddress(useremail) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(useremail).toLowerCase())
    },
    
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
  },

  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
}
</script>
