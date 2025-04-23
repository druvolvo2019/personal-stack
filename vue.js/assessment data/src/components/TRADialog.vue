<template>
  <q-card class="q-gutter-sm" style="width: 400px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">TRA selection ({{ filter.role }})</div>
    </q-card-section>
    <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
      <q-card-section>
        <q-input
          v-model="filter.superTerritory"
          outlined
          label="SuperTerritory"
          :dense="true"
          readonly
          :disabled="true"
          @input="filter.modified = true"
        />
        <q-input
          v-model="filter.territory"
          clearable
          outlined
          label="Territory"
          type="number"
          :dense="true"
          @input="filter.modified = true"
        />
        <q-input
          v-model="filter.stateregion"
          clearable
          outlined
          mask="AA-#"
          hint="To specify State-Region you must have Territory"
          label="State-Region"
          :dense="true"
          @input="filter.modified = true"
        />
        <!-- q-input v-model="filter.region" clearable outlined label="Region" type="number" :dense="true" @input="filter.modified=true"/-->
        <q-input
          v-model="filter.area"
          clearable
          outlined
          hint="To specify Area you must have Territory and State-Region"
          label="Area"
          type="number"
          :dense="true"
          @input="filter.modified = true"
        />
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
          :disabled="!canSubmit"
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
  name: 'TRADialog',

  props: {
    originalData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      filter: { ...this.originalData, modified: false }
    }
  },

  computed: {
    canSubmit() {
      const hasTerr = this.filter.territory
      const hasStateReg = this.filter.stateregion
      const hasArea = this.filter.area
      if (hasArea) {
        return this.filter.modified && hasStateReg && hasTerr
      }
      if (hasStateReg) {
        return this.filter.modified
      }
      return false
    }
  },

  methods: {
    onSubmit() {
      this.$emit('submit', this.filter)
    },

    onReset() {}
  }
}
</script>
