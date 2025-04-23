<template>
  <div
    class="q-pl-md q-mr-xl"
    :users="users"
    :locationKind="locationKind"
    :incident_id="incident_id"
    :currentUser="currentUser"
    
  >
    <q-card style="width: 310px; min-height: 350px">
      <div class="q-pl-md q-pb-sm q-pt-md text-black text-h6">Assignment</div>

      <div v-if="filter('SCHOOL')">
        <div class="q-pl-md q-pt-md text-black text-subtitle1">
          School Contact
        </div>
        <div class="q-pl-md bg-white" style="width: 95%">
          <q-select
            dense
            v-model="school_model"
            outlined
            :options="agents"
            :option-value="schoolAgent"
            :label="schoolContactAgent"
          />
        </div>
      </div>
      
    

      <div v-if="filter('DISTRICT')">
        <div class="q-pl-md q-pt-md text-black text-subtitle1">
          District Contact
        </div>
        <div class="q-pl-md bg-white" style="width: 95%">
          <q-select
            dense
            v-model="district_model"
            outlined
            :options="agents"
            :option-value="districtAgent"
            :label="districtContactAgent"
          />
        </div>
      </div>

      <div v-if="filter('NCES')">
        <div class="q-pl-md q-pt-md text-black text-subtitle1">
          NCES Contact
        </div>
        <div class="q-pl-md bg-white" style="width: 525px">
          <q-select
            dense
            v-model="nces_model"
            clearable
            outlined
            :options="agents"
            :label="contactAgent"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { runContactAssignment } from 'src/lib/dataSource'
export default {
  data() {

  },
  setup(props,context) {

    return {
      school_model: ref([]),
      district_model: ref([]),
      nces_model: ref([]),
    }
  },
  watch: {
    school_model(newVal, oldVal) {
      console.log(oldVal, newVal)
      if (newVal != undefined) {
        this.schoolContactAgent = 'Assigned'
      } else {
        this.schoolContactAgent = 'Unassigned'
      }
      this.contactAssignment(newVal, this.location_school)
    },
    district_model(newVal, oldVal) {
      console.log(oldVal, newVal)
      if (newVal != undefined) {
        this.districtContactAgent = 'Assigned'
      } else {
        this.districtContactAgent = 'Unassigned'
      }
      this.contactAssignment(newVal, this.location_district)
    },
    nces_model(newVal, oldVal) {
      console.log(oldVal, newVal)
      if (newVal == null) {
        this.contactAgent = 'Unassigned'
      } else {
        this.contactAgent = 'Assigned'
      }
      this.contactAssignment(newVal, locatiion_nces)
    },
  },
  data() {
    return {
      schoolContactAgent: 'Unassigned',
      districtContactAgent: 'Unassigned',
      contactAgent: 'Unassigned',
      location_school: 'SCHOOL',
      location_district: 'DISTRICT',
      location_nces: 'NCES',
      selectedUsername: ''
    }
  },
  props: {
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
      required: true,
    }
  },
  mounted() {
    console.log(this.schoolAgent)
    if (this.schoolAgent != null) {
      this.school_model[0] = this.schoolUsers(this.schoolAgent)
      if (this.schoolUsers(this.schoolAgent) != undefined) {
      this.schoolContactAgent = 'Assigned'
    }
    }
    console.log("district=", this.districtAgent)
     if (this.districtAgent != null) {
      this.district_model[0] = this.agentUsers(this.districtAgent)
      if (this.agentUsers(this.districtAgent) != undefined) {
      this.districtContactAgent = 'Assigned'
    }
    }
    
    
    
  },

  computed: {
    agents: function () {
      let agent_users = []
      let agent_options = []
      agent_users = Object.values(this.users).filter(function (u) {
        return u.fldrole === 'Agent'
      })

      for (let i = 0; i < agent_users.length; i++) {
        let option = {
          label:
            agent_users[i].userfirstname + ' ' + agent_users[i].userlastname,
          value: agent_users[i].userid,
        }
        agent_options.push(option)
      }
      return agent_options
    },
  },

  methods: {
    schoolUsers: function (schoolAgent) {
      let selectedUser = []
      let selectedUsername = ''
      selectedUser = Object.values(this.users).filter(function (u) {
        return u.userid === schoolAgent
      })
      
      
      
      selectedUsername = selectedUser[0].userfirstname + ' ' + selectedUser[0].userlastname 

      console.log(selectedUsername)
      
      return selectedUsername
    },

    agentUsers: function (districtAgent) {
      let selectedUser = []
      let selectedUsername = ''
      selectedUser = Object.values(this.users).filter(function (u) {
        return u.userid === districtAgent
      })
      
      
      
      selectedUsername = selectedUser[0].userfirstname + ' ' + selectedUser[0].userlastname 

      console.log(selectedUsername)
      
      return selectedUsername
    },


    async contactAssignment(userid, location) {
      this.savingFailed = false

      console.log('userid.value=', userid.value)

      let s = {
        status: 200,
        data: null,
      }
      try {
        var contactAssignmentInput = {
          assignedUserId: userid.value,
          locationKind: location,
          loggedInId: this.currentUser,
          incidentId: this.incident_id,
          id: '',
        }
        console.log('contactAssignmentInput=', contactAssignmentInput)

        s = await runContactAssignment(contactAssignmentInput)
      } finally {
      }

      console.log('s', s)

      this.savingFailed = true
      if (s.status == 200) {
        this.errorMessage = 'Data saved successfully.'
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.errorMessage,
        })
      } else {
        this.errorMessage = s.errorMessage
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.errorMessage,
        })
      }
    },
    filter(location) {
      
      return this.locationKind.filter((n) => n === location).length === 0
        ? false
        : true // false
    },
    // schoolClear() {
    //   this.school_model = {label: undefined , value: 'Unassigned'}
    //   console.log("test=" ,this.school_model)
    // }

  },
}
</script>

<style></style>
