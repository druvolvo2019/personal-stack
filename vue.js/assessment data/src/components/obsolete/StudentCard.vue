<template>
  <q-card
    class="fit"
    bordered
    v-ripple
  >
    <q-card-section>
      <div class="row items-center">
        <div class="col-8 text-subtitle1 ellipsis">
          <span
            :class="(student.adminStatus) ? 'text-strike' : ''"
            v-if="student.lastName"
          >
            {{ student.lastName }}, {{ student.firstName }}
          </span>
        </div>
        <q-space />
        <div class="col-4 text-h6 text-right">
          #{{ student.lineNumber }}
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <!-- Name -->
      <div class="row items-center q-py-xs">
        <div class="col-5 text-right q-item__label--caption">Student Name</div>
        <div
          v-if="student.lastName"
          :class="(student.adminStatus) ? 'col-7 q-pl-md q-item__label text-strike' : 'col-7 q-pl-md q-item__label'"
        >
          {{ student.lastName }}, {{ student.firstName }}
        </div>
      </div>
      <!-- Room -->
      <div v-if="displayOptions.showRoom" class="row items-center q-py-xs">
        <div class="col-5 text-right q-item__label--caption">Room #</div>
        <div class="col-7 q-pl-md q-item__label">{{ student.room }}</div>
      </div>
      <!-- Demographic Variables -->
      <div v-if="displayOptions.showDemographicVariables">
        <q-separator inset class="q-my-sm" />
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">Month/Year of Birth</div>
          <div class="col-7 q-pl-md q-item__label">{{ student.monthOfBirth }}/{{ student.yearOfBirth }}</div>
        </div>
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">Gender</div>
          <div class="col-7 q-pl-md q-item__label">{{ student.gender }}</div>
        </div>
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">Race/Ethnicity</div>
          <div class="col-7 q-pl-md q-item__label"> {{student.raceEthnicity }}</div>
        </div>
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">School Lunch Status</div>
          <div class="col-7 q-pl-md q-item__label"> {{ student.schoolLunchStatus }}</div>
        </div>
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">SD Status</div>
          <div class="col-7 q-pl-md q-item__label">{{ student.sdStatus }}</div>
        </div>
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">ELL Status</div>
          <div class="col-7 q-pl-md q-item__label">{{ student.ellStatus }}</div>
        </div>
      </div>
      <!-- Adminstration Variables -->
      <div v-if="displayOptions.showAdministrationVariables">
        <q-separator inset class="q-my-sm" />
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">Ancillary</div>
          <div class="col-7 q-pl-md q-item__label">{{ student.ancillary }}</div>
        </div>
        <div class="row items-center q-py-xs">
          <div class="col-5 text-right q-item__label--caption">Admin Status</div>
          <div class="col-7 q-pl-md q-item__label"><q-badge v-if="student.adminStatus" :label="student.adminStatus" /></div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row items-center">
        <div class="col-8 text-subtitle1 ellipsis">
          {{ student.group }} / {{ student.subject }}
        </div>
        <q-space />
        <div class="col-4 text-h6 text-right">
          {{ student.loginId }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {

  data () {
    return {}
  },

  props: {
    student: null,
    displayOptions: null
  }

}
</script>
