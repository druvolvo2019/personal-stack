<template>
  <q-card>
    <q-item>
      <q-item-section>
        <q-chip
          color="red-10"
          text-color="white"
          size="1.2em"
          :label="title"
        ></q-chip>
      </q-item-section>
      <q-item-section side>
        <q-chip
          color="red-10"
          text-color="white"
          size="1.2em"
          removable
          :label="`#${incidentId}`"
          @remove="$emit('closeIncident')"
        ></q-chip>
      </q-item-section>
    </q-item>
  </q-card>

  <div class="row q-gutter-md q-mt-md">
    <div class="col-4">
      <paginated-list
        :title="data.locationsData?.title"
        :items="data.locationsData?.list"
        :display-only="displayOnly"
        @item-selected="locationSelected"
      >
        <template v-slot:body="props">
          <q-item-label>{{ props.item.displayName }}</q-item-label>
          <q-item-label caption>{{ props.item.caption }}</q-item-label>
        </template>
      </paginated-list>
    </div>
    <div class="col">
      <information-view
        :title="title"
        :items="currentLocation.displayInformation"
      ></information-view>
    </div>
    <div class="col">
      <paginated-list
        :title="$t('contactInformation')"
        :items="currentLocation.contactInformation"
        :display-only="displayOnly"
        @item-selected="contactSelected"
      >
        <template v-slot:body="props">
          <q-item-label>{{ props.item.name }}</q-item-label>
          <q-item-label>{{ props.item.title }}</q-item-label>
          <q-item-label caption>{{ props.item.telephone }}</q-item-label>
          <q-item-label caption>{{ props.item.extension }}</q-item-label>
          <q-item-label caption>{{ props.item.email }}</q-item-label>
        </template>
      </paginated-list>
    </div>
  </div>
  <slot name="action" :context="currentContext">
    <pre>{{ currentContext }}</pre>
  </slot>
</template>

<script>
import { ref, computed } from 'vue'
import PaginatedList from './PaginatedList.vue'
import InformationView from './InformationView.vue'
import LocationActionsWrapper from './LocationActionsWrapper.vue'

export default {
  name: 'IncidentDetailWrapper',
  components: {
    PaginatedList,
    LocationActionsWrapper,
    InformationView,
  },
  props: {
    incidentId: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    overrideTitle: {
      type: String,
      default: undefined,
    },
    displayOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['itemSelected', 'contactSelected', 'closeIncident'],
  setup(props, { emit }) {
    const currentLocation = ref(props.data.locationsData?.list[0] || {})
    const currentContact = ref({})
    if (currentLocation.value.contactInformation?.length > 0) {
      currentContact.value = currentLocation.value.contactInformation[0]
    }

    const locationSelected = (event) => {
      console.log('ItemSelected fired')
      currentLocation.value = event
      emit('itemSelected', currentContext.value)
    }

    const contactSelected = (event) => {
      currentContact.value = event
      emit('contactSelected', currentContext.value)
    }

    const currentContext = computed(() => {
      return {
        incidentId: props.incidentId,
        location: currentLocation.value,
        contact: currentContact.value,
      }
    })

    const title = computed(() => {
      return props.overrideTitle || currentLocation.value.displayName
    })

    return {
      currentLocation,
      locationSelected,
      contactSelected,
      currentContact,
      currentContext,
      title,
    }
  },
}
</script>
