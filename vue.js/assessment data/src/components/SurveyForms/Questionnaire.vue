<template>
  <div class="col-xs-12 col-sm-6 col-md-8">
    <q-card v-if="alreadyAnswered" class="q-pa-md" flat bordered square>
      <h6>Thank you for answering this survey!</h6>
      <q-card-section>
        <q-btn-dropdown
          class="q-ml-sm"
          outline
          color="secondary"
          label="History"
          :disable="history.length === 0"
        >
          <q-list>
            <q-item
              v-for="item in history"
              :key="item.trackingdt"
              v-close-popup
              clickable
              @click="showHistory(item)"
            >
              <q-item-section>
                <q-item-label
                  >By {{ item.firstname }}
                  {{ item.lastname }}
                  {{ item.userRole }}
                  on
                  {{ fullTimestamp(item.trackingdt) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-section>
    </q-card>
    <q-card v-else bordered flat square class="fit">
      <q-card-section>
        <p v-if="survey === 'fso'">
          In this form, you will be asked questions about the NAEP team’s
          activities on the day of the assessment observation at
          {{ school.school.schoolName }}, {{ school.school.schoolAddressCity }},
          {{ school.school.schoolAddressState }} on
          {{ formattedAssessmentDate }}. (NAEP ID: {{ school.gradeId }}).
        </p>
        <q-item-section v-if="survey === 'aaob'">
          <q-select
            v-model="aaValue"
            class="q-pb-sm"
            dense
            outlined
            label="AA Name"
            :options="aaOptions"
            :rules="[val => aaValue !== undefined || 'Please make a selection']"
            style="width: 100%"
            @input="aaChanged"
          ></q-select>
          <q-select
            v-model="sessionValue"
            class="q-pb-sm"
            dense
            outlined
            label="Session#"
            :options="sessionOptions"
            :rules="[
              val => sessionValue !== undefined || 'Please make a selection',
            ]"
            style="width: 100%"
            @input="sessionChanged"
          ></q-select>
          <q-select
            v-model="groupValue"
            class="q-pb-sm"
            dense
            outlined
            label="Group"
            :options="groupOptions"
            :rules="[
              val => groupValue !== undefined || 'Please make a selection',
            ]"
            style="width: 100%"
            @input="groupChanged"
          ></q-select>
        </q-item-section>
        <question
          v-for="(question, index) in questions"
          :key="'q' + question.id"
          :question="question"
          :index="[index]"
          :response="response"
          @update="update($event)"
        >
        </question>

        <q-separator />
        <!--div class="text-h6 q-px-md q-pt-md">Response Summary</div>
        <response-summary
          v-for="(question, index) in questions"
          :key="'r' + question.id"
          :question="question"
          :index="[index]"
          :response="response"
        /-->
        <q-btn
          label="Save"
          color="primary"
          outline
          class="q-ml-sm"
          :disable="!dirty"
          @click="saveResponses()"
        />

        <q-btn-dropdown
          class="q-ml-sm"
          outline
          color="secondary"
          label="History"
          :disable="history.length === 0"
        >
          <q-list>
            <q-item
              v-for="item in history"
              :key="item.trackingdt"
              v-close-popup
              clickable
              @click="showHistory(item)"
            >
              <q-item-section>
                <q-item-label
                  >By {{ item.firstname }}
                  {{ item.lastname }}
                  {{ item.userRole }}
                  on
                  {{ fullTimestamp(item.trackingdt) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-section>
    </q-card>

    <q-dialog v-model="historyDialog">
      <SurveyHistoryDialog
        :editable="!isAAObs"
        :title="historyAudit"
        :html="historyHtml"
        @editHistory="editHistory"
      />
    </q-dialog>
  </div>
</template>

<script>
import Formatting from 'src/lib/formatting'
import Utils from 'src/lib/schoolListCardsUtils'
import Question from 'src/components/SurveyForms/quexcomponents/Question'
//import ResponseSummary from 'src/components/SurveyForms/quexcomponents/ResponseSummary'
import questionnaire, {
  makeResponseObjFromHistory,
} from 'src/components/SurveyForms/jsfiles/questionnaire.js'
import {
  getResponseChangesForDB,
  vsfQnrAsHTML,
} from 'src/components/SurveyForms/jsfiles/SurveyFormBase'
import SurveyHistoryDialog from 'src/components/SurveyHistoryDialog'

export default {
  name: 'Questionnaire',
  components: {
    Question,
    SurveyHistoryDialog,
    //    ResponseSummary,
  },
  props: {
    survey: {
      type: String,
      required: true,
    },
    school: {
      type: Object,
      required: true,
    },
    history: {
      type: Array,
      default: () => [],
    },
    currentuser: {
      type: Object,
      required: true,
    },
    aas: {
      type: Array,
      default: () => [],
    },
    sessions: {
      type: Array,
      default: () => [],
    },
    groups: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      response: {},
      questions: questionnaire.questions(this.survey),
      historyDialog: false,
      historyHtml: null,
      historyAudit: null,
      dirty: false,
      historyItem: null,
      allowEdits: false,
      aaValue: null,
      sessionValue: null,
      groupValue: null,
      aaList: [],
      sessionList: [],
      groupList: [],
    }
  },
  computed: {
    aaOptions() {
      return this.aaList // ['Harold', 'Jackson', 'Emily']
    },
    sessionOptions() {
      //console.log('computed sessionOptions called', this.sessionList)
      return this.sessionList //['A Session', 'B Session', 'C Session']
    },
    groupOptions() {
      return this.groupList //['Group 1', 'Group 2', "Emily's group"]
    },
    formattedAssessmentDate() {
      return Formatting.formatDateDayNameAndTimeNoYear(
        this.school.scheduledAssessmentDate
      )
    },
    alreadyAnswered() {
      //LM: 1/28/2022 temp fix for production issue
      if (this.survey === 'aaob')
        return false;

      let ouranswers = this.history.filter(
        x => x.updateduid === this.currentuser.uid
      )
      //let allowEdits take priority to edit histories
      /*    console.log(
        'alreadyAnswered allow/ourans/combined',
        this.allowEdits,
        ouranswers.length > 0,
        this.allowEdits ? false : ouranswers.length > 0,
        this.history
      )
  */
      return this.allowEdits ? false : ouranswers.length > 0
    },
    isAAObs() {
      return this.survey === 'aaob'
    }
  },
  mounted() {
    this.dirty = false
    console.log('Questionnaire.mounted', this.survey, this.history, this.currentuser, this.alreadyAnswered)
    this.sessions.forEach(sess => {
      //console.log('qnr mounted session', sess)
      sess.assignedAdministrators.forEach(aa => {
        if (!this.aaList.includes(aa)) this.aaList.push(aa)
      })
      if (sess.sessId && !this.sessionList.includes(sess.sessId))
        this.sessionList.push(sess.sessId)
      var s = Utils.getGroupName(sess)
      if (s && !this.groupList.includes(s)) this.groupList.push(s)
    })
  },
  methods: {
    aaChanged(event) {
      this.update({
        tag: 'aa-name-text',
        value: event,
        questionId: 481,
        choiceId: 1,
        id: 481,
        textEnable: true,
      })
    },
    sessionChanged(event) {
      this.update({
        tag: 'session-num-text',
        value: event,
        questionId: 482,
        choiceId: 1,
        id: 482,
        textEnable: true,
      })
    },
    groupChanged(event) {
      this.update({
        tag: 'group-name-text',
        value: event,
        questionId: 483,
        choiceId: 1,
        id: 483,
        textEnable: true,
      })
    },
    update(event) {
      this.response = Object.assign(
        {},
        questionnaire.updateFn(this.response, event)
      )
      this.dirty = true
    },
    saveResponses() {
      let ch = getResponseChangesForDB(questionnaire.quexID, this.response)
      ch.visitId = this.school.visitId
      //  console.log('changes', JSON.stringify(ch).replace(/},/g, '},\n'))
      //fix for VSF wants to have strict control over input
      //input must contain array called "responses", not "changes"
      //and no redflag attribute either
      ch.responses = ch.changes
      delete ch.changes
      delete ch.redflag
      ch.updateduid = this.currentuser.uid
      ch.firstname = this.currentuser.firstname
      ch.lastname = this.currentuser.lastname
      ch.userRole = this.currentuser.userRole
      if (ch.responses.length > 0) {
        //console.log('survey responses', ch)
        this.allowEdits = false
        this.$emit('saveSurvey', ch)
      }
    },

     fullTimestamp(dtstr) {
      return Formatting.dateTimeStringFromDbString(dtstr)
    },

    showHistory(key) {
      this.historyItem = key
      this.historyAudit = `By ${key.firstname} ${key.lastname} ${
        key.userRole ? key.userRole : 'AC'
      } on ${Formatting.dateTimeStringFromDbString(key.trackingdt)} `
      this.historyHtml = vsfQnrAsHTML(key.quexdata.responses, this.questions)
      //console.log('histdialog', this.historyNodes, this.htmltext)
      this.historyDialog = true
    },

    editHistory() {
      this.dirty = false
      this.response = makeResponseObjFromHistory(
        this.questions,
        this.historyItem.quexdata.responses
      )
      this.allowEdits = true
    },
  },
}
</script>
