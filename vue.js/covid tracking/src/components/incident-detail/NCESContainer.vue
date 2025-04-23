<template>
  <incident-detail-wrapper
    :incidentId="incidentId"
    :data="data"
    :override-title="overrideTitle"
    :display-only="true"
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
          <q-card flat bordered class="q-mt-md q-pa-md">
            <div class="text-h6">{{ $t('closeContactBtn') }}</div>
            <div>
              {{ $t('toggleContactCompleted') }}
              <div>
                <q-toggle
                  :modelValue="contactCompleted"
                  @update:modelValue="onUserSelectContactCompleted"
                />
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </template>
  </incident-detail-wrapper>
</template>

<script>
import { ref, watch } from 'vue'
import IncidentDetailWrapper from './IncidentDetailWrapper.vue'
import TemplateContainer from './TemplateContainer.vue'
import ContactHistory from './ContactHistory.vue'
export default {
  name: 'NCESContainer',
  components: {
    IncidentDetailWrapper,
    TemplateContainer,
    ContactHistory,
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
    overrideTitle: {
      type: String,
      required: true,
    },
  },
  emits: ['closeContact'],
  setup(props, { emit }) {
    console.log({ data: props.data })
    const contactCompleted = ref(props.data.locationsData.isComplete)
    const currentContext = ref({})
    const currentLocation = ref({})
    const currentContact = ref({})

    const onUserSelectContactCompleted = (v) => {
      const result = {
        closed: v,
        ...currentLocation.value,
      }
      currentLocation.value.location.hasBeenNotified = v
      contactCompleted.value = v
      emit('closeContact', result)
    }

    const onContextChanged = (context) => {
      currentContext.value = context
    }
    const onLocationSelected = (item) => {
      currentLocation.value = item
    }
    const onContactSelected = (item) => {
      currentContact.value = item
    }
    return {
      contactCompleted,
      onContextChanged,
      onLocationSelected,
      onContactSelected,
      onUserSelectContactCompleted,
      contactHistory: [],
    }
  },
}
</script>

<style></style>
