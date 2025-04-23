<template>
  <div>
    <main-header
      :user="user"
      :version-display="version"
      @settings="settings"
      @logout="performLogout"
      @piiChanged="piiChanged"
      @displayHasChanged="displayHasChanged"
      @filterObjectSelected="filterObjectSelected"
    >
    </main-header>
  </div>
</template>

<script>
import currentVersion from 'public/version.json'

export default {
  name: 'MainHeaderWrapper',
  components: {
    'main-header': require('./MainHeader.vue').default
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          headerCaption: 'NAEP Virtual School Folder',
          authenticated: false
        }
      }
    }
  },

  data() {
    return {
      user: {},
      version: `${currentVersion.major}.${currentVersion.minor}.${currentVersion.build}`,
      filterOptions: []
    }
  },

  //initialize svg icons
  mounted() {
    // this.user = this.$loggedInUser.user()
    this.$root.$on('sampledGradesLoaded', this.sampledGradeListLoaded)
  },

  methods: {
    settings() {
      this.$emit('settings')
    },
    performLogout() {
      this.$emit('logout')
    },
    filterObjectSelected(value) {
      this.$emit('filterObjectSelected', value)
    },
    piiChanged(value) {
      this.$emit('showpii', value)
    },
    displayHasChanged() {
      this.$emit('displayHasChanged')
    },
    sampledGradeListLoaded(alist) {
      this.filterOptions = alist
    }
  }
}
</script>
