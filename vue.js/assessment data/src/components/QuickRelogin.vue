<template>
  <q-dialog :value="value" persistent @input="$emit('input', false)">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">You must login to access the server</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="password"
          type="password"
          autofocus
          :label="`Enter the login password for ${username}`"
          @keyup.enter="attemptLogin()"
        />
        <div v-if="loginError" class="q-mt-md text-red">Invalid password</div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          v-close-popup
          :disabled="notReadyToClick"
          flat
          label="OK"
          @click="attemptLogin"
        />
        <q-btn v-close-popup flat label="Logout Completely" @click="logout">
          <q-tooltip>WARNING! You will lose any unsaved data.</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'QuickRelogin',
  props: {
    username: {
      type: String,
      required: true,
    },
    loginError: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      password: '',
    }
  },
  computed: {
    notReadyToClick() {
      return this.username == '' || this.password == ''
    },
  },
  methods: {
    attemptLogin() {
      this.$emit('login', {
        username: this.username,
        password: this.password,
      })
    },
    logout() {
      this.$emit('logout')
    },
  },
}
</script>

<style></style>
