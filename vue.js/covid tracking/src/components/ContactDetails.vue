<template>
  <q-page padding>
    <q-card class="col-3 bg-white-2" bordered flat square>
      <q-card-section>
        <!-- div class="row items-center">
          <div class="col-8 text-h5 ellipsis">
            {{ schoolName }}
          </div>
          <q-space />
        </>
        <div class="row items-center">
          <div class="col-8">
            {{ contactdata }}
          </div>
          <q-space />
          <q-badge > {{ currentdata }} </q-badge>
        </div -->
          <q-badge > {{ currentdata }} </q-badge>
      </q-card-section>
      <q-separator></q-separator>

      <div class="q-pl-md q-pt-md" >
       {{ detailPreface }}
      </div>
      <q-card-section class="doc-container">
        <q-item dense class="bg-grey-2" >
         
        <q-item-section class="cd-toggle cd-left-label">
          <q-item-label>{{ $t('yes-caption') }} </q-item-label>
        </q-item-section>
        <q-item-section avatar class="cd-toggle">
          <q-toggle
            id="qt99"
            size="xl"
            v-model="disabled"
            color="red"
            unchecked-icon="check"
            checked-icon="clear"
            @update:model-value="disabledChanged"
            />
          </q-item-section>
          <q-item-section class="cd-toggle">
            <q-item-label> {{ $t('no-caption') }}</q-item-label>
          </q-item-section>
        </q-item>
     
        <q-item dense class="bg-grey-2" >
          <strong> {{ label }} </strong>
        </q-item>
        <q-item class="bg-grey-2" column items-start>
          <q-input
            outlined filled
            bg-color="white"
            :placeholder="$t('cd-name')"
            :model-value="contactdata.name"
            unmasked-value
            @update:model-value="nameChanged"
            :disable="disabled"
          >
            <template v-slot:prepend>
             <q-icon name="record_voice_over" />
            </template>
          </q-input>
        </q-item>
      </q-card-section>

      <div class="q-pl-md q-pt-md" >
       {{ $t('cd-phone-header') }}
      </div>
      <q-card-section class="doc-container">
        <q-item dense class="bg-grey-2" >
          <strong> {{ label }} </strong>
        </q-item>
        <q-item class="bg-grey-2" column items-start>
          <q-input
            outlined filled
            bg-color="white"
            :placeholder="$t('cd-phone')"
            :v-model="contactdata.phone"
            mask="(###) ### - ####"
            unmasked-value
            @update:model-value="phoneChanged"
            :disable="disabled"
          >
            <template v-slot:prepend>
             <q-icon name="phone" />
            </template>
          </q-input>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <q-input
            outlined filled
            bg-color="white"
            :placeholder="$t('cd-extension')"
            :v-model="contactdata.extension"
            mask="######"
            unmasked-value
            @update:model-value="extensionChanged"
            :disable="disabled"
            />
        </q-item>
      </q-card-section>

      <div class="q-pl-md q-pt-md" >
       {{ $t('cd-email-header') }}
      </div>
      <q-card-section class="doc-container">
        <q-item dense class="bg-grey-2" >
          <strong> {{ label }} </strong>
        </q-item>
        <q-item class="bg-grey-2" column items-start>
          <q-input
            outlined filled
            bg-color="white"
            :placeholder="$t('cd-email')"
            :model-value="contactdata.email"
            unmasked-value
            @update:model-value="emailChanged"
            :disable="disabled"
          />
        </q-item>
      </q-card-section>

      <div class="q-pl-md q-pt-md" >
       {{ $t('cd-title-header') }}
      </div>
      <q-card-section class="doc-container">
        <q-item dense class="bg-grey-2" >
          <strong> {{ label }} </strong>
        </q-item>
        <q-item class="bg-grey-2" column items-start>
          <q-input
            outlined filled
            bg-color="white"
            :placeholder="$t('cd-title')"
            :model-value="contactdata.title"
            unmasked-value
            @update:model-value="titleChanged"
            :disable="disabled"
          />
        </q-item>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import {ref, computed} from 'vue'

export default {
  name: "ContactDetails",

  props: {
    detailPreface: {
      type: String,
      default: 'Contact Details'
    },
    label: {
      type: String,
      default: 'District Contact',
    },
    contactdata: {
      type: Object,
      required: true,
    },
  },
  methods: {
    nameChanged(data) {
//      console.log('nameChanged', data, this.model.name)
      this.model.name = data
    },
    phoneChanged(data) {
//      console.log('phoneChanged', data)
      this.model.phone = data
    },
    extensionChanged(data) {
//      console.log('extensionChanged', data)
      this.model.phoneext = data
    },
    emailChanged(data) {
//      console.log('emailChanged:', data)
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)   
      let promise = regex.test(data) // /^.{0,3}$/.test(val)
      
//      console.log('emailChanged to ', data, promise)
      if (promise || data.length <= 0) this.model.email = data 
    },
    titleChanged(data) {
//      console.log('titleChanged', data)
      this.model.title = data
    },
    disabledChanged(value, evt) {
//      console.log('disabledChanged', value, evt)
    }
  },

  setup (props) {
    let model = ref(props.contactdata)
  
    return {
      model,
      disabled: ref(true)

    }

  },

  computed: {
    currentdata() {
      return this.model
    }
  },

};
</script>

<style scoped>

.cd-toggle {
  height: 42px;
  max-width: 95px;
}

.cd-left-label {
  margin-left: 0;
  margin-right: 0;
  max-width: 10px;
}

</style>
