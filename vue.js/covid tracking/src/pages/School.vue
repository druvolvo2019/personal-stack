<template>
  <q-page padding>
    <div v-if="emailError">{{ emailError }}</div>
    <div v-if="incidentDetails.error">
      <q-card class="bg-red-6 text-white">
        <q-card-section
          clickable
          @click="onCloseIncident"
          style="cursor: pointer"
          >Error: {{ incidentDetails.error }}</q-card-section
        ><q-tooltip>Click to return to home page</q-tooltip>
      </q-card>
    </div>
    <div v-else>
      <school-container
        v-if="!loading && !contactLoadLng"
        :incident-id="getIncidentContact.cifreferenceid"
        :data="incidentDetails"
        :phone-templates="phoneTemplates"
        :email-templates="emailTemplates"
        :contactHistory="contactLog"
        @close-incident="onCloseIncident"
        @call-handled="onCallHandled"
        @send-email="onSendEmail"
        @close-contact="onCloseContact"
        @item-selected="onLocationSelected"
      ></school-container>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { transformIncidentDetail } from '../lib/data-transformers'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useQuasar, Loading } from 'quasar'
import { useRouter } from 'vue-router'
import gql from 'graphql-tag'
import SchoolContainer from 'components/incident-detail/SchoolContainer.vue'
import {
  useCallHandled,
  useSendEmailMutation,
  useCloseContactMutation,
} from '../lib/mutation-managers'
import { transformationManager } from 'src/lib/transformation-vue-managers'
const { useGetters } = createNamespacedHelpers('appsession')
const { useGetters: useAuthGetters } = createNamespacedHelpers('auth')

export default {
  name: 'School',
  components: {
    SchoolContainer,
  },
  setup() {
    const currentLocation = ref({})
    const graphQLContext = {
      clientName: 'remote',
    }
    const $q = useQuasar()
    const { getIncidentId, getIncidentContact } = useGetters([
      'getIncidentId',
      'getIncidentContact',
    ])
    const { getUser } = useAuthGetters(['getUser'])

    const {
      loading: contactLoadLng,
      result: contactLogResult,
      refetch: refetchContactLog,
    } = useQuery(
      gql`
        query GetContactLog(
          $locationKind: CallHandledLocationKind!
          $id: String!
        ) {
          GetContactLog: getContactLog(locationKind: $locationKind, id: $id) {
            status
            success
            errorMessage
            data {
              cifreferenceid
              contactlogtypedesc
              createdDate
              createdTime
              createddt
              fldcontactcodedesc
              fldcontactid
              fldcontactlogid
              fldincidentid
              updateduesrname
            }
          }
        }
      `,
      () => {
        console.log('RESULT=', getIncidentContact.value.incidentSchools)
        return {
          id: currentLocation.value.location?.id,
          locationKind: 'SCHOOL',
        }
      },
      () => {
        return {
          enabled: currentLocation.value.location?.id !== void 0,
        }
      }
    )

    const { loading, result: incidentDetailsResult } = useQuery(
      gql`
        query GetIncidentDetailsLocal($input: IncidentDetailsFilterInput!) {
          GetIncidentDetails: getIncidentDetails(input: $input) {
            errorMessage
            status
            success
            data {
              fldincidentid
              schools {
                id
                name
                districtName
                jurisdiction
                startEndTimes
                assessmentDates
                makeupDates
                hasBeenNotified
                contacts {
                  fldcontactid
                  contactType
                  fldcontactdesc
                  fldname
                  fldphone
                  fldemail
                  phoneScript
                  voicemailScript
                  emailScript
                  noCallsCompletedScript
                }
              }
            }
          }
        }
      `,
      () => {
        return {
          input: {
            fldincidentid: getIncidentId.value,
          },
        }
      },
      {
        context: graphQLContext,
      }
    )

    const incidentDetailsResponse = useResult(incidentDetailsResult, {
      uninitialized: true,
    })
    const incidentDetails = computed(() => {
      return transformationManager(incidentDetailsResponse.value, () =>
        transformIncidentDetail(incidentDetailsResponse.value.data[0])
      )
    })

    const { callHandledDone, onCallHandled } = useCallHandled(
      getUser.value.userid,
      'SCHOOL',
      $q,
      graphQLContext,
      ['GetIncidentDetailsLocal', 'GetContactLog']
    )

    const router = useRouter()
    const { onSendEmail, onSendEmailDone, emailError } = useSendEmailMutation(
      getUser.value.userid,
      'SCHOOL',
      $q,
      router,
      graphQLContext,
      ['GetIncidentDetailsLocal', 'GetContactLog']
    )

    const { onCloseContact, closeContactDone } = useCloseContactMutation(
      getUser.value.userid,
      'SCHOOL',
      $q,
      graphQLContext,
      ['GetIncidentDetailsLocal', 'GetContactLog']
    )

    function onCloseIncident() {
      Loading.show()
      $q.notify({
        type: 'positive',
        message: 'Returning to home page',
      })
      router.push('/')
    }

    const contactLogMain = useResult(contactLogResult, { data: [] })

    const contactLog = computed(() => {
      return contactLogMain.value.data
    })

    const onLocationSelected = (location) => {
      console.log({ location })
      currentLocation.value = location
      refetchContactLog()
    }

    return {
      loading,
      contactLogResult,
      contactLoadLng,
      getIncidentId,
      getIncidentContact,
      incidentDetailsResponse,
      incidentDetails,
      onCloseIncident,
      onCallHandled,
      onSendEmail,
      onCloseContact,
      onLocationSelected,
      currentLocation,
      emailError,
      contactLog,
      phoneTemplates: [
        {
          id: 1,
          primaryType: 'SCHOOL_COORDINATOR',
          tabDisplayText: 'Phone',
          display: 'match',
          scriptType: 'phoneScript',
        },
        {
          id: 2,
          primaryType: 'SCHOOL_PRINCIPAL',
          tabDisplayText: 'Phone',
          display: 'match',
          scriptType: 'phoneScript',
        },
        {
          id: 3,
          primaryType: 'SCHOOL_COORDINATOR',
          tabDisplayText: 'Voice Mail',
          display: 'match',
          scriptType: 'voicemailScript',
        },
        {
          id: 4,
          primaryType: 'SCHOOL_PRINCIPAL',
          tabDisplayText: 'Voice Mail',
          display: 'match',
          scriptType: 'voicemailScript',
        },
      ],
      emailTemplates: [
        {
          id: 1,
          primaryType: 'SCHOOL_COORDINATOR',
          tabDisplayText: 'School Coordinator Call Recap',
          display: 'match',
          scriptType: 'emailScript',
        },
        {
          id: 2,
          primaryType: 'SCHOOL_PRINCIPAL',
          tabDisplayText: 'Principal Call Recap',
          display: 'match',
          scriptType: 'emailScript',
        },
        {
          id: 3,
          primaryType: 'SCHOOL_COORDINATOR',
          tabDisplayText: 'No Calls Completed',
          display: 'any',
          scriptType: 'noCallsCompletedScript',
        },
      ],
    }
  },
}
</script>

<style></style>
