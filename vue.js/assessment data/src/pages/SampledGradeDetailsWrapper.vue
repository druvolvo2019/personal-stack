<template>
  <div>
    <q-page v-if="isNotFullyLoaded" padding class="flex flex-center">
      <loading />
    </q-page>
    <q-page v-else padding>
      <sampled-grade-details
        :key="refCount"
        :sampled-grade="sampledGrade"
        :ndas="ndas"
        :available-barcodes="barcodes"
        :lunchtimes="lunchtimes"
        :survey-history="surveyHistory"
        :external-history="externalSurveys"
        :on-update-person="updatePerson"
        :on-delete-person="deletePerson"
        :subjects="getSubjects"
        @saveNotes="saveNotes"
        @saveSurvey="saveSurvey"
        @saveMakeupSession="saveMakeupSession"
        @saveMissingDemographics="saveMissingDemographics"
      />
    </q-page>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'

function only(obj, ...keys) {
  const result = {}
  const ary = [...keys]
  ary.forEach(k => (result[k] = obj[k]))
  return result
}

export default {
  name: 'SampledGradeDetailsWrapper',

  components: {
    'sampled-grade-details': require('components/SampledGradeDetails.vue')
      .default,
    loading: require('src/components/shared/Loading').default,
  },
  watch: {
    sampledGrade() {
      this.refCount += 1
//      console.log('WATCH......', this.refCount, this.sampledGrade)
      // this is where the data is actually filled in for the displays
      if (this.sampledGrade)
        this.sampledGradeChanged(this.sampledGrade)
    },
  },

  data() {
    return {
      refCount: 0,
      loadingNotStarted: true,
      visitId: undefined,
      externalSurveys: [],
      lunchtimes: []
    }
  },
  computed: {
    ...mapGetters('visit', [
      'isNotFullyLoaded',
      'surveyHistory',
      'sampledGrade',
      'ndas',
      'barcodes',
      'getSubjects',
    ]),
  },

  created() {
    this.unsubscribe = () => null
  },

  beforeDestroy() {
    this.$root.$off('saveNDA', this.saveNDA)
    this.$root.$off('saveMissingDemographics', this.saveMissingDemographics)
    this.unsubscribe()
  },
  async mounted() {
    this.loadingNotStarted = true
    if (await this.$loggedInUser.isAssessmentShowing()) await this.refreshData()

    this.$root.$on('saveNDA', this.saveNDA)
    this.$root.$on('saveMissingDemographics', this.saveMissingDemographics)
    const activeVisit = await this.$loggedInUser.getActiveVisit()
  },

  methods: {
    ...mapActions('visit', ['initializeVisit', 'updateMakeupSession']),
    async refreshData() {
      const self = this
      const activeVisit = await this.$loggedInUser.getActiveVisit()
      if (activeVisit) {
        this.visitId = activeVisit.visitId
      }
      const proxyHandler = {
        get: function(obj, prop) {
          if (prop === 'updatePerson') {
            return person => {
              self.updatePerson(person)
            }
          } else if (prop === 'deletePerson') {
            return person => {
              self.deletePerson(person, self.visitId)
            }
          } else {
            return prop in obj ? obj[prop] : undefined
          }
        },
      }

      await this.initializeVisit({
        naepDataSource: this.$naepDataSource,
        activeVisit,
        proxyHandler,
        queryHasRun: () => {
          this.refCount += 1
        },
        store: this.$store,
      })
    },
    async saveNDA(nda) {
      nda.id = this.visitId
      await this.$naepDataSource.runUpdateNDA(
        { input: nda },
        {
          additionalTypenames: ['ndas', 'NDAsResponse'],
        }
      )
    },

    async saveMissingDemographics(input) {
      /*
	gradeId: ID!
	visitId: ID!
	session: ID!
	lineNumber: ID!
	gender: Int
	raceEthnicity: Int
	schoolLunchStatus: Int
	sdStatus: Int
	ellStatus: Int
	monthOfBirth: Int
	yearOfBirth: Int

*/

      const activeVisit = await this.$loggedInUser.getActiveVisit()
      function makeDemographicsVars(activeVisit, input) {
        return {
          input: {
            ...input,
            gradeId: activeVisit.gradeId,
            visitId: activeVisit.visitId,
          },
        }
      }
      await this.$naepDataSource.runUpdateMissingDemographics(
        makeDemographicsVars(activeVisit, input),
        {
          additionalTypenames: 'SampledGrade',
        }
      )
      await this.refreshData()
    },

    async saveNotes(assessmentNotes) {
      //console.log('SampledGradeDetailsWrapper.saveNotes', assessmentNotes)
      await this.$naepDataSource.runUpdateAssessmentNotes({
        input: {
          id: this.visitId,
          assessmentNotes,
        },
      })
      await this.refreshData()
      this.refCount += 1
    },

    async saveSurvey(input) {
      console.log('sgdetailswrapper.saveSurvey', input)
      let s =  this.$naepDataSource.runUpdateQuexResponses({ input })
      s.catch(err => console.log('   ********** saveSurvey Error..', err.message, ' ***************'))
      this.notify('Thank you for answering this survey!')
      await this.refreshData()
      this.refCount += 1
    },

    async saveMakeupSession(data) {
      const activeVisit = await this.$loggedInUser.getActiveVisit()
      const { gradeId, visitId } = activeVisit
      const { visitId: _, ...input } = data
      await this.$naepDataSource.runUpdateMakeupSession({
        visitId,
        input,
      })
      this.updateMakeupSession(input)
      this.refCount++
    },

    notify(msg, msgtype = 'positive') {
      this.$q.notify({
        type: msgtype,
        message: msg,
      })
    },
    async updatePerson(payload) {
      const mutationContext = {
        additionalTypenames: 'SampledGrade',
      }
      const activeVisit = await this.$loggedInUser.getActiveVisit()
      const { gradeId, visitId } = activeVisit
      if (payload.isAdd) {
        await this.$naepDataSource.runAddTeacher(
          {
            visitId,
            gradeId: gradeId,
            person: only(
              payload.newData,
              'personId',
              'lastName',
              'firstName',
              'subjects',
              'barcode'
            ),
          },
          mutationContext
        )
      } else {
        if (payload.isOnlyBarcodeChanged()) {
          const input = only(payload.newData, 'personId', 'barcode')
          await this.$naepDataSource.runUpdateBarcode(
            {
              visitId,
              gradeId: gradeId,
              input,
            },
            mutationContext
          )
        } else {
          await this.$naepDataSource.runUpdateTeacher(
            {
              visitId,
              gradeId: gradeId,
              input: only(
                payload.newData,
                'personId',
                'lastName',
                'firstName',
                'subjects',
                'barcode'
              ),
            },
            mutationContext
          )
        }
      }
      await this.refreshData()
    },
    async deletePerson(payload, visitId) {
      await this.$naepDataSource.runDeleteTeacher({
        visitId,
        personId: payload.personId,
      })
      await this.refreshData()
    },

    addTimes(astart, anend) {
      if (!astart && !anend) return
      const obj = { startTime: '', endTime: '' }
      if (astart !== '' && anend !== '') {
        var res = Object.assign({}, obj)
        res.startTime = astart
        res.endTime = anend
        this.lunchtimes.push(res)
      }
    },

    async gatherLunchtimes(agrade) {
      //console.log('gatherlunchtimes start', agrade)
    
      if (agrade !== null) {
        var astart = agrade.schoolLunchStartTime1
        var anend = agrade.schoolLunchEndTime1
        this.addTimes(astart, anend)

        astart = agrade.schoolLunchStartTime2
        anend = agrade.schoolLunchEndTime2
        this.addTimes(astart, anend)

        astart = agrade.schoolLunchStartTime3
        anend = agrade.schoolLunchEndTime3
        this.addTimes(astart, anend)

        astart = agrade.schoolLunchStartTime4
        anend = agrade.schoolLunchEndTime4
        this.addTimes(astart, anend)

        astart = agrade.schoolLunchStartTime5
        anend = agrade.schoolLunchEndTime5
        this.addTimes(astart, anend)
      }
    },

  collectExtSurveys(visits, arr) {
    // dont run this if you already have filled the extHistory 
    // OR if there are no external visit tokens to match
    if (this.externalSurveys.length > 0 || visits.length < 1) return 
    if (visits) {
      let res = visits.map(x => {
        let found = arr.find(a => a.token === x.extSurveyToken)
        if (found)
          return found
      })  
      this.externalSurveys = res
    }
  },

  async sampledGradeChanged(aGrade) {
    this.firstGrade = aGrade
    let exSurveys = aGrade.extSurveys
 
    await this.gatherLunchtimes(aGrade)
 
    // only run this query if there are external Tokens available for this visit (exSurveys)
    // and if so, empty out externalSurveys list
    if (exSurveys.length > 0) {
      this.externalSurveys = []
      this.$naepDataSource.runGetExtSurveyHistory(
        {
          input: {
            operation: 'hist',
            param: process.env.STAGE,
          },
        },
        (result) => {
          let body = result.data.getExtSurveyHistory.body
          let arr = JSON.parse(body)
          this.collectExtSurveys(exSurveys, arr)
        }
      )
    }
},


  },
}
</script>
