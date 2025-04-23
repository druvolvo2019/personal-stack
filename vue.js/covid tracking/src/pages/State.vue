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
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <state-container
        v-if="!loading && !contactLoadLng"
        override-title="State Contact"
        :incident-id="getIncidentContact.cifreferenceid"
        :data="incidentDetails"
        :email-templates="emailTemplates"
        :contactHistory="contactLog"
        @close-incident="onCloseIncident"
        @send-email="onSendEmail"
        @close-contact="onCloseContact"
        @item-selected="onLocationSelected"
      ></state-container>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { transformIncidentState } from '../lib/data-transformers'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useQuasar, Loading } from 'quasar'
import { useRouter } from 'vue-router'
import gql from 'graphql-tag'
import StateContainer from 'components/incident-detail/StateContainer.vue'
import {
  useSendEmailMutation,
  useCloseContactMutation,
} from '../lib/mutation-managers'
import { transformationManager } from 'src/lib/transformation-vue-managers'

const { useGetters } = createNamespacedHelpers('appsession')
const { useGetters: useAuthGetters } = createNamespacedHelpers('auth')

export default {
  name: 'State',
  components: {
    StateContainer,
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
          locationKind: 'STATE',
        }
      },
      () => {
        return {
          enabled: currentLocation.value.location?.id !== void 0,
        }
      }
    )

    const {
      loading,
      result: stateDetails,
      error,
    } = useQuery(
      gql`
        query GetIncidentDetailsLocal($input: IncidentDetailsFilterInput!) {
          GetIncidentDetails: getIncidentDetails(input: $input) {
            errorMessage
            status
            success
            data {
              fldincidentid
              states {
                id
                fips
                name
                isContactRequired
                schoolCount
                incidentCount
                hasBeenNotified
                contacts {
                  fldcontactid
                  contactType
                  fldcontactdesc
                  fldname
                  fldphone
                  fldemail
                  emailScript
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

    const stateDetailsResponse = useResult(stateDetails, {
      uninitialized: true,
    })

    const incidentDetails = computed(() => {
      return transformationManager(stateDetailsResponse.value, () =>
        transformIncidentState(stateDetailsResponse.value.data[0])
      )
    })

    const router = useRouter()
    const { onSendEmail } = useSendEmailMutation(
      getUser.value.userid,
      'STATE',
      $q,
      router,
      graphQLContext
    )

    const { onCloseContact } = useCloseContactMutation(
      getUser.value.userid,
      'STATE',
      $q,
      graphQLContext
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
      contactLoadLng,
      getIncidentContact,
      stateDetailsResponse,
      incidentDetails,
      onCloseIncident,
      onSendEmail,
      onCloseContact,
      onLocationSelected,
      error,
      currentLocation,
      contactLog,
      emailTemplates: [
        {
          id: 1,
          primaryType: 'STATE_NSC',
          tabDisplayText: 'Incident Recap',
          display: 'match',
          scriptType: 'emailScript',
        },
      ],
    }
  },
}
</script>

<style></style>
