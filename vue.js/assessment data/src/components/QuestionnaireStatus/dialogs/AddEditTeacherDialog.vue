<template>
  <q-card class="q-gutter-sm" style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
      <q-card-section>
        <required-input v-model="workingCopy.firstName" label="First Name" />
        <required-input v-model="workingCopy.lastName" label="Last Name" />
        <edit-subjects v-model="workingCopy.subjects" :subjects="subjects" />
        <select-barcode
          v-model="workingCopy.barcode"
          :barcode-options="workingCopy.availableBarcodesFn()"
        >
          <template v-slot:prepend>
            <q-icon name="las la-barcode" />
          </template>
        </select-barcode>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          v-close-popup
          label="Cancel"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn
          v-close-popup
          :disabled="notReadyToSubmit"
          label="Submit"
          type="submit"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: 'AddTeacherDialog',

  components: {
    'select-barcode': require('../components/SelectBarcodeInput.vue').default,
    'required-input': require('src/components/shared/NaepRequiredInput.vue')
      .default,
    'edit-subjects': require('src/components/QuestionnaireStatus/components/EditSubjects')
      .default,
  },
  props: {
    isAdd: {
      type: Boolean,
      default: false,
    },
    teacherFn: {
      type: Function,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      workingCopy: this.teacherFn().getWorkingCopy(),
      title: this.isAdd
        ? 'Add Missing Teacher'
        : `Assign Hardcopy Teacher Questionnaires`,
    }
  },

  computed: {
    notReadyToSubmit() {
      return this.workingCopy.nothingHasChanged()
    },
  },
  methods: {
    onSubmit() {
      this.workingCopy.update()
    },

    onReset() {},
  },
}
</script>
