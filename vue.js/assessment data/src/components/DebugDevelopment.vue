<template>
  <q-list class="q-gutter-xs q-pa-sm">
    <q-item>
      <q-btn @click="recreateClient">Recreate Client</q-btn>
    </q-item>
    <q-item>
      <div>{{ loggedInStatus }}</div>
    </q-item>
    <div v-if="isLoggedIn">
      <q-item>
        <q-toggle
          :value="apiKeyValid"
          label="ApiKey Valid"
          @input="toggleApiKeyStatus"
        />
      </q-item>
      <q-item>
        <q-toggle
          :value="refreshTokenValid"
          label="RefreshToken Valid"
          @input="toggleRefreshTokenStatus"
        />
      </q-item>
      <q-item>
        <q-toggle
          :value="refreshTokenAlwaysValid"
          label="RefreshToken Always Valid"
          @input="toggleRefreshTokenAlwaysValid"
        />
      </q-item>
    </div>
  </q-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QuickRelogin from 'src/components/QuickRelogin'

export default {
  name: 'DebugDevelopment',
  data() {
    return {
      flags: {
        apiKey: {
          status: true,
          label: 'apiKey valid'
        },
        refreshToken: {
          status: true,
          label: 'refreshToken valid'
        },
        authToken: {
          status: true,
          label: 'authToken valid'
        },
        refreshTokenAlwaysValid: {
          status: true,
          label: 'refreshTokenAlwaysValid'
        }
      },
      loggedInStatus: '',
      isLoggedIn: false
    }
  },
  computed: {
    ...mapGetters('naepAuthManager', ['signedIn', 'needsSecondaryLogin']),
    ...mapGetters('debugging', [
      'refreshTokenValid',
      'apiKeyValid',
      'refreshTokenAlwaysValid'
    ])
  },
  watch: {
    signedIn: function(v) {
      this.setLoggedInStatus(v)
      if (v === false) {
        Object.keys(this.flags).forEach(key => this.toggleStatus(key, true))
      }
    },
    needsSecondaryLogin: function(value) {
      this.toggleStatus('refreshToken', !value)
    }
  },
  async mounted() {
    if (this.$naepAuth) {
      this.setLoggedInStatus(await this.$naepAuth.signedIn)
    }
    this.subscription = this.$naepAuth
      .subscribe('info:sign-in', event => {
        this.setLoggedInStatus(true)
      })
      .and('info:signed-out', event => {
        this.setLoggedInStatus(false)
      })
      .and(event => {
        console.log({ naepAuthEvent: event })
      })
  },
  methods: {
    ...mapActions('naepAuthManager', [
      'markCompleted',
      'clearQueue',
      'refreshTokenReset'
    ]),
    ...mapActions('debugging', [
      'setRefreshTokenValid',
      'setApiKeyValid',
      'setRefreshTokenAlwaysValid'
    ]),
    setLoggedInStatus(isLoggedIn) {
      this.isLoggedIn = isLoggedIn
      this.loggedInStatus = isLoggedIn ? 'User signed in' : 'Logged out'
    },
    recreateClient() {
      this.$urqlClient.reinitialize$()
    },
    toggleApiKeyStatus() {
      this.setApiKeyValid(!this.apiKeyValid)
    },
    toggleRefreshTokenStatus() {
      this.setRefreshTokenValid(!this.refreshTokenValid)
    },
    toggleRefreshTokenAlwaysValid() {
      this.setRefreshTokenAlwaysValid(!this.refreshTokenAlwaysValid)
    },
    toggleStatus(key, value) {
      this.flags[key].status = value
      this.flags[key].label =
        key + (this.flags[key].status ? ' valid' : ' invalid')
    }
  }
}
</script>

<style></style>
