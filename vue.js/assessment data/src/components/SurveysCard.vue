<template>
  <div class="col-xs-12 col-sm-6 col-md-8">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">Surveys</div>
      <q-card-section v-if="!showDebrief && !showAssessment && !showObservation && !showexternal">
        No surveys available.
      </q-card-section>
      <q-card-section v-else>
        <q-card bordered flat square>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab 
              v-if="showDebrief" 
              name="assessmentdebriefingform" 
              label="Session Debriefing">
            </q-tab>
            <q-tab
              v-if="showAssessment"
              name="fieldstaffobserverform"
              label="Assessment Day Performance Review"
            >
            </q-tab>
            <q-tab 
              v-if="showObservation"
              name="aaobservationform" 
              label="QC Record"> </q-tab>

            <q-tab
              v-if="showexternal"
              name="ndaPre"
              label="PreAssessment Feedback"
            >
            </q-tab>
            <q-tab
              v-if="showexternal"
              name="ndaSc"
              label="Assessment Day Feedback"
            >
            </q-tab>
            <q-tab
              v-if="showexternal"
              name="ndaObserver"
              label="Observer Feedback"
            >
            </q-tab>
          </q-tabs>

          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="assessmentdebriefingform">
              <questionnaire
                survey="deb22"
                :school="school"
                :history="debriefHistory"
                :currentuser="currentuser"
                @saveSurvey="saveSurvey"
              />
            </q-tab-panel>

            <q-tab-panel name="fieldstaffobserverform">
              <questionnaire
                survey="asd"
                :school="school"
                :history="fieldHistory"
                :currentuser="currentuser"
                @saveSurvey="saveSurvey"
              />
            </q-tab-panel>

            <q-tab-panel name="aaobservationform">
              <questionnaire
                survey="aaob"
                :school="school"
                :history="aaobsHistory"
                :sessions="sessions"
                :currentuser="currentuser"
                @saveSurvey="saveSurvey"
              />
            </q-tab-panel>

            <q-tab-panel name="ndaPre">
              <historyonly survey="pre" :history="preHistory" />
            </q-tab-panel>
            <q-tab-panel name="ndaSc">
              <historyonly survey="sc" :history="scHistory" />
            </q-tab-panel>
            <q-tab-panel name="ndaObserver">
              <historyonly survey="obs" :history="obsHistory" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    historyonly: require('src/components/SurveyForms/HistoryOnly.vue').default,
    questionnaire: require('src/components/SurveyForms/Questionnaire.vue')
      .default,
  },
  props: {
    school: {
      type: Object,
      required: true,
    },
    history: {
      type: Array,
      required: true,
    },
    exthistory: {
      type: Array,
      required: true,
    },
    currentuser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tab: 'assessmentdebriefingform',
    }
  },
  computed: {
    ...mapGetters('visit', ['isNotFullyLoaded', 'surveyHistory', 'ndas']),

    debriefHistory() {
      return this.history.filter(x => x.quexid.includes('0701-vsf'))
    },
    fieldHistory() {
      return this.history.filter(x => x.quexid.includes('0703-vsf'))
    },
    aaobsHistory() {
      return this.history.filter(x => x.quexid.includes('0704-vsf'))
    },
    preHistory() {
      return this.exthistory.filter(x => x.quexid.includes('0705-vsf'))
    },
    scHistory() {
      return this.exthistory.filter(x => x.quexid.includes('0706-vsf'))
    },
    obsHistory() {
      return this.exthistory.filter(x => x.quexid.includes('0707-vsf'))
    },
    showDebrief() {
      return ['AC', 'TS-AC', 'SP-AC', 'SV', 'TS-SV', 'SP-SV', 'FM', 'FD', 'HO', 'DP'].includes(this.currentuser.userRole)
    },
    showAssessment() {
      return ['SV', 'TS-SV', 'SP-SV', 'FM', 'FD', 'HO', 'DP'].includes(this.currentuser.userRole)
    },
    showObservation() {
      return ['AC', 'TS-AC', 'SP-AC', 'SV', 'TS-SV', 'SP-SV', 'FM', 'FD', 'HO', 'DP'].includes(this.currentuser.userRole)
    },
    showexternal() {
      return ['FM', 'FD', 'HO', 'DP'].includes(this.currentuser.userRole)
    },
    sessions() {
      //console.log(`debrief:${this.showDebrief} ass:${this.showAssessment} obs:${this.showObservation} ext:${this.showexternal}`)
      return this.school.sessions //['sessHarold', 'sessJackson', 'sessEmily']
    },
  },
  /*   case 'deb22':
      return '0701-vsf'
    case 'asd':
      return '0703-vsf'
    case 'aaob':
      return '0704-vsf'
return "0705-vsf"; for the preassessment
return "0706-vsf"; for the assessment
return "0707-vsf"; for the Observer 
*/

  methods: {
    saveSurvey(data) {
      this.$emit('saveSurvey', data)
    },
  },
}
</script>
