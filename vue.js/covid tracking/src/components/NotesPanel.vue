<template>
  <q-card class="q-ml-xl" style="width: 890px">
    <div class="q-pl-lg q-pb-lg q-pt-md text-black text-h5 text-bold">
      Notes
    </div>
    <div class="q-pl-xl">
      <div id="myapp">
        <textarea
          class="q-pa-md"
          v-model="message"
          placeholder="Notes"
          @keyup="charCount()"
          :maxlength="maxLength"
        ></textarea>
        <br />
        <span class="float-right" style="padding-right: 50px"
          >{{ totalcharacter }}/500 Characters</span
        >
      </div>
    </div>
    <div class="q-pl-xl q-pt-lg row">
      <q-btn
        color="primary"
        size="x-small"
        icon="save"
        label="Save"
        @click="saveMessage()"
      />
      <div class="q-pl-sm">
        <q-btn
          outline
          color="primary"
          size="x-small"
          icon="edit"
          label="Edit"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { runUpdateIncidentNotes } from 'src/lib/dataSource'
export default {
  data() {
    return {
      maxLength: 500,
      message: this.summary.fldnotes,
      totalcharacter: 0,
      savedMessage: '',
      incidentForm: this.summary,
    }
  },
  props: {
      incident_id: {
      type: Number,
      required: true,
    },
      summary: {
      type: Object,
      required: true,
    },
  },

  methods: {
    charCount() {
      this.totalcharacter = this.message.length
      if (this.totalcharacter > 500) {
      }
    },
    async saveMessage() {
      this.savedMessage = this.message
      console.log(this.message)

      let s = {
        status: 200,
        data: null,
      }
      try {
        var notesInput = {
          fldincidentid: this.incidentForm.fldincidentid,
          incidentNotes: this.savedMessage
        }
        console.log('notesInput=', notesInput)

        s = await runUpdateIncidentNotes(notesInput)
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
  },
}
</script>

<style>
textarea {
  width: 93%;
  min-height: 175px;
  font-size: 17px;
}
</style>
