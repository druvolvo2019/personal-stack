<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">
        Non-Disclosure Agreements
      </div>
      <q-card-section v-if="renderComponent">
        <q-list bordered separator>
          <div v-if="agreementsList.length === 0" class="q-pa-sm text-center">
            <q-icon name="las la-inbox" size="4rem" color="grey-5" />
            <!-- <q-img src="noData.svg" width="8rem" /> -->
            <div class="text-caption">No Agreements</div>
          </div>

          <agreement-item
            v-for="item in agreementsList"
            :key="item.ndaId"
            :item="item"
            @delete="deleteNDA"
            @select="selectNDA"
          ></agreement-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-actions class="q-pa-md">
        <q-btn
          outline
          color="primary"
          label="Add Agreement"
          @click="initalNDA()"
        />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="agreementDialog" size="large">
      <non-disclosure-agreement-dialog
        :state="state"
        :agreement="myagreement"
        :grade-id="gradeId"
        @add-NDA="addNDA"
        @update-NDA="updateNDA"
      />
    </q-dialog>
  </div>
</template>

<script>
import AgreementItem from 'src/components/NonDisclosureAgreements/AgreementItem'

export default {
  components: {
    AgreementItem,
    'non-disclosure-agreement-dialog': require('components/NonDisclosureAgreementDialog.vue')
      .default
  },

  props: {
    agreements: {
      type: Array,
      required: true
    },

    visitid: {
      type: String,
      default: ''
    },

    state: {
      type: String,
      default: ''
    },
    
    gradeId: {
      type: String,
      default: ''
    },
    
  },
  

  data() {
    return {
      agreementDialog: false.Array,
      myagreement: {
        id: this.visitid,
        name: '',
        email: '',
        ndaId: ''
      },
      renderComponent: true,
      listChangeAction: '',

      newnda: {
        id: null,
        name: null,
        email: null,
        ndaId: null,
        oldndaId: null
      },
      workingList: []
    }
  },

  computed: {
    agreementsList() {
      // Check if we need to delete element the list
      if (
        this.listChangeAction === 'delete-NDA' ||
        this.listChangeAction === 'update-NDA'
      ) {
        this.workingList.forEach(element => {
          if (element.ndaId === this.newnda.ndaId) {
            const index = this.workingList.indexOf(element)
            this.workingList.splice(index, 1)
          }
        })

        return this.workingList.map(x => x)
      } else if (this.listChangeAction === 'add-NDA') {
        // Check if we need to add element the list
        return this.workingList.map(x => x)
      } else {
        // If not, return the plain list passed in
        return this.agreements
      }
    }
  },

  methods: {
    async saveNDA(nda) {
      const variables = {
        input: nda
      }
      await this.$naepDataSource.runUpdateNDA(variables)
    },

    async addNDA(nda) {
      this.workingList = this.agreementsList.map(x => x)
      this.workingList.push(nda)
      this.listChangeAction = 'add-NDA'
      await this.saveNDA(nda)
    },

    async updateNDA(nda) {
      this.workingList = this.agreementsList.map(x => x)
      this.workingList.push(nda)
      this.newnda.ndaId = nda.oldndaId
      this.listChangeAction = 'update-NDA'
      await this.saveNDA(nda)
    },

    async deleteNDA(ndaId) {
      this.newnda.ndaId = ndaId
      this.workingList = this.agreementsList.map(x => x)
      this.listChangeAction = 'delete-NDA'
      await this.saveNDA(this.newnda)
    },

    selectNDA(agreement) {
      this.agreementDialog = true
      this.myagreement.name = agreement.name
      this.myagreement.email = agreement.email
      this.myagreement.ndaId = agreement.ndaId
    },

    initalNDA() {
      this.agreementDialog = true
      this.myagreement.name = null
      this.myagreement.email = null
      this.myagreement.ndaId = null
    }
  }
}
</script>
