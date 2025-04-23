<template>
  <div>
    <q-list dense>
      <q-item>
        <q-item-section>
          <q-item-label
            class="text-h6"
            v-if="
              incidentContact.fldcifsubmissiontypetext == 'Active Positives'
            "
            >{{ incidentTitle }}</q-item-label
          >
          <q-item-label
            class="text-h6"
            v-if="
              incidentContact.fldcifsubmissiontypetext != 'Active Positives'
            "
            >{{ title2 }}</q-item-label
          >
        </q-item-section>
      </q-item>

      <div v-for="contact in contacts" :key="contact.contactType">
        <div v-if="contact.visible">
          <q-item>
            <q-item-section side style="min-width: 30px">
              <q-icon
                :name="contact.icon"
                :color="contact.color"
                size="1.5rem"
              />
            </q-item-section>
            <q-item-section style="min-width: 100px">
              <q-item-label
                >{{ contact.contactType }}
                {{ contact.contactCount }}</q-item-label
              >
              <q-item-label caption
                >{{ contact.contactUser }} {{ contact.contactDt }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>

      <div
        v-if="incidentContact.fldcifsubmissiontypetext != 'Active Positives'"
      >
        <q-item>
          <q-item-section side style="min-width: 30px">
            <q-icon name="summarize" color="black" size="1.5rem" />
          </q-item-section>
          <q-item-section style="min-width: 100px">
            <q-item-label>Form Summary</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script>
import iconMap from '../lib/icon-maps.js'

import { toRefs, ref, onMounted } from 'vue'

export default {
  name: 'IncidentContactTypes',
  props: {
    myIncidentContact: {
      type: Object,
      required: true,
    },
    myIncidentTitle: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const incidentContact = ref(props.myIncidentContact)
    const incidentTitle = ref(props.myIncidentTitle)

    return {
      incidentContact,
      incidentTitle,
      iconMap,
    }
  },

  data() {
    return {
      visible: false,
      title2: 'Details',
      contacts: [
        {
          contactType: 'NCES Initial Contact',
          icon: '',
          color: '',
          contactUser: '',
          contactDt: '',
          contactCount: '',
          visible: true,
        },
        {
          contactType: 'School Contacts',
          icon: '',
          color: '',
          contactUser: '',
          contactDt: '',
          contactCount: '',
          visible: true,
        },
        {
          contactType: 'District Contacts',
          icon: '',
          color: '',
          contactUser: '',
          contactDt: '',
          contactCount: '',
          visible: true,
        },

        {
          contactType: 'State Contacts',
          icon: '',
          color: '',
          contactUser: '',
          contactDt: '',
          contactCount: '',
          visible: true,
        },

        {
          contactType: 'NCES Final Contact',
          icon: '',
          color: '',
          contactUser: '',
          contactDt: '',
          contactCount: '',
          visible: true,
        },
      ],
    }
  },

  mounted() {
    this.setData()
  },

  methods: {
    setData() {
      this.contacts.forEach((contact) => {
        switch (contact.contactType) {
          case 'NCES Initial Contact':
            contact.color = this.iconMap(
              this.incidentContact.ncesinitcontactstatus
            ).color
            contact.icon = this.iconMap(
              this.incidentContact.ncesinitcontactstatus
            ).icon
            contact.contactUser = this.incidentContact.ncesinitcontactuser
            contact.contactDt = this.incidentContact.ncesinitconctactdt
            contact.contactCount = ''
            contact.visible = true

            if (
              this.incidentContact.fldcifsubmissiontypetext !=
              'Active Positives'
            ) {
              contact.visible = false
            }

            break
          case 'School Contacts':
            contact.color = this.iconMap(
              this.incidentContact.schoolcontactstatus
            ).color
            contact.icon = this.iconMap(
              this.incidentContact.schoolcontactstatus
            ).icon
            contact.contactUser = this.incidentContact.schoolcontactuser
            contact.contactDt = this.incidentContact.schoolcontactdt
            contact.contactCount =
              '(' + this.getCount(this.incidentContact.schoolcontactcount) + ')'
            contact.visible = this.getVisible(
              this.incidentContact.schoolcontactcount
            )

            //set NCES Initial Contact to visible false
            if (contact.visible == false) {
              this.contacts[0].visible = false
            }

            if (
              this.incidentContact.fldcifsubmissiontypetext !=
              'Active Positives'
            ) {
              contact.visible = false
            }
            break
          case 'District Contacts':
            contact.color = this.iconMap(
              this.incidentContact.districtcontactstatus
            ).color
            contact.icon = this.iconMap(
              this.incidentContact.districtcontactstatus
            ).icon
            contact.contactUser = this.incidentContact.districtcontactuser
            contact.contactDt = this.incidentContact.districtcontactdt
            contact.contactCount =
              '(' +
              this.getCount(this.incidentContact.districtcontactcount) +
              ')'
            contact.visible = this.getVisible(
              this.incidentContact.schoolcontactcount
            )
            if (
              this.incidentContact.fldcifsubmissiontypetext !=
              'Active Positives'
            ) {
              contact.visible = false
            }
            break
          case 'State Contacts':
            contact.color = this.iconMap(
              this.incidentContact.statecontactstatus
            ).color
            contact.icon = this.iconMap(
              this.incidentContact.statecontactstatus
            ).icon
            contact.contactUser = this.incidentContact.statecontactuser
            contact.contactDt = this.incidentContact.statecontactdt
            contact.contactCount =
              '(' + this.getCount(this.incidentContact.statecontactcount) + ')'
            contact.visible = this.getVisible(
              this.incidentContact.schoolcontactcount
            )
            if (
              this.incidentContact.fldcifsubmissiontypetext !=
              'Active Positives'
            ) {
              contact.visible = false
            }
            break
          case 'NCES Final Contact':
            contact.color = this.iconMap(
              this.incidentContact.ncesfinalcontactstatus
            ).color
            contact.icon = this.iconMap(
              this.incidentContact.ncesfinalcontactstatus
            ).icon
            contact.contactUser = this.incidentContact.ncesinitcontactuser
            contact.contactDt = this.incidentContact.ncesfinalcontactdt
            contact.contactCount = ''
            contact.visible = true
            if (
              this.incidentContact.fldcifsubmissiontypetext !=
              'Active Positives'
            ) {
              contact.visible = false
            }
            break
        }
      })
    },

    getVisible(value) {
      var ret = false
      if (Object.is(value, null)) {
        ret = false
      } else {
        ret = true
      }

      return ret
    },

    getCount(value) {
      var ret = ''
      if (Object.is(value, null)) {
        ret = '0'
      } else {
        ret = value
      }

      return ret
    },
  },
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>
