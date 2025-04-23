<template>
  <q-page padding>
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
      <district-container
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
      ></district-container>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { transformIncidentDistrict } from '../lib/data-transformers'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useQuasar, Loading } from 'quasar'
import { useRouter } from 'vue-router'
import gql from 'graphql-tag'
import DistrictContainer from 'components/incident-detail/DistrictContainer.vue'
import {
  useCallHandled,
  useSendEmailMutation,
  useCloseContactMutation,
} from '../lib/mutation-managers'
import { transformationManager } from 'src/lib/transformation-vue-managers'
const { useGetters } = createNamespacedHelpers('appsession')
const { useGetters: useAuthGetters } = createNamespacedHelpers('auth')

export default {
  name: 'District',
  components: {
    DistrictContainer,
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
        console.log('RESULT=', currentLocation.value.location?.id)
        return {
          id: currentLocation.value.location?.id,
          locationKind: 'DISTRICT',
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
              districts {
                id
                name
                tudaDistrictFlag
                jurisdiction
                schoolcount
                incidentcount
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
        transformIncidentDistrict(incidentDetailsResponse.value.data[0])
      )
    })

    const { callHandledDone, onCallHandled } = useCallHandled(
      getUser.value.userid,
      'DISTRICT',
      $q,
      graphQLContext,
      ['GetIncidentDetailsLocal']
    )

    const router = useRouter()
    const { onSendEmail } = useSendEmailMutation(
      getUser.value.userid,
      'DISTRICT',
      $q,
      router,
      graphQLContext,
      ['GetIncidentDetailsLocal']
    )

    const { onCloseContact } = useCloseContactMutation(
      getUser.value.userid,
      'DISTRICT',
      $q,
      graphQLContext,
      ['GetIncidentDetailsLocal']
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
      getIncidentId,
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
      contactLog,
      phoneTemplates: [
        {
          id: 1,
          primaryType: 'DISTRICT_TEST_COORDINATOR',
          tabDisplayText: 'Phone',
          display: 'match',
          scriptType: 'phoneScript',
        },
        {
          id: 2,
          primaryType: 'DISTRICT_SUPERINTENDENT',
          tabDisplayText: 'Phone',
          display: 'match',
          scriptType: 'phoneScript',
        },
        {
          id: 3,
          primaryType: 'DISTRICT_TEST_COORDINATOR',
          tabDisplayText: 'Voice Mail',
          display: 'any',
          scriptType: 'voicemailScript',
        },
      ],
      emailTemplates: [
        {
          id: 1,
          primaryType: 'DISTRICT_TEST_COORDINATOR',
          tabDisplayText: 'District Call Recap',
          display: 'match',
          scriptType: 'emailScript',
        },
        {
          id: 2,
          primaryType: 'DISTRICT_SUPERINTENDENT',
          tabDisplayText: 'District Call Recap',
          display: 'match',
          scriptType: 'emailScript',
        },
        {
          id: 3,
          primaryType: 'DISTRICT_TEST_COORDINATOR',
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
