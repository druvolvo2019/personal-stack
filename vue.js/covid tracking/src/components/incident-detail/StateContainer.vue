<template>
  <incident-detail-wrapper
    :incidentId="incidentId"
    :data="data"
    @contact-selected="onContactSelected"
    @item-selected="onLocationSelected"
    v-bind="$attrs"
  >
    <template v-slot:action="props">
      <div class="row q-gutter-md q-mt-xs">
        <div class="col-4">
          <contact-history :contactHistory="contactHistory"></contact-history>
        </div>

        <div class="col">
          <div v-if="!contactCompleted">
            <template-container
              v-bind="$attrs"
              :incident-id="props.context.incidentId"
              title="Email"
              :templates="emailTemplates"
              :contacts="props.context.location.contactInformation"
              :currentContact="props.context.contact"
              @context-changed="onContextChanged"
            ></template-container>
          </div>
          <CloseContactToggle
            :contactCompleted="contactCompleted"
            @contactCompletedToggle="onUserSelectContactCompleted"
          ></CloseContactToggle>
        </div>
        
      </div>
    </template>
  </incident-detail-wrapper>
</template>

<script>
import { ref, computed } from 'vue'
import IncidentDetailWrapper from './IncidentDetailWrapper.vue'
import TemplateContainer from './TemplateContainer.vue'
import ContactHistory from './ContactHistory.vue'
import CloseContactToggle from './TemplateContainerComponents/CloseContactToggle.vue'
import {
  closeContactCompleted,
  shouldShowContactCompleted,
} from '../../lib/close-contact-manager'

export default {
  name: 'StateContainer',
  components: {
    IncidentDetailWrapper,
    TemplateContainer,
    ContactHistory,
    CloseContactToggle,
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
    emailTemplates: {
      type: Array,
      required: true,
    },
    contactHistory: {
      type: Array,
      required: true,
    },
  },
  emits: ['closeContact'],
  setup(props, { emit }) {
    const contactCompleted = ref(false)
    const currentContext = ref({})
    const currentLocation = ref({})
    const currentContact = ref({})

    const onContextChanged = (context) => {
      currentContext.value = context
    }
    const onLocationSelected = (item) => {
      currentLocation.value = item
      if (currentLocation.value.location !== void 0) {
        const hasBeenNotified =
          currentLocation.value.location.hasBeenNotified === 'CONTACTED' ||
          false
        if (contactCompleted.value !== hasBeenNotified) {
          contactCompleted.value = hasBeenNotified
        }
      }
    }
    const onContactSelected = (item) => {
      currentContact.value = item
    }
    const onUserSelectContactCompleted = (v) => {
      const result = {
        ...v,
        ...currentLocation.value,
      }
      currentLocation.value.location.hasBeenNotified = v.closed
      contactCompleted.value = v.closed
      emit('closeContact', result)
    }
    const shouldShowContactCompletedToggle = computed(() => {
      return shouldShowContactCompleted(currentLocation)
    })
    return {
      contactCompleted,
      onContextChanged,
      onLocationSelected,
      onContactSelected,
      onUserSelectContactCompleted,
      shouldShowContactCompletedToggle,
    }
  },
}
</script>

<style></style>
