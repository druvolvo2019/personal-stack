<template>
  <q-card style="width: 700px; max-width: 160vw;">
    <div class="text-subtitle1 q-px-md q-pt-md">
      Provide Missing Demographic Variables
    </div>
    <q-card-section>
      <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <q-select
          v-for="(item, i) in items"
          :key="`select-${i}`"
          :value="item.value"
          filled
          class="q-pt-sm"
          :label="captions[item.name]"
          :options="options[item.name]"
          clearable
          emit-value
          map-options
          @input="updateValue(item.name, $event)"
        />
      </q-form>
    </q-card-section>
    <q-card-actions align="right" class="q-pa-md">
      <q-btn
        v-close-popup
        outline
        label="Cancel"
        type="submit"
        color="primary"
        @click="onReset"
      />
      <q-btn
        v-close-popup
        label="Submit"
        type="submit"
        color="primary"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'EditDemographicsDialog',
  props: {
    student: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      captions: {
        gender: 'Sex',
        raceEthnicity: 'Race/Ethnicity',
        schoolLunchStatus: 'School Lunch Status',
        sdStatus: 'Student Disability Status',
        ellStatus: 'English Language Learner Status',
        yearOfBirth: 'Year of Birth',
        monthOfBirth: 'Month of Birth'
      },
      items: [
        'gender',
        'raceEthnicity',
        'schoolLunchStatus',
        'sdStatus',
        'ellStatus',
        'yearOfBirth',
        'monthOfBirth'
      ]
        .map(key => {
          const v = this.student[key]
          const value = v === 0 ? null : v
          return {
            name: key,
            value
          }
        })
        .filter(x => x.value === null),
      options: {
        gender: [
          { label: 'Male', value: 1 },
          { label: 'Female', value: 2 },
          { label: 'Information Unavailable', value: 9 }
        ],
        raceEthnicity: [
          { label: 'White, not Hispanic', value: 1 },
          { label: 'Black or African American, not Hispanic', value: 2 },
          { label: 'Hispanic, of any race', value: 3 },
          { label: 'Asian, not Hispanic', value: 4 },
          { label: 'American Indian or Alaska Native, not Hispanic', value: 5 },
          {
            label: 'Native Hawaiian or Pacific Islander, not Hispanic',
            value: 6
          },
          { label: 'Two or More Races (Non-Hispanic)', value: 7 },
          { label: 'School does not collect this information', value: 8 },
          { label: 'Information unavailable', value: 9 }
        ],
        schoolLunchStatus: [
          { label: 'Student not eligible', value: 1 },
          { label: 'Free lunch', value: 2 },
          { label: 'Reduced price lunch', value: 3 },
          { label: 'School not participating', value: 4 },
          { label: 'School refused', value: 5 },
          { label: 'Information unavailable', value: 9 }
        ],
        sdStatus: [
          { label: 'Yes, IEP', value: 1 },
          { label: 'Yes, 504', value: 2 },
          { label: 'No, not SD', value: 3 },
          { label: 'Not SD, Other', value: 5 },
          { label: 'Information unavailable', value: 9 }
        ],
        ellStatus: [
          { label: 'Yes, ELL', value: 1 },
          { label: 'No, Formerly ELL', value: 2 },
          { label: 'No, not ELL', value: 3 },
          { label: 'Not ELL, Other', value: 5 },
          { label: 'Information unavailable', value: 9 }
        ],
        yearOfBirth: [
          { label: '2004', value: 2004 },
          { label: '2005', value: 2005 },
          { label: '2006', value: 2006 },
          { label: '2007', value: 2007 },
          { label: '2008', value: 2008 },
          { label: '2009', value: 2009 },
          { label: '2010', value: 2010 },
          { label: '2011', value: 2011 },
          { label: '2012', value: 2012 }
        ],
        monthOfBirth: [
          { label: '01', value: 1 },
          { label: '02', value: 2 },
          { label: '03', value: 3 },
          { label: '04', value: 4 },
          { label: '05', value: 5 },
          { label: '06', value: 6 },
          { label: '07', value: 7 },
          { label: '08', value: 8 },
          { label: '09', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 }
        ]
      }
    }
  },

  methods: {
    saveDemographicData() {
      /*
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
      const newValues = this.items.reduce((prev, x) => {
        return {
          ...prev,
          [x]: this.items[x]
        }
      }, {})
      const updates = Object.keys(newValues)
        .filter(x => this.student[x] !== 0)
        .reduce((obj, x) => {
          return {
            ...obj,
            [x]: newValues[x]
          }
        }, {})
      updates.session = this.student.session
      updates.lineNumber = this.student.lineNumber

      // call function in SampleGradeDetailsWrapper.vue
      this.$root.$emit('saveMissingDemographics', updates)
    },

    onSubmit() {
      var notify = {
        color: 'green-5',
        textColor: 'white',
        icon: 'warning',
        message: `Finished editing ${this.student.firstName} ${this.student.lastName}`
      }

      if (this.items.some(x => x.value === null)) {
        notify = {
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `Update Failed. Please fill in all demographics data.`
        }

        this.$q.notify(notify)
      } else if (this.items.some(x => x.value !== this.student[x])) {
        this.saveDemographicData()
        this.$q.notify(notify)
      }
    },
    onReset() {
      console.log('reset')
    },
    updateValue(name, value) {
      const index = this.items.findIndex(x => x.name === name)
      Vue.set(this.items, index, { ...this.items[index], value: value })
    }
  }
}
</script>
