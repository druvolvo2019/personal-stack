<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Question from 'src/components/SurveyForms/quexcomponents/Question'

Vue.component('question', Question)

export default {
  name: 'App',

  async beforeDestroy() {
    if (this.$loggedInUser.userLoggedIn) {
      await this.$naepAuth.signOut()
    }
  },
}
</script>
