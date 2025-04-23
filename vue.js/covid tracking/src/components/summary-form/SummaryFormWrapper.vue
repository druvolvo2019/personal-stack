<template>
  <div>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">Incident Form Summary</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn to="/" push color="negative" align="between">
              <div class="ellipsis">#{{ summary.cifreferenceid }}</div>
              <q-icon right size="1.25em" name="close" />
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="row q-pa-md q-gutter-md">
      <summary-form-details :summary="summary" />
      
    </div>

    <q-page-scroller
      :offset="[18, 18]"
      position="bottom-right"
      :scroll-offset="150"
    >
      <q-btn fab icon="north" color="accent" />
    </q-page-scroller>
    <div class="row">
      <assignment-panels
        class="col-2"
        :users="users"
        :locationKind="locationKind"
        :incident_id="incident_id"
        :currentUser="currentUser"
        :schoolAgent="schoolAgent"
        :districtAgent="districtAgent"
      ></assignment-panels>
      <notes-panel class="col-6 q-ml-lg" :summary="summary">
      </notes-panel>
      
      
    </div>
  </div>
</template>

<script>
// import SummaryFormDetails from './SummaryFormDetails.vue'
// import IncidentContactTypes from '../IncidentContactTypes.vue'
import AssignmentPanels from '../AssignmentPanels.vue'
import NotesPanel from '../NotesPanel.vue'

export default {
  name: 'FormSummaryWrapper',
  components: {
    'summary-form-details': require('./SummaryFormDetails.vue').default,
    AssignmentPanels,
    NotesPanel,
  },

  computed: {},

  props: {
    summary: {
      type: Object,
      required: true,
    },

    users: {
      type: Array,
      required: true,
    },

    locationKind: {
      type: Array,
      required: true,
    },
    incident_id: {
      type: Number,
      required: true,
    },
    currentUser: {
      type: String,
      required: true,
    },
    schoolAgent: {
      type: String,
      required: true,
    },
    districtAgent: {
      type: String,
      required: true
    },

    data() {
      return {
        visible: false,
        title: 'Details',
        title2: 'Summary',
      }
    },
  },
}
</script>

<style></style>
