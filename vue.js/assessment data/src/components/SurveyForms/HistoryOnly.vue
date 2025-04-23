<template>
  <div class="col-xs-12 col-sm-6 col-md-8">
    <!--q-card v-if="noPermission" class="q-pa-md" flat bordered square>
      <h6>Your role does not give you access to this tab.</h6>
    </q-card>
    <q-card v-else-if="alreadyAnswered" class="q-pa-md" flat bordered square-->
    <q-card bordered flat square class="fit">
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
              :key="item.qnrid"
              v-close-popup
              clickable
              @click="showHistory(item)"
            >
              <q-item-section>
                <q-item-label
                  >By {{ item.token }}
                  on
                  {{ fullTimestamp(item.lastupdatedt) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-section>
    </q-card>

    <q-dialog v-model="historyDialog">
      <SurveyHistoryDialog
        :title="historyAudit"
        :html="historyHtml"
        :editable="canEdit"
      />
    </q-dialog>
  </div>
</template>

<script>
import Formatting from 'src/lib/formatting'
import {
  getResponseChangesForDB,
  qnrAsHTML
} from 'src/components/SurveyForms/jsfiles/SurveyFormBase'
import SurveyHistoryDialog from 'src/components/SurveyHistoryDialog'
import { externalHTML } from 'src/naep-lib/axiosExternalSurveys'

export default {
  name: 'HistoryOnly',
  components: {
    SurveyHistoryDialog
  },
  props: {
    survey: {
      type: String,
      required: true
    },
    history: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      historyDialog: false,
      historyHtml: null,
      historyAudit: null,
      noPermission: false,
      historyItem: null,
      canEdit: false
    }
  },
  methods: {
    fullTimestamp(dtstr) {
      return Formatting.dateTimeStringFromDbString(dtstr)
    },

    showHistory(key) {
      this.historyItem = key
      this.historyAudit = `By ${
        key.token
      } on ${Formatting.dateTimeStringFromDbString(key.lastupdatedt)} `
      externalHTML(key.qnrid).then(result => {
        this.historyHtml = result
        this.historyDialog = true
      })
    }
  }
}
</script>
