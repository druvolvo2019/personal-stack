<template>
  <div>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title shrink>
          {{ headerCaption }}
          <q-tooltip> version {{ versionDisplay }} </q-tooltip>
        </q-toolbar-title>

        <q-space></q-space>
        <div v-if="!deviceIsOnline" class="q-pr-md">
          <q-icon
            class="text-red"
            style="font-size: 1.75rem"
            name="las la-exclamation-circle"
          >
            <q-tooltip
              >Your device is currently offline. Some features may not be
              available.</q-tooltip
            >
          </q-icon>
          Offline
        </div>
        <q-btn-dropdown
          v-if="authenticated"
          flat
          :icon="laUserSolid"
          color="white"
          :label="userStateData.userNameWithRole"
        >
          <q-list>
            <!--
            <q-item v-close-popup clickable @click="settings">
              <q-item-section avatar>
                <q-icon :name="laCogSolid" color="black" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Settings</q-item-label>
              </q-item-section>
            </q-item>  -->
            <q-item v-close-popup clickable @click="performLogout">
              <q-item-section avatar>
                <q-icon :name="laSignOutAltSolid" color="black"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-toolbar v-if="authenticated" class="bg-grey-4 text-primary">
        <filter-control
          :options="userStateData.filterOptions"
          :filter-kind="userStateData.filterKind"
          @selectObject="selectFilterObject"
        />

        <q-chip
          v-for="(chip, i) in userStateData.chips"
          :key="`chip-${i}`"
          color="primary"
          text-color="white"
          class="on-right"
          :removable="chip.removable"
          @remove="breadcrumbRemoved(chip.removeFn)"
        >
          {{ chip.display }}

          <q-tooltip content-style="font-size: 16px">{{
            chip.tooltipText
          }}</q-tooltip>
        </q-chip>

        <q-space></q-space>
        <q-toggle
          v-model="userStateData.showPII"
          :checked-icon="laUnlockSolid"
          color="green"
          size="lg"
          :unchecked-icon="laLockSolid"
          @input="showpii"
        >
          <q-tooltip>Toggle whether Student PII is redacted</q-tooltip>
        </q-toggle>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
//import svg icons
import {
  laUserSolid,
  laCogSolid,
  laSignOutAltSolid,
  laAngleLeftSolid,
  laAngleRightSolid,
  laArrowCircleLeft,
  laLockSolid,
  laUnlockSolid
} from '@quasar/extras/line-awesome'
import { mapGetters } from 'vuex'

export default {
  name: 'MainHeader',
  components: {
    'filter-control': require('src/components/FilterControl.vue').default
  },
  props: {
    headerCaption: {
      type: String,
      default: 'NAEP Virtual School Folder'
    },
    versionDisplay: {
      type: String,
      default: '0.0.0'
    },
    authenticated: {
      type: Boolean,
      required: true
    },
    userStateData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      moveBackIcon: 'las la-arrow-circle-left',
      refCount: 0
    }
  },

  computed: {
    ...mapGetters('filterOptions', ['deviceIsOnline'])
  },
  //initialize svg icons
  created() {
    this.laUserSolid = laUserSolid
    this.laCogSolid = laCogSolid
    this.laSignOutAltSolid = laSignOutAltSolid
    this.laAngleLeftSolid = laAngleLeftSolid
    this.laAngleRightSolid = laAngleRightSolid
    this.laLockSolid = laLockSolid
    this.laUnlockSolid = laUnlockSolid
  },

  methods: {
    settings() {
      this.$emit('settings')
    },
    performLogout() {
      this.$emit('logout')
    },
    async selectFilterObject(value) {
      this.$emit('filterObjectSelected', {
        kind: this.filterKind,
        payload: value
      })
    },
    async showpii(value) {
      this.$emit('piiChanged', value)
    },
    async breadcrumbRemoved(removeFn) {
      await removeFn()
      this.$emit('breadcrumbRemoved')
    },
    traChanged(newdata) {
      this.$emit('traChanged', newdata)
    }
  }
}
</script>
