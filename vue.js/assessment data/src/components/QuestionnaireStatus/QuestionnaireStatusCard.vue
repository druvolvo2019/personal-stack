<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">Questionnaire Status</div>
      <q-card-section>
        <section-heading
          heading="School Questionnaires"
          :questionnaire-type="school.schoolQuestionnaireType"
        />
        <q-list bordered separator>
          <person-status
            :person="school.principal"
            :display-the-caption="displayCaption"
            :subjects="subjects"
            :team-read-only="teamReadOnly"
          />
        </q-list>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section>
        <q-item v-if="school.teachers.length === 0">
          <q-item-section>No teachers have been entered</q-item-section>
        </q-item>
        <q-list v-else>
          <section-heading
            heading="Teacher Questionnaires"
            :questionnaire-type="school.teacherQuestionnaireType"
          />
          <q-list bordered separator>
            <person-status
              v-for="teacher in school.teachers"
              :key="teacher.personId"
              :person="teacher"
              :display-the-caption="displayCaption"
              :subjects="subjects"
              :team-read-only="teamReadOnly"
            >
              <template v-slot:before>
                <q-item-section side>
                  {{ teacher.lineNumber }}
                </q-item-section>
              </template>
            </person-status>
          </q-list>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-actions class="q-pa-md">
        <q-btn
          color="primary"
          label="Add Missing Teacher"
          outline
          aria-label="Add missing teacher"
          :disable="teamReadOnly"
          @click="addTeacher"
        >
          <q-tooltip>
            Click to add missing teacher
          </q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-dialog v-model="showAddTeacherDialog" size="medium">
        <add-teacher-dialog
          :subjects="subjects"
          :teacher-fn="school.createNewTeacher"
          :is-add="true"
        />
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireStatusCard',
  components: {
    'add-teacher-dialog': require('./dialogs/AddEditTeacherDialog.vue').default,
    'section-heading': require('./components/SectionHeading.vue').default,
    'person-status': require('./components/PersonStatus.vue').default,
  },

  props: {
    school: {
      type: Object,
      required: true,
    },
    displayCaption: {
      type: Boolean,
      default: false,
    },
    subjects: {
      type: Array,
      required: true,
    },
    
    teamReadOnly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showAddTeacherDialog: false,
    }
  },

  methods: {
    addTeacher() {
      this.showAddTeacherDialog = true
    },
  },
}
</script>
