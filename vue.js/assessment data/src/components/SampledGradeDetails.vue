<template>
  <q-page padding>
    <q-card class="col-3 bg-grey-2" bordered flat square>
      <q-card-section>
        <div class="row items-center">
          <div class="col-8 text-h5 ellipsis">
            {{ sampledGrade.school.schoolName }}
          </div>
          <q-space />
          <div class="col-4 text-right">
              <session-chip
                :grade="sampledGrade.gradeLevel"
                :sample-name="sampledGrade.school.sessionType"
              ></session-chip>
            <multi-team :multi-team="multiTeam"/>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="row flex q-col-gutter-md">
          <assessment-info-card :sampledgrade="sampledGrade"/>
          <assessment-notes-card
            :notes="sampledGrade.assessmentNotes"
            @saveNotes="saveNotes"
          />
          <questionnaire-status-card
            :key="refCount"
            :school="getSchool"
            :subjects="subjects"
            :team-read-only="teamReadOnly"
          />
          <logistics-covid-19-card :school="sampledGrade" />
          <logistics-before-card :school="sampledGrade" />
          <logistics-during-card :school="sampledGrade" />
          <logistics-after-card :school="sampledGrade" />
          <lunch-times-card :lunchtimes="lunchtimes" />
          <sessions-tab-card 
             :school="sampledGrade" 
             :ndas="ndas" 
             :team-read-only="teamReadOnly"
          />
          <makeup-worksheet-card
            :sessions="sampledGrade.makeupSessions"
            :num-visits="sampledGrade.numRegularAssessmentVisitDate"
            :grade-id="sampledGrade.gradeId"
            :team-read-only="teamReadOnly"
            @saveMakeupSession="saveMakeupSession"
          />
          <surveys-card
            :school="sampledGrade"
            :history="surveyHistory"
            :exthistory="externalHistory"
            :currentuser="currentUser"
            @saveSurvey="saveSurvey"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="las la-angle-up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import schoolAdapter from 'src/lib/schoolAdapter'

export default {
  name: 'SampledGradeDetails',

  components: {
    'assessment-notes-card': require('components/AssessmentNotesCard.vue')
      .default,
    'makeup-worksheet-card': require('components/MakeupWorksheetCard.vue')
      .default,
    'surveys-card': require('components/SurveysCard.vue').default,
    'assessment-info-card': require('components/AssessmentInfoCard.vue')
      .default,
    'logistics-after-card': require('components/LogisticsAfterCard.vue')
      .default,
    'logistics-before-card': require('components/LogisticsBeforeCard.vue')
      .default,
    'logistics-during-card': require('components/LogisticsDuringCard.vue')
      .default,
    'logistics-covid-19-card': require('components/LogisticsCovid19Card.vue')
      .default,
    'lunch-times-card': require('components/LunchTimesCard.vue').default,
    'session-chip': require('components/SessionChip.vue').default,
    'sessions-tab-card': require('components/SessionsTabCard.vue').default,
    'questionnaire-status-card': require('src/components/QuestionnaireStatus/QuestionnaireStatusCard.vue')
      .default,
    'multi-team': require('components/MultiTeam.vue').default,
  },

  props: {
    sampledGrade: {
      type: Object,
      required: true,
    },
    availableBarcodes: {
      type: Object,
      required: true,
    },
    lunchtimes: {
      type: Array,
      required: true,
    },
    onUpdatePerson: {
      type: Function,
      required: true,
    },
    onDeletePerson: {
      type: Function,
      required: true,
    },
    ndas: {
      type: Array,
      required: true,
    },
    surveyHistory: {
      type: Array,
      required: true,
    },
    externalHistory: {
      type: Array,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentUser: {},
      refCount: 0,
      username: '',
      multiTeam: '',
      teamReadOnly: false
    }
  },

 
  computed: {
    ...mapGetters('questionnaires', ['getSchool']),
    extHistory() {
      return []
    },
    teamReadOnlyCurrent:{
      get() {
        return this.$store.state.userprofile.teamReadOnlyCurrent
      },

      set(val) {
        this.$store.commit('userprofile/updateTeamReadOnlyCurrent', val)
      }
    },
  },
  watch: {
    getSchool() {
      this.refCount += 1
    },
  },

  async mounted() {
      var leadAC = ''
      var helperAC = ''
      
      this.username = await this.$loggedInUser.username()
      this.sampledGrade.multipleTeamsACs.forEach(element => {
          if (element.responsibility === 'Lead AC') {
            leadAC = element.userName
          }
          
          if (element.responsibility === 'Helper AC') {
            helperAC = element.userName
          }
      })
      
      if (helperAC !=='' && leadAC !=='') {
        
        this.multiTeam = "Multi-Team"
        this.teamReadOnly = false
        
        if (this.username == helperAC) {
          this.multiTeam = "Multi-Team Read only"
          this.teamReadOnly = true
        }
        
        if (this.teamReadOnly === true) {
          this.teamReadOnlyCurrent = this.teamReadOnly
        }
      }
      
  },
  created: async function() {
    this.currentUser = await this.$loggedInUser.user()
  },

  beforeDestroy() {
    this.$root.$emit('closing', 'SampledGradeDetails')
  },

  methods: {
    saveNotes(data) {
      this.$emit('saveNotes', data)
    },
    saveSurvey(data) {
      this.$emit('saveSurvey', data)
    },
    saveMakeupSession(obj) {
      obj.gradeId = this.sampledGrade.gradeId
      obj.visitId = this.sampledGrade.visitId
      this.$emit('saveMakeupSession', obj)
    },
  },
}
</script>
