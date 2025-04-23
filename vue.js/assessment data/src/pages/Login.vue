<template>
  <q-page padding>
    <q-img
      class="rounded-borders"
      alt="Quasar logo"
      src="~assets/naep-students.jpg"
    >
      <div class="absolute-bottom text-h2">NAEP Virtual School Folder</div>
    </q-img>
    <div class="fit row justify-center q-mt-md">
      <div class="col-sm-12 col-md-6 col-xl-4">
        <q-card bordered flat square>
          <q-card-section>
            <div class="text-h5">Log in</div>
            <q-input
              ref="username"
              v-model="username"
              class="q-mt-md"
              dense
              outlined
              label="Enter username"
              @keydown.enter.prevent="performLogin"
            >
            </q-input>
            <q-input
              v-model="password"
              class="q-mt-md"
              dense
              :error="loginFailed"
              outlined
              label="Enter password"
              type="password"
              @keydown.enter.prevent="performLogin"
            >
              <template v-slot:error>
                Login failed: {{ badLoginMessage }}
              </template>
            </q-input>
            <q-btn
              color="green"
              icon="las la-sign-in-alt"
              label="Login"
              class="q-mt-md full-width"
              :loading="loading"
              @click="performLogin"
            ></q-btn>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="caption">
              You are accessing a U.S. Government information system, which
              includes: 1) this computer, 2) this computer network, 3) all
              computers connected to this network, and 4) all devices and
              storage media attached to this network or to a computer on this
              network. You understand and consent to the following: you may
              access this information system for authorized use only; you have
              no reasonable expectation of privacy regarding any communication
              of data transiting or stored on this information system; at any
              time and for lawful Government purpose, the Government may
              monitor, intercept, and search and seize any communication or data
              transiting or stored on this information system; and any
              communications or data transiting or stored on this information
              system may be disclosed or used for any lawful Government purpose.
            </div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-actions class="flex-center">
            <q-btn outline color="primary" label="Can't log in?"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      username: '', //'NAEP0436',
      password: '', //'KnightsR#&1',
      loginFailed: false,
      badLoginMessage: 'Invalid username or password.',
      loading: false
    }
  },
  /* testing:
NAEP0218
NAEP0227
NAEP0009
NAEPA3370
NAEPA4358
NAEPA4362
NAEP9807
NAEP7538
NAEP8967 Gary Kabo
NAEP2303
NAEPA4382

*/
  mounted() {
    this.$refs.username.focus()
  },

  methods: {
    async performLogin() {
      this.loading = true
      let s
      try {
        const result = await this.$naepAuth.signIn(this.username, this.password)
        this.loginFailed = !result.success
        if (result.success) {
          this.$router.replace('/')
        } else {
          this.badLoginMessage = 'Invalid username or password.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
