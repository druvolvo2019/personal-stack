<template>
  <q-card class="q-gutter-sm" style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">
        {{ title }} Hard Copy {{ personTitle }} Questionnaire for
        {{ person.firstName }}
        {{ person.lastName }}
      </div>
    </q-card-section>
    <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
      <q-card-section>
        <select-barcode
          v-model="workingCopy.barcode"
          :barcode-options="person.availableBarcodesFn()"
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
  name: 'SelectBarcodeDialog',

  components: {
    'select-barcode': require('../components/SelectBarcodeInput.vue').default
  },
  props: {
    person: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      workingCopy: this.person.getWorkingCopy()
    }
  },

  computed: {
    title() {
      return this.person.barcode == null ? 'Assign' : 'Change'
    },
    notReadyToSubmit() {
      return (
        this.workingCopy.barcode == null || this.workingCopy.nothingHasChanged()
      )
    },
    personTitle() {
      return this.workingCopy.isPrincipal ? 'School' : 'Teacher'
    }
  },

  methods: {
    onSubmit() {
      this.workingCopy.update()
    },

    onReset() {}
  }
}
</script>
