<template>
  <q-item>
    <q-item-section side>
      <q-icon :name="icon" :color="iconColor" size="1.5rem" />
    </q-item-section>
    <slot name="before"></slot>
    <q-item-section>
      <q-item-label class="displayName">
        {{ displayName }}
      </q-item-label>
      <q-item-label v-if="displayTheCaption" caption>
        {{ displayCaption }}
      </q-item-label>
      <!-- eslint-disable vue/no-v-html -->
      <q-item-label name="barcodeTitle" caption v-html="barcodeTitle">
      </q-item-label>
    </q-item-section>
    <template v-if="!showBarcodeEdit">
      <q-item-section side>
        <action-btn
          action-type="delete"
          :message="displayName"
          @click="personDeleted"
        />
      </q-item-section>
      <q-item-section side>
        <action-btn
          action-type="edit"
          :message="displayName"
          @click="showEditTeacherDialog = true"
        />
      </q-item-section>
      <q-dialog v-model="showEditTeacherDialog" size="medium">
        <edit-teacher-dialog
          :is-add="false"
          :teacher-fn="() => extendedPerson"
          :subjects="subjects"
        />
      </q-dialog>
    </template>
    <template v-else>
      <q-item-section v-if="!teamReadOnly" side>
        <action-btn
          action-type="barcode"
          :message="displayName"
          @click="showBarcodeEditDialog = true"
        />
      </q-item-section>
      <q-dialog v-model="showBarcodeEditDialog" size="small">
        <select-barcode-dialog
          v-model="extendedPerson.barcode"
          :person="extendedPerson"
        />
      </q-dialog>
      
    </template>
  </q-item>
</template>

<script>
import personStatusBarcodeTitle from '../../../lib/personStatusBarcodeTitle'

const statusMapping = {
  completedOnline: {
    name: 'las la-check-circle',
    color: 'positive',
  },
  hasBarcode: {
    name: 'las la-check-circle',
    color: 'positive',
  },
  hasBarcodeAdd: {
    name: 'las la-plus-circle',
    color: 'success',
  },
  needsBarcode: {
    name: 'las la-exclamation-circle',
    color: 'negative',
  },
  error: {
    name: 'las la-skull-crossbones',
    color: 'negative',
  },
  noId: {
    name: 'las la-skull-crossbones',
    color: 'negative',
  },
}

export default {
  name: 'PersonStatus',
  components: {
    'edit-teacher-dialog': require('../dialogs/AddEditTeacherDialog.vue')
      .default,
    'select-barcode-dialog': require('../dialogs/SelectBarcodeDialog.vue')
      .default,
    'action-btn': require('src/components/shared/ActionBtn.vue').default,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    displayTheCaption: {
      type: Boolean,
      default: false,
    },
    personAdapter: {
      type: Function,
      default: p => p,
    },
    subjects: {
      type: Array,
      required: true,
    },
    
    teamReadOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showEditTeacherDialog: false,
      showBarcodeEditDialog: false,
      extendedPerson: this.personAdapter(this.person),
    }
  },
  computed: {
    displayName() {
      return this.extendedPerson.displayName
    },
    displayCaption() {
      return this.extendedPerson.caption
    },
    icon() {
      return statusMapping[this.computedStatus].name
    },
    iconColor() {
      return statusMapping[this.computedStatus].color
    },
    computedStatus() {
      return this.extendedPerson.computedStatus()
    },
    barcodeTitle() {
      return personStatusBarcodeTitle(this.extendedPerson)
    },
    showBarcodeEdit() {
      var readOnly = this.teamReadOnly
      if ( readOnly  === false) {
         readOnly = this.extendedPerson.isPrincipal
      } 
      return readOnly 
    },
  },
  mounted() {
    this.extendedPerson = this.personAdapter(this.person)
  },
  methods: {
    personDeleted() {
      this.$q
        .dialog({
          title: `Delete ${this.extendedPerson.displayName}`,
          message: `Would you like to delete ${this.extendedPerson.firstName} ${this.extendedPerson.lastName}`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.extendedPerson.delete()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.text-dark-red {
  color: #bf0d00;
}
</style>
