<template>
  <q-layout view="hHh Lpr lff">
    <main-header
      :authenticated="authenticated"
      :version-display="version"
      :user-state-data="userStateData"
      @settings="modifySettings"
      @logout="performLogout"
      @piiChanged="changePII"
      @breadcrumbRemoved="breadcrumbRemoved"
      @filterObjectSelected="filterObjectSelected"
    >
    </main-header>
    <slot></slot>

    <q-page-container class="bg-grey-3">
      <q-page v-if="error">
        <error-handler
          :error="error"
          @dismissError="dismissError"
        ></error-handler>
      </q-page>
      <q-page v-else-if="isLoading" padding class="flex flex-center">
        <loading />
      </q-page>

      <div v-else>
        <router-view
          :key="`router-${routerRefCount}`"
          @closing="closingChild"
          @visitSelected="visitSelected"
        />
      </div>
    </q-page-container>
    <quick-relogin
      v-if="authenticated"
      v-model="showLogin"
      :username="username"
      :login-error="secondaryLoginInvalid"
      @login="reLogin"
      @logout="performLogout(true)"
    />
  </q-layout>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import QuickRelogin from 'src/components/QuickRelogin'
import MainHeader from 'src/components/MainHeader'
import currentVersion from 'public/version.json'
import loading from 'src/components/shared/Loading'
import ErrorHandler from 'src/components/shared/ErrorHandler'

