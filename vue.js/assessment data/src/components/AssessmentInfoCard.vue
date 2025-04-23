<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <q-card class="fit" flat bordered square>
      <div class="text-subtitle1 q-px-md q-pt-md">Assessment Information</div>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon
                :name="
                  grade.assessmentComplete
                    ? 'las la-calendar-check'
                    : 'las la-calendar-day'
                "
              ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span :class="grade.assessmentComplete ? 'text-strike' : ''">{{
                  formattedArrivalDate
                }}</span>
                <q-badge
                  v-if="grade.isMakeup"
                  color="secondary"
                  class="on-right"
                  outline
                  label="MAKEUP"
                />
              </q-item-label>

              <q-item-label caption>
                Arrival Date/Time
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label> {{ grade.prepTime }} minutes </q-item-label>
              <q-item-label caption>
                Prep time
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-map"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ grade.assignedFieldArea }}</q-item-label>
              <q-item-label caption>Assigned Field Area</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-user"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label
                >{{ grade.assignedAssessmentCoordinator }},
                {{ formatPhoneNumber }}
              </q-item-label>
              <q-item-label caption>Assessment Coordinator</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-sign-in-alt"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ grade.eNAEPUsername }}</q-item-label>
              <q-item-label caption>eNAEP username</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-clock"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ formatschooltime }}</q-item-label>
              <q-item-label caption>School Hours</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-user"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ formatSCnameandphone }}</q-item-label>
              <q-item-label caption>School Coordinator</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-user"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ formatPrincipalnameandphone }}</q-item-label>
              <q-item-label caption>Principal</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-map-marker"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <div class="row">
                  {{ grade.school.schoolName }}
                </div>
              </q-item-label>
              <q-item-label>
                {{ grade.school.schoolAddress }},
                {{ grade.school.schoolAddressCity }},
                {{ grade.school.schoolAddressState }}
                {{ grade.school.schoolAddressZip }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-tag"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ grade.school.districtName }}</q-item-label>
              <q-item-label caption>{{ TudaCaption }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions class="q-pa-md">
        <q-btn
          color="primary"
          label="How To Report A Missing Controlled Item"
          outline
          @click="missingitem = true"
        />

        <q-dialog v-model="missingitem">
          <q-card>
            <q-card-section>
              <div class="text-h6">
                Instructions for Reporting a Missing Item
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <p>
                Westat is required to inform NCES within 1 hour of any missing
                controlled item. In the case of missing item(s), follow the
                steps below:
              </p>
              <ol>
                <li>Inform your supervisor or field manager.</li>
                <li>Contact the NAEP help desk 1-888-499-NAEP (6237).</li>
                <li>Follow the instructions provided by the help desk.</li>
              </ol>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="OK" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import AssessmentCaption from 'src/lib/AssessmentCaption'
import Formatting from 'src/lib/formatting'

export default {
  props: {
    sampledgrade: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      missingitem: false,
    }
  },

  computed: {
    grade() {
      return this.sampledgrade
    },
    formattedArrivalDate() {
      //console.log('scheduledArrivalDate=',this.grade.scheduledArrivalDate)
      
      let result = Formatting.formatDateDayNameAndTimeNoYear(
        this.grade.scheduledArrivalDate
      )
      console.log('scheduledArrivalDate=',result)
      
      if (!result || result == undefined) return ''
      const resultArray = result.split(',')
      let scheduledArrivalDate = resultArray[0] + ", " + resultArray[1]
      
      console.log('assessmentArrivalDtVisible=',this.grade.assessmentArrivalDtVisible)
      
      console.log('grade=',this.grade)
      
      if (this.grade.assessmentArrivalDtVisible == 0 ) {
         result = resultArray[0] + ", " + resultArray[1] + ", Missing Time"
      }
      
       console.log('scheduledArrivalDate=',result)
    
      
      return result
    },
    formatPhoneNumber() {
      return Formatting.formatPhoneNumber(this.grade.assignedACPhone)
    },

    TudaCaption() {
      return AssessmentCaption(
        this.grade.school.flgTUDA,
        this.grade.school.isPublic
      )
    },
    formatschooltime() {
      //console.log('sformatStartAndEndTime=',this.grade.schoolStartTime,  this.grade.schoolEndTime)
      return Formatting.formatStartAndEndTime(
        this.grade.schoolStartTime,
        this.grade.schoolEndTime
      )
    },
    formatSCnameandphone() {
      return Formatting.combineNameAndPhoneNoFormatting(
        this.grade.coordinatorName,
        this.grade.coordinatorTelephoneNumber
      )
    },
    formatPrincipalnameandphone() {
      return Formatting.combineNameAndPhoneNoFormatting(
        this.grade.principalName,
        this.grade.principalTelephoneNumber
      )
    },
  },
}
</script>
