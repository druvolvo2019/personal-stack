<template>
  <q-card style="width: 700px; max-width: 160vw">
    <q-card-section>
      <q-markdown :src="markdownNDA" />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <q-input
          v-model="name"
          filled
          :maxlength="max"
          :label="nameLabel"
          :error-message="nameError"
          :error="!isValidName"
          @change="onChangeN()"
        />
        <q-input
          v-model="email"
          filled
          :maxlength="max"
          :label="emailLabel"
          type="email"
          :error-message="emailError"
          :error="!isValidEmail"
          @change="onChangeE()"
        />

        <q-toggle v-model="accept" :label="acceptLabel" />
        <div>
          <q-btn :label="submitbtnLabel" type="submit" color="primary" />
          <q-btn
            ref="btnClose"
            v-close-popup
            :label="closebtnLabel"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            :label="resetbtnLabel"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import i18n from '../boot/i18n.js'
import { uid } from 'quasar'
export default {
  props: {
    agreement: {
      type: Object,
      default() {
        return {}
      }
    },

    state: {
      type: String,
      default: ''
    },
    
    gradeId:{
      type: String,
      default: ''
    },
  },

  data() {
    return {
      markdownNDA: '',
      accept: false,
      name: null,
      email: null,
      id: null,
      ndaId: null,
      oldndaId: null,
      max: 50,
      isValidN: true,
      isValidE: true,
      fipsCode: this.agreement.id.substring(0, 2),
      emailError: '',
      nameError: '',
      acknowledgmentError: '',
      nameLabel: '',
      emailLabel: '',
      acceptLabel: '',
      submitbtnLabel: '',
      closebtnLabel: '',
      resetbtnLabel: '',
      updatebtnLabel: '',
      submitMessage: ''
    }
  },

  computed: {
    isValidName() {
      if (!this.isValidN && !this.name) {
        return false
      } else {
        return true
      }
    },

    isValidEmail() {
      if (!this.isValidE && !this.email) {
        return false
      } else {
        return true
      }
    }
  },

  mounted() {
    this.ndaId = uid()
    
    let fips = this.gradeId.substring(0, 2)

    if (this.state.toUpperCase() === 'PR' && fips === '72') {
      this.$i18n.locale = 'es'
    } else {
      this.$i18n.locale = 'en-us'
    }
    
    //console.log('gradeId=' + this.gradeId)
    //console.log('state=' + this.state)
    //console.log('fips=' + fips)

    this.emailError = this.$t('emailError')
    this.nameError = this.$t('nameError')
    this.acknowledgmentError = this.$t('acknowledgmentError')
    this.nameLabel = this.$t('nameLabel')
    this.emailLabel = this.$t('emailLabel')
    this.acceptLabel = this.$t('acceptLabel')
    this.submitbtnLabel = this.$t('submitbtnLabel')
    this.closebtnLabel = this.$t('closebtnLabel')
    this.resetbtnLabel = this.$t('resetbtnLabel')
    this.updatebtnLabel = this.$t('updatebtnLabel')
    this.submitMessage = this.$t('submitMessage')
    this.markdownNDA = this.$t('markdownNDA')

    if (
      (!this.agreement.name || this.agreement.name == undefined) &&
      (!this.agreement.email || this.agreement.email == undefined)
    ) {
      this.accept = false
      this.id = this.agreement.id
      this.name = null
      this.email = null
      this.oldndaId = null
      this.disable = false
    } else {
      this.accept = true
      this.id = this.agreement.id
      this.name = this.agreement.name
      this.email = this.agreement.email
      this.oldndaId = this.agreement.ndaId
      this.disable = true
      this.submitbtnLabel = this.updatebtnLabel
    }
  },

  methods: {
    addNDA(id, name, email, ndaId, oldndaId) {
      const nda = {
        id: id,
        name: name,
        email: email,
        ndaId: ndaId,
        oldndaId: oldndaId
      }
      if (this.submitbtnLabel === this.updatebtnLabel) {
        this.$emit('update-NDA', nda)
      } else {
        this.$emit('add-NDA', nda)
      }

      //this.$router.go(this.$router.currentRoute)
    },

    onChangeN() {
      if (!this.name) {
        this.isValidN = false
      } else {
        this.isValidN = true
      }
    },

    onChangeE() {
      if (!this.email) {
        this.isValidE = false
      } else {
        this.isValidE = true
      }
    },

    onSubmit(e) {
      if (this.name && this.email && this.accept) {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.submitMessage
        })

        this.addNDA(this.id, this.name, this.email, this.ndaId, this.oldndaId)

        this.$refs.btnClose.$el.click()
      } else {
        if (!this.name) {
          this.isValidN = false
        }

        if (!this.email) {
          this.isValidE = false
        }

        if (this.accept !== true) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: this.acknowledgmentError
          })
        }
      }
    },

    onReset() {
      this.name = null
      this.email = null
      this.accept = false
    }
  }
}
</script>