export default {
  name: 'MainLayout',
  components: { MainHeader, QuickRelogin, loading, ErrorHandler },

  data() {
    return {
      error: undefined,
      authenticated: false,
      isLoading: false,
      userStateData: {
        isAssessmentShowing: false,
        filterKind: 'tra',
        showPII: false,
        userNameWithRole: '',
        chips: [],
        filterOptions: [],
      },
      showLogin: false,
      isOnline: this.$naepAuth.deviceIsOnline,
      headerinfo: {},
      refCount: 0,
      routerRefCount: 0,
      secondaryLoginInvalid: false,
      username: '',
      version: `${currentVersion.major}.${currentVersion.minor}.${currentVersion.build}`,
    }
  },

  computed: {
    ...mapGetters('naepAuthManager', ['needsSecondaryLogin', 'signedIn']),
    ...mapGetters('filterOptions', [
      'visitListForTra',
      'visitListLoadingState',
      'validTras',
      'validTraLoadingState',
    ]),

    currentHeader() {
      let path = this.$router.currentRoute.fullPath
      return s
    },
  },

  watch: {
    $route(to, from) {
      this.refCount += 1
    },
    needsSecondaryLogin: function () {
      this.showLogin = true
    },
    signedIn: async function (v) {
      await this.userStatusChange()
      this.username = await this.$naepAuth.loggedInUser.username()
    },
    validTras(value) {
      Vue.set(this.userStateData, 'filterOptions', value)
    },
    visitListForTra(value) {
      Vue.set(this.userStateData, 'filterOptions', value)
    },
    visitListLoadingState(state) {
      if (state === 'loading') {
        this.isLoading = true
      } else {
        this.isLoading = false
      }
    },
    validTraLoadingState(state) {
      if (state === 'loading') {
        this.isLoading = true
      } else {
        this.isLoading = false
      }
    },
  },

  created() {
    this.subscription = {
      unsubscribe() {},
    }
  },

  async mounted() {
    this.$root.$on('closing', this.closingChild)
    this.setDeviceIsOnline(this.$naepAuth.deviceIsOnline)
    if (this.$naepAuth) {
      this.$naepAuth.errorSubscribe((result) => {
        this.error = result
      })
      this.authenticated = await this.$loggedInUser.userLoggedIn()

      this.username = await this.$loggedInUser.username()
      this.subscription.unsubscribe()
      this.subscription = this.$naepAuth
        .subscribe('info:sign-in', (event) => {
          this.userStatusChange().then(() => null)
        })
        .and('info:signed-out', (event) => {
          this.userStatusChange().then(() => null)
        })
        .and('info:online-status-change', (event) => {
          this.isOnline = event.isOnline
          this.setDeviceIsOnline(event.isOnline)
          this.userStatusChange().then(() => null)
          const message = event.isOnline
            ? 'Your device is now connected to the server'
            : 'Your device is now offline. Some features will not be available. Your changes will be stored until you go back online.'
          this.$q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'warning',
            message,
          })
        })
    } else {
      console.error('$naepAuth is undefined')
    }
    await this.userStatusChange()
  },
  destroyed() {
    this.subscription.unsubscribe()
  },

  methods: {
    ...mapActions('naepAuthManager', ['refreshTokenReset']),
    ...mapActions('filterOptions', [
      'initializeValidTras',
      'initializeVisitList',
      'finalizeFilterOptions',
      'setDeviceIsOnline',
      'clearVisitList',
    ]),
    ...mapActions('visit', ['finalizeVisit']),
    ...mapActions('debugging', ['setRefreshTokenValid']),
    //-------------- application-wide message handling -------------------------
    closingChild(args) {},
    //-------------- end application-wide message handling -------------------------

    modifySettings() {
      console.log('modifySettings not implemented')
    },
    async userStatusChange() {
      console.log('userStatusChange')
      this.authenticated = await this.$loggedInUser.userLoggedIn()
      if (this.authenticated) {
        this.initializeUserStateData()
        const assessmentShowing = await this.$loggedInUser.isAssessmentShowing()
        if (assessmentShowing) {
          this.routerRefCount += 1
        } else {
          this.finalizeVisit()
          await this.initializeFilterOptions()
        }
      } else {
        this.finalizeFilterOptions()
      }
    },

    async initializeUserStateData() {
      this.userStateData.isAssessmentShowing =
        await this.$loggedInUser.isAssessmentShowing()
      this.userStateData.filterKind = await this.$loggedInUser.filterKind()
      this.userStateData.showPII = await this.$loggedInUser.showPII()
      this.userStateData.userNameWithRole =
        await this.$loggedInUser.fullNameAndRole()
      this.userStateData.chips = await this.$loggedInUser.breadcrumbs()
    },

    async initializeFilterOptions() {
      this.finalizeFilterOptions()
      if (await this.$loggedInUser.traIsSpecific()) {
        console.log('traIsSpecific')
        const traFilter = await this.$loggedInUser.traFilter()
        const payload = {
          naepDataSource: this.$naepDataSource,
          traFilter,
        }
        this.initializeVisitList(payload)
      } else {
        console.log('tra is general')
        const user = await this.$loggedInUser.user()
        const payload = {
          naepDataSource: this.$naepDataSource,
          tra: user.tra,
        }
        this.clearVisitList()
        this.initializeValidTras(payload)
      }
    },

    async reLogin({ username, password }) {
      const result = await this.$naepAuth.signIn(username, password)
      if (result.success) {
        this.refreshTokenReset()
        this.setRefreshTokenValid(true)
        this.secondaryLoginInvalid = false
        this.showLogin = false
      } else {
        this.secondaryLoginInvalid = true
        this.showLogin = true
      }
    },

    async performLogout(unconditional = false) {
      if (unconditional || this.$loggedInUser.userLoggedIn) {
        await this.$naepAuth.signOut()
        await this.userStatusChange()
        if (this.$router.path !== '/login') {
          this.$router.replace('/login')
        }
      }
      this.isLoading = false
      this.refCount += 1
    },

    async changePII() {
      await this.$loggedInUser.toggleShowPII()
      this.$root.$emit('showPIIChanged')
      this.refCount += 1
    },
    async breadcrumbRemoved() {
      await this.userStatusChange()
    },
    async filterObjectSelected({ kind, payload }) {
      if (this.userStateData.filterKind === 'visit') {
        await this.$loggedInUser.setActiveVisit(payload)
        await this.visitSelected(payload)
      } else {
        await this.$loggedInUser.setActiveTra(payload)
        await this.userStatusChange()
      }
    },
    async visitSelected(visit) {
      await this.$loggedInUser.setActiveVisit(visit)
      await this.userStatusChange()
    },

    dismissError() {
      this.error = false
    },
  },
}
</script>
