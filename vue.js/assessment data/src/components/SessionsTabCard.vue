<template>
  <div class="col-12">
    <q-card bordered flat square class="bg-grey-1">
      <q-card-section>
        <div class="row">
          <div class="col-8 text-h6 ellipsis">
            <!--<template v-if="hasMultipleSessions">Sessions</template>
            <template v-if="!hasMultipleSessions">Session</template>-->
            Groups
          </div>
          <q-space />
          <!--<session-chip grade="8" sample-name="DS" :session-name="tab" />-->
        </div>
      </q-card-section>
      <q-separator />
      <div class="row bg-grey-1">
        <q-tabs
          v-if="hasMultipleSessions"
          v-model="tab"
          active-color="primary"
          class="col-1 text-grey bg-grey-1"
          dense
          indicator-color="primary"
          selection="single"
          vertical
        >
          <q-tab
            v-for="(item, index) in sessIds"
            :key="index"
            :name="item.sessId"
            :label="item.sessId"
          />
        </q-tabs>
        <div class="col q-pa-md">
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="slide-down"
            transition-next="slide-up"
            @transition="handleTabTransition"
          >
            <q-tab-panel
              v-for="(s, index) in sessIds"
              :key="index"
              :name="s.sessId"
              class="q-pa-none"
            >
              <div class="row flex q-col-gutter-md bg-grey-1">
                <group-card
                  v-for="item in getSelectedSessionGroups(s.sessId)"
                  :key="item.group_id"
                  :group="item"
                />
                <non-disclosure-agreements-card
                  :agreements="agreements"
                  :visitid="school.visitId"
                  :state="state"
                  :grade-id = "school.gradeId"
                />
                <student-list-card
                  :key="refCount"
                  :students="students"
                  :groups="sessions"
                  :team-read-only="teamReadOnly"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
//import json from '../GroupList.json'

export default {
  components: {
    'non-disclosure-agreements-card': require('components/NonDisclosureAgreementsCard.vue')
      .default,
    'group-card': require('components/GroupCard.vue').default,
    'student-list-card': require('components/StudentListCard.vue').default
    //'session-chip': require('components/SessionChip.vue').default
  },

  props: {
    school: {
      type: Object,
      required: true
    },

    ndas: {
      type: Array,
      required: true
    },
    
    teamReadOnly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      refCount: 0,
      tab: undefined,
      sessions: this.school.sessions,
      students: this.school.students,
      state: this.school.school.schoolAddressState
      //groups: json
    }
  },

  computed: {
    agreements() {
      if (this.ndas == null) {
        return []
      } else {
        return this.ndas
      }
    },

    sessionLabel: {
      get() {
        return this.$store.state.userprofile.sessionLabel
      },
      set(val) {
        this.$store.commit('userprofile/updateSessionLabel', val)
      }
    },
    hasMultipleSessions: function() {
      //return this.sessIds.length > 1
      return false
    },
    sessIds: function() {
      //return distict sessIds frin school.sessions
      var regularsessions = this.sessions.filter(
        session => session.type == 'Regular'
      )

      var resArr = []
      regularsessions.filter(function(item) {
        var i = resArr.findIndex(x => x.sessId == item.sessId)
        if (i <= -1) {
          resArr.push({ sessId: item.sessId })
        }
        return null
      })

      return resArr
    }
  },

  created: function() {
    if (this.sessIds.length < 1 || this.sessIds == undefined) {
    } else {
      this.tab = this.sessIds[0].sessId
    }
  },

  beforeDestroy() {
    this.$root.$off('showPIIChanged', this.showPIIChanged)
  },
  async mounted() {
    this.$root.$on('showPIIChanged', this.showPIIChanged)
  },

  methods: {
    handleTabTransition(newVal, oldVal) {
      this.sessionLabel = newVal
    },
    getSelectedSessionGroups: function(sessId) {
      var ret = [...this.sessions].sort(function(ob1, ob2) {
        if (ob1.type > ob2.type) {
          return -1
        } else if (ob1.type < ob2.type) {
          return 1
        }

        if (ob1.sessId > ob2.sessId) {
          return 1
        } else if (ob1.sessId < ob2.sessId) {
          return -1
        }

        if (ob1.label < ob2.label) {
          return -1
        } else if (ob1.label > ob2.label) {
          return 1
        } else {
          // nothing to split them
          return 0
        }
      })

      return ret
    },
    getfilterAccommodationGroupsLabel: function(sessId) {
      var resArr = []
      var group_filter = ['A', 'B']

      var accommodation_students = this.students
        .filter(obj => {
          return obj.session === sessId
        })
        .filter(function(item) {
          return group_filter.indexOf(item.group) === -1
        })

      resArr = [...new Set(accommodation_students.map(x => x.group))]

      return resArr
    },
    getSelectedStudents: function(sessId) {
      //return this.students.filter(student => student.session == sessId)
      return this.students
    },
    showPIIChanged() {
    //  console.log('showPIIChanged caught in SessionsTabCard')
      this.refCount += 1
    }
  }
}
</script>
