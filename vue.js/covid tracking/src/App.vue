<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['handleAuthStateChange']),
  },
  mounted() {
    this.handleAuthStateChange()
    console.log('Start App')
  },
}
</script>
handleSiteReEntry

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
