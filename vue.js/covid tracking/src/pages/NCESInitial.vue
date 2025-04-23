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
      <NCESContainer
        v-if="!loading"
        override-title="NCES Initial Contact"
        :incident-id="getIncidentContact.cifreferenceid"
        :data="incidentDetails"
        :email-templates="emailTemplates"
        :contactHistory="contactLog"
        @close-incident="onCloseIncident"
        @send-email="onSendEmail"
        @close-contact="onCloseContact"
        @item-selected="onLocationSelected"
      ></NCESContainer>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { transformInitialNCES } from '../lib/data-transformers'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useQuasar, Loading } from 'quasar'
import { useRouter } from 'vue-router'
import gql from 'graphql-tag'
import NCESContainer from 'components/incident-detail/NCESContainer.vue'
import {
  useSendEmailMutation,
  useCloseContactMutation,
} from '../lib/mutation-managers'
import { transformationManager } from 'src/lib/transformation-vue-managers'

const { useGetters } = createNamespacedHelpers('appsession')
const { useGetters: useAuthGetters } = createNamespacedHelpers('auth')

export default {
  name: 'NCESInitial',
  components: {
    NCESContainer,
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

    const {
      loading,
      result: ncesDetails,
      error,
    } = useQuery(
      gql`
        query GetNCESDetails($incidentId: ID!, $kind: NCESContactKind!) {
          getNCESDetails(incidentId: $incidentId, kind: $kind) {
            initialContact
            finalContact
            states {
              name
              fips
              contactStatus
            }
            contacts {
              fldcontactid
              contactType
              fldname
              fldphone
              fldemail
              emailScript
              fldcontactdesc
            }
          }
        }
      `,
      () => {
        return {
          incidentId: getIncidentId.value,
          kind: 'INITIAL',
        }
      },
      {
        context: graphQLContext,
      }
    )

    const ncesDetailsResponse = useResult(ncesDetails, { uninitialized: true })
    const incidentDetails = computed(() => {
      return transformationManager(
        ncesDetailsResponse.value,
        transformInitialNCES,
        {
          postProcessing: (sampleData) => {
            sampleData.isComplete = sampleData.initialContact !== null
          },
        }
      )
    })

    const router = useRouter()
    const { onSendEmail } = useSendEmailMutation(
      getUser.value.userid,
      'NCESINIT',
      $q,
      router,
      graphQLContext
    )

    const { onCloseContact } = useCloseContactMutation(
      getUser.value.userid,
      'NCESINIT',
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
      getIncidentContact,
      ncesDetailsResponse,
      incidentDetails,
      onCloseIncident,
      onSendEmail,
      onCloseContact,
      onLocationSelected,
      currentLocation,
      error,
      contactLog,
      emailTemplates: [
        {
          id: 1,
          primaryType: 'NCES_CONTACT',
          tabDisplayText: 'NCES Initial Contact',
          display: 'any',
          scriptType: 'emailScript',
        },
      ],
    }
  },
}
</script>

<style></style>
