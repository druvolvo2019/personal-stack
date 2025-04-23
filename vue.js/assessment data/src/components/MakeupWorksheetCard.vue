<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">
        Makeup Assessment Worksheet
      </div>

      <div class="bg-grey-1">
        <q-tabs
          v-if="hasMultipleSessions"
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            v-for="(item, index) in sessIds"
            :key="index"
            :name="item.sessId"
            :label="item.sessId"
          />
        </q-tabs>

       
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="slide-down"
            transition-next="slide-up"
            @transition="handleTabTransition"
          >
            <q-tab-panel
              v-for="session in sessions"
              :key="session.sessId"
              :name="session.sessId"
              class="q-pa-none"
            >
              <q-card-section v-if="!makeupHasBeenCreated" class="q-gutter-md">
                <q-checkbox
                  v-model="worksession.groupsAssessed"
                  label="All scheduled visit dates have been conducted."
                  :disable="makeupAvailable"
                ></q-checkbox>
                <div v-if="worksession.groupsAssessed">
                  <q-input
                    v-model="worksession.studentsWithdrawn"
                    filled
                    label="Withdrawn & Ineligible Students"
                    type="number"
                    hint="Admin Codes 51, 54, 55"
                    :min="0"
                    :disable="shouldDisable"
                  />

                  <q-input
                    v-model="worksession.studentsExcluded"
                    filled
                    label="SD/EL Excluded Students"
                    type="number"
                    hint="Admin Codes 60-66, 80-81"
                    :min="0"
                    :disable="shouldDisable"
                  />

                  <q-input
                    v-model="worksession.studentsAbsent"
                    filled
                    label="Absent Students"
                    type="number"
                    hint="Admin Codes 40, 43-45, 48"
                    :min="0"
                    :disable="shouldDisable"

                  />

                  <q-input
                    v-model="worksession.studentsRefused"
                    filled
                    label="Refused Students"
                    type="number"
                    hint="Admin Codes 46, 47, and 49"
                    :min="0"
                    :disable="shouldDisable"
                  />

                  <q-input
                    v-model="worksession.studentsNoEquipment"
                    filled
                    label="No Equipment"
                    type="number"
                    hint="Admin Codes 42"
                    :min="0"
                    :disable="shouldDisable"
                  />

                  <q-input
                    v-model="worksession.studentsFTVirtualLearner"
                    filled
                    label="Full-Time Virtual Learner"
                    type="number"
                    hint="Admin Codes 53"
                    :min="0"
                    :disable="shouldDisable"
                  />

                  <q-input
                    v-model="worksession.studentsPTVirtualLearner"
                    filled
                    label="Hybrid (Part-Time) Virtual Learner"
                    type="number"
                    hint="Admin Codes 41"
                    :min="0"
                    :disable="shouldDisable"
                  />
                </div>

                <q-input
                  v-if="worksession.groupsAssessed"
                  v-model="worksession.attendancePercentage"
                  filled
                  label="Attendence Percentage"
                  type="number"
                  mask="###.#"
                  readonly
                >
                  <template v-slot:append>
                    %
                  </template>

                  <q-tooltip>
                    <div>
                      To Be Assessed = Sample ({{
                        worksession.studentsInSample
                      }}) - Withdrawn & Ineligible ({{
                        worksession.studentsWithdrawn
                      }}) - Excluded ({{ worksession.studentsExcluded }}) - FT
                      Virtual Learner ({{
                        worksession.studentsFTVirtualLearner
                      }}).
                    </div>

                    <div>
                      Assessed = To Be Assessed ({{
                        worksession.studentsToBeAssessed
                      }}) - Absent ({{ worksession.studentsAbsent }}) - Refused
                      ({{ worksession.studentsRefused }}) - No Equipment ({{
                        worksession.studentsNoEquipment
                      }}) - PT Virtual Learner ({{
                        worksession.studentsPTVirtualLearner
                      }})
                    </div>

                    <div>
                      Attendance % = Assessed ({{
                        worksession.studentsAssessed
                      }}) &#247; (To Be Assessed ({{
                        worksession.studentsToBeAssessed
                      }}) - Refused ({{ worksession.studentsRefused }}) - No
                      Equipment ({{ worksession.studentsNoEquipment }}) ) x 100
                    </div>
                  </q-tooltip>
                </q-input>
                <q-card-actions v-if="worksession.groupsAssessed" align="right">
                  <q-btn
                    label="Save"
                    color="primary"
                    outline
                    class="q-ml-sm"
                    :disable="teamReadOnly"
                    @click="performCalculation(worksession);showNonMakeupRequired()"
                  />
      
                  <q-btn
                    class="q-ml-sm"
                    outline
                    color="secondary"
                    label="Edit"
                    :disable="teamReadOnly"
                    @click="editMakeup()"
                  />
                 </q-card-actions>
              </q-card-section>

              <q-separator
                v-if="worksession.groupsAssessed"
                inset
              ></q-separator>
              
              <q-card-section
               v-if="worksession.groupsAssessed && !makeupAvailable"
                class="q-gutter-md"
              >
                
                <q-banner
                  v-if="showNonMakeupRequiredMsg"
                  rounded
                  class="bg-grey-3"
                >
                  A makeup assessment is not required.
                </q-banner>
              </q-card-section>

              <q-card-section
                v-if="flgMakeUpNeeded || makeupAvailable || flgeditScheduleDate"
                class="q-gutter-md"
              >
                <q-banner
                  v-if="flgMakeUpNeeded"
                  rounded
                  class="bg-grey-3"
                >
                  Yes, a makeup assessment is required. Please schedule the
                  makeup date, time, and location. <br/> Only dates between <b>January 24, 2022</b> to <b>March 31, 2022 </b> can be selected.
                  All the other dates are disabled.
                </q-banner>
                
                
                <q-banner v-if="makeupHasBeenCreated" rounded class="bg-grey-3">
                  A makeup session has been scheduled for this assessment.
                </q-banner>

                <div>
                  <q-input
                    v-model="mudate"
                    debounce="5000"
                    filled
                    label="Makeup Date"
                    mask="##/##/####"
                    :rules="[
                      val =>
                        /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/.test(
                          val
                        ) || 'Date must be in form MM/DD/YYYY'
                    ]"
                    :disable="shouldDisable"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="mudate" 
                                  mask="MM/DD/YYYY"
                                  :options="datesRestrictions">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <q-input
                    v-model="mutime"
                    debounce="5000"
                    filled
                    label="Makeup Time"
                    :rules="[
                      val =>
                        /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AP][M]))/.test(
                          val
                        ) || 'Time must be in form hh:mm AM/PM'
                    ]"
                    :disable="shouldDisable"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="mutime"
                            mask="h:mm A"
                            :options="optionsFn"
                            :minute-options="minutesRestrictions"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    v-model="muloc"
                    debounce="5000"
                    filled
                    label="Makeup location"
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Location must be entered'
                    ]"
                    :disable="shouldDisable"
                  />
                   <q-card-actions align="right">
                    <q-btn
                      label="Save"
                      color="primary"
                      outline
                      class="q-ml-sm"
                      :disable="teamReadOnly"
                      @click="saveMakeupSessionData()"
                    />
        
                    <q-btn
                      class="q-ml-sm"
                      outline
                      color="secondary"
                      label="Edit"
                      :disable="teamReadOnly"
                      @click="editScheduleDate()"
                    />
                 </q-card-actions>
              
                  <q-input v-model="savetext" dense readonly />
                  
                   </div>
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script>
import Formatting from '../lib/formatting'
export default {
  props: {
    sessions: {
      type: Array,
      required: true
    },
    gradeId: {
      type: String,
      default: ''
    },
    teamReadOnly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tab: undefined,
      worksession: {},
      mudate: null,
      mutime: null,
      muloc: null,
      makeupAvailable: false,
      saved: false,
      savetext: null,
      makeupHasBeenCreated: false,
      showNonMakeupRequiredMsg: false,
      flgeditScheduleDate: false,
      flgMakeUpNeeded: false,
      datesRestrictions (mudate) {
        return mudate >= '2022/01/24' && mudate <= '2022/03/31'
      },
      minutesRestrictions: [0,5,10,15,20,25,30,35,40,45,50,55],
    }
  },

  computed: {
    hasMultipleSessions: function() {
      return this.sessIds.length > 1
    },

    sessIds: function() {
      var resArr = []
      this.sessions.forEach(item => {
        resArr.push({ sessId: item.sessId })
      })

      return resArr
    },

    sessionLabel: {
      get() {
        return this.$store.state.userprofile.sessionLabel
      },

      set(val) {
        this.$store.commit('userprofile/updateSessionLabel', val)
      }
    },
    
    makeupCurrentGradeID:{
      get() {
        return this.$store.state.userprofile.makeupCurrentGradeID
      },

      set(val) {
        this.$store.commit('userprofile/updateMakeupCurrentGradeID', val)
      }
    },

    shouldDisable() {
      var disabled =
        this.saved ||
        this.makeupAvailable ||
        (!this.makeupAvailable && !this.worksession.groupsAssessed)

       if (this.teamReadOnly) {
         disabled = true
       }
      return disabled
    },
    
    makeupSavedSession:{
      get() {
        return this.$store.state.userprofile.makeupSavedSession
      },

      set(val) {
        this.$store.commit('userprofile/updateMakeupSavedSession', val)
      }
    },
  },

  created: function() {
    if (this.sessIds.length < 1 || this.sessIds == undefined) {
    } else {
      this.tab = this.sessIds[0].sessId
    }
  },

  beforeMount() {
    if (this.makeupCurrentGradeID ===this.gradeId){
      this.tab = this.sessionLabel
      this.sessions.forEach(item => {
        if (item.sessId === this.tab){
         this.captureSessionData(this.tab,this.gradeId)
        }
      })
    }else {
      this.tab = this.sessions[0].sessId
      this.captureSessionData(this.tab,this.gradeId)
    }
  },

  methods: {
    
    saveMakeupSessionData() {
      
      let data = {
          sessId: this.worksession.sessId,
          makeupDate: this.mudate,
          makeupTime: this.mutime,
          makeupLocation: this.muloc,
          makeupDateTime: Formatting.dbStringFromDateString(
            this.worksession.makeupDateTime
          )
        }
        
        this.worksession.makeupDate = this.mudate
        this.worksession.makeupTime = this.mutime
        this.worksession.makeupLocation = this.muloc
        //Save the makepup data to the store
        this.makeupSavedSession = this.worksession
        this.$emit('saveMakeupSession', data)
        this.makeupAvailable = true
        this.saved = true
        
    },
    
    handleTabTransition(newVal, oldVal) {
      this.sessionLabel = newVal
      this.makeupCurrentGradeID = this.gradeId
      this.sessions.forEach(item => {
        if (item.sessId === this.tab && this.hasMultipleSessions) {
          this.captureSessionData(item.sessId,this.gradeId)
          this.showNonMakeupRequiredMsg = false
          this.flgMakeUpNeeded = false
          this.flgeditScheduleDate = false
        }
      })
      
    },
    

    captureSessionData(sessId,gradeId) {
       
       //console.log('this.makeupSavedSession', this.makeupSavedSession)
       //console.log('this.sessionLabel', this.sessionLabel)
       //this.worksession = null
       let makeupLocation = null
       let makeupDate = null
       let makeupTime = null
       let scheduledvistedconducted = false 

        
    this.sessions.forEach(session => {
         //console.log('sessId', sessId)
         //console.log('session.sessId', sessId)
       if (session.sessId === sessId){
         
        //console.log('gradeId', gradeId)
        //console.log('session', session) 
        //console.log('this.makeupCurrentGradeID',this.makeupCurrentGradeID)
        
        if (this.makeupSavedSession.gradeId === gradeId) {  
           //console.log('session.sessId', sessId)
           //console.log('this.makeupSavedSession.sessId', this.makeupSavedSession.sessId)
           if (this.makeupSavedSession.sessId == sessId) {
                    makeupLocation = this.makeupSavedSession.makeupLocation
                    makeupDate = this.makeupSavedSession.makeupDate
                    makeupTime = this.makeupSavedSession.makeupTime
                    
            
           } else {
                  if (this.makeupSavedSession.sessId == undefined){
                    makeupLocation = session.makeupLocation
                    makeupDate = session.makeupDate
                    makeupTime = session.makeupTime
                  } else {
                      makeupLocation = null
                      makeupDate = null
                      makeupTime = null
                  }
           }
       }else {
          makeupLocation = session.makeupLocation
          makeupDate = session.makeupDate
          makeupTime = session.makeupTime
       }
       
         //console.log('makeupDate=' + makeupDate)
         //console.log('makeupTime=' + makeupTime)
         //console.log('makeupLocation=' + makeupLocation)
         //console.log('sessId', sessId)
         //console.log('session.sessId', sessId) 
      
      this.makeupHasBeenCreated =
        makeupLocation !== null &&
        makeupDate !== null &&
        makeupTime !== null
      this.makeupAvailable = !(
        //        session.makeupLocation === null && session.makeupDateTime === null
        (
          makeupLocation === null &&
          makeupDate === null &&
          makeupTime === null
        )
      )
      if (makeupDate === null) {
         this.mudate = makeupDate
      } else {
         let date = new Date(makeupDate)
         let newdate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
         this.mudate = newdate
         this.saved = true
      }

      this.mutime = makeupTime
      this.muloc = makeupLocation
      
      //console.log('this.saved=' + this.saved)
      //console.log('makeupAvailable=' + this.makeupAvailable)
      //console.log('makeupHasBeenCreated=' + this.makeupHasBeenCreated)
      //console.log('flgMakeUpNeeded=' + this.flgMakeUpNeeded)
     
      
      //console.log('makeupDate=' + makeupDate)
      //console.log('mudate=' + this.mudate)
      //console.log('mutime=' + this.mutime)
      //console.log('muloc=' + this.muloc)
      
      this.sessions.forEach(item => {
      
        if (item.makeupLocation !== null &&
        item.makeupDate !== null &&
        item.makeupTime !== null ){
          scheduledvistedconducted = true 
        }
        
        //console.log('scheduledvistedconducted=' + scheduledvistedconducted)
    })
  
      this.worksession = {
        groupsAssessed: session.groupsAssessed || this.makeupAvailable || scheduledvistedconducted,
        gradeId: gradeId,
        sessId: session.sessId,
        studentsWithdrawn: session.studentsWithdrawn,
        studentsExcluded: session.studentsExcluded,
        studentsAbsent: session.studentsAbsent,
        studentsRefused: session.studentsRefused,
        studentsNoEquipment: session.studentsNoEquipment,
        studentsFTVirtualLearner: session.studentsFTVirtualLearner,
        studentsPTVirtualLearner: session.studentsPTVirtualLearner,
        attendancePercentage: session.attendancePercentage,
        studentsInSample: session.studentsInSample,
        studentsToBeAssessed: session.studentsToBeAssessed,
        studentsAssessed: session.studentsAssessed,
        makeupDate: makeupDate,
        makeupTime: makeupTime,
        makeupLocation: makeupLocation,
        makeupDateTime: session.makeupDateTime
          ? Formatting.dateTimeStringFromDbString(session.makeupDateTime)
          : null
      }
      
      }
    })
    
    },
    
    makeupNeeded() {
      this.flgMakeUpNeeded = (
        this.worksession.groupsAssessed &&
        this.worksession.attendancePercentage <= 89 &&
        !this.makeupAvailable &&
        this.worksession.studentsAbsent + this.worksession.studentsNoEquipment >
          1
      )
      
      return this.flgMakeUpNeeded
      
    },

    haveMakeupInfo() {
      return this.makeupAvailable
    },

    showMakeup() {
      return this.worksession.groupsAssessed || this.makeupAvailable
    },

    performCalculation(session) {
      
      
      this.worksession.studentsToBeAssessed =
        parseInt(this.worksession.studentsInSample) - (
        parseInt(this.worksession.studentsWithdrawn) +
        parseInt(this.worksession.studentsExcluded) +
        parseInt(this.worksession.studentsFTVirtualLearner))
        
      //console.log('studentsInSample', this.worksession.studentsInSample)
      //console.log('studentsWithdrawn', this.worksession.studentsWithdrawn)
      //console.log('studentsExcluded', this.worksession.studentsExcluded)
      //console.log('studentsFTVirtualLearner', this.worksession.studentsFTVirtualLearner)
      //console.log('-----------------------------------------------------') 

     
      this.worksession.studentsAssessed =
        parseInt(this.worksession.studentsToBeAssessed) - (
        parseInt(this.worksession.studentsAbsent) +
        parseInt(this.worksession.studentsRefused) +
        parseInt(this.worksession.studentsNoEquipment) +
        parseInt(this.worksession.studentsPTVirtualLearner))
        
      //console.log('studentsToBeAssessed', this.worksession.studentsToBeAssessed)
      //console.log('studentsAbsent', this.worksession.studentsAbsent)
      //console.log('studentsRefused', this.worksession.studentsRefused)
      //console.log('studentsNoEquipment', this.worksession.studentsNoEquipment)
      //console.log('studentsPTVirtualLearner', this.worksession.studentsPTVirtualLearner)
      //console.log('studentsAssessed', this.worksession.studentsAssessed)
     
      //console.log('-----------------------------------------------------') 

       this.worksession.attendancePercentage = (
        (parseInt(this.worksession.studentsAssessed) /
          (parseInt(this.worksession.studentsToBeAssessed) -
            parseInt(this.worksession.studentsRefused) -
            parseInt(this.worksession.studentsNoEquipment))) *
        100
      ).toFixed(0)
      
      //console.log('studentsAssessed', this.worksession.studentsAssessed)
      //console.log('studentsToBeAssessed', this.worksession.studentsToBeAssessed)
      //console.log('studentsRefused', this.worksession.studentsRefused)
      //console.log('studentsNoEquipment', this.worksession.studentsNoEquipment)
      //console.log('attendancePercentage', this.worksession.attendancePercentage)
     
      
      this.saved = true
      this.makeupNeeded()
  
    },
    showNonMakeupRequired(){
      if (this.worksession.attendancePercentage > 89) {
         this.showNonMakeupRequiredMsg = true
      }else{
        this.showNonMakeupRequiredMsg = false
      }
    }
    ,
    editMakeup(){
      this.saved = false
      this.makeupAvailable = false
      this.worksession.groupsAssessed =  true
    }
    
    ,
    editScheduleDate(){
      this.saved = false
      this.makeupAvailable = false
      this.worksession.groupsAssessed =  true
      this.flgeditScheduleDate = true
    }
    ,
    optionsFn(hr) {
      if (hr < 6 || hr > 18) {
        return false
      }
      return true
    }
  }
}
</script>
