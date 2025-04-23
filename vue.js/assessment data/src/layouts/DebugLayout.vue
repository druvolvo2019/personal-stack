<template>
  <main-layout>
    <q-drawer v-model="left" show-if-above side="left" bordered>
      <debug-development />
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label header class="text-grey-8">
          Endpoint information
        </q-item-label>
        <q-item>
          <q-item-section>
            <q-item-label>URL</q-item-label>
            <q-item-label caption>
              {{ endpointData.AppSync.Default.ApiUrl }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>ApiKey</q-item-label>
            <q-item-label caption>
              {{ endpointData.AppSync.Default.ApiKey }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header class="text-grey-8">
          Test Logins
        </q-item-label>
        <q-item>
          <q-item-section>
            <q-item-label>NAEPA3370</q-item-label>
            <q-item-label caption>
              SV Joseph Kabat
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>NAEPA4358</q-item-label>
            <q-item-label caption>
              AC Daisy Kulakoff
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </main-layout>
</template>

<script>
import MainLayout from './MainLayout'
import { mapGetters, mapActions } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import DebugDevelopment from 'src/components/DebugDevelopment'

const links = [
  {
    title: 'Home',
    caption: 'Show the main page',
    icon: 'school',
    link: '/#/'
  },
  {
    title: 'Test Executions',
    caption: 'Execution Testing',
    icon: 'school',
    link: '/#/debug/test-executions'
  },
  {
    title: 'Display Storage',
    caption: 'View the Storage',
    icon: 'code',
    link: '/#/debug/display-storage'
  },
  {
    title: 'Display Metadata',
    caption: 'View the Metadata Cache',
    icon: 'code',
    link: '/#/debug/display-meta'
  },
  {
    title: 'Display User',
    caption: 'View the Current User',
    icon: 'code',
    link: '/#/debug/display-user'
  }
]

export default {
  name: 'DebugLayout',

  components: {
    MainLayout,
    EssentialLink,
    DebugDevelopment
  },

  data() {
    return {
      isOnline: true,
      isLoggedIn: true,
      left: false,
      essentialLinks: this.generateLinks(),
      endpointData: process.env.AWS_CONFIG
    }
  },
  async mounted() {
    if (this.$naepAuth) {
      this.isLoggedIn = await this.$loggedInUser.userLoggedIn()
      this.subscription = this.$naepAuth
        .subscribe('info:sign-in', event => {
          this.isLoggedIn = true
          this.essentialLinks = this.generateLinks()
        })
        .and('info:signed-out', event => {
          this.isLoggedIn = false
          this.essentialLinks = this.generateLinks()
        })
        .and('info:online-status-change', event => {
          this.isOnline = event.isOnline
        })
        .and(event => {
          console.log({ event })
        })
    } else {
      console.error('$naepAuth is undefined')
    }
  },
  destroyed() {
    this.subscription && this.subscription.unsubscribe()
  },

  methods: {
    generateLinks() {
      if (this.isLoggedIn) {
        return links
      } else {
        return links.filter(x => x.requiresAuth !== true)
      }
    }
  }
}
</script>
