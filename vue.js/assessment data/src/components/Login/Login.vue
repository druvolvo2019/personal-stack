<template>
  <q-card bordered flat square>
    <q-card-section>
      <div class="text-h5">Log in to NAEP 2021</div>
      <naep-outlined-input
        v-model="email"
        name="username"
        label="Enter email or username"
        input-type="text"
      ></naep-outlined-input>
      <naep-password-input v-model="password" name="password" />
      <q-banner
        v-if="loginAttemptFailed"
        name="forgotPasswordBanner"
        rounded
        class="q-mt-sm text-white bg-red"
        dense
        >Invalid email address or password
        <template v-slot:action>
          <q-btn
            flat
            name="forgotPasswordBtn"
            color="white"
            label="Forgot password"
            @click="forgotPassword"
          ></q-btn>
        </template>
      </q-banner>
      <q-btn
        name="signInButton"
        :disabled="notReadyForLogin"
        color="green"
        icon="las la-sign-in-alt"
        label="Login"
        class="q-mt-md full-width"
        @click="performLogin"
      ></q-btn>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <q-markdown name="warningMessage" :src="warningMessage"> </q-markdown>
    </q-card-section>
    <q-separator></q-separator>
  </q-card>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import NaepPasswordInput from '../shared/NaepPasswordInput'
import NaepOutlinedInput from '../shared/NaepOutlinedInput'

function notBlank(value) {
  return value && value !== ''
}

const warningMessage = `
You are accessing a U.S. Government information system, which includes:
1) this computer, 
2) this computer network, 
3) all computers connected to this network, and 
4) all devices and storage media attached to this network or to a computer on this network.

You understand and consent to the following: 

- you may access this information system for authorized use only; 
- you have no reasonable expectation of privacy regarding any communication of data transiting or stored on this information system;
- at any time and for lawful Government purpose, the Government may monitor, intercept, and search and seize any communication or data transiting or stored on this information system; and
- any communications or data transiting or stored on this information system may be disclosed or used for any lawful Government purpose.
`

export default {
  name: 'Login',
  components: {
    NaepOutlinedInput,
    NaepPasswordInput,
    QMarkdown
  },
  props: {
    prefill: {
      type: Object,
      default: () => {}
    },
    loginAttemptFailed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: false,
      email: this.prefill.email,
      password: this.prefill.password,
      warningMessage: warningMessage
    }
  },
  computed: {
    notReadyForLogin() {
      return !(notBlank(this.email) && notBlank(this.password))
    }
  },
  methods: {
    performLogin() {
      this.$emit('login', { email: this.email, password: this.password })
    },
    forgotPassword() {
      this.$emit('forgot-password', { email: this.email })
    }
  }
}
</script>

<style></style>
