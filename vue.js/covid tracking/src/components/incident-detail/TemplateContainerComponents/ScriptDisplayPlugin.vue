<template>
  <tabbed-action-display
    v-if="displayTemplates.length > 0"
    :templates="displayTemplates"
    :contacts="contacts"
    :current-contact="currentContact"
    v-bind="$attrs"
  >
    <template v-slot:default="props">
      <div v-for="(scriptLine, idx) in props.context.currentScript" :key="idx">
        <component
          :is="scriptLine.componentName"
          :context="props.context"
          :scriptLine="scriptLine"
          v-bind="$attrs"
        ></component>
      </div>
    </template>
  </tabbed-action-display>
  <div v-else class="q-ma-md">No action needed</div>
</template>

<script>
import { computed } from 'vue'
import AllEmailDisplayPlugin from './AllEmailDisplayPlugin.vue'
import CallCompletePlugin from './CallCompletePlugin.vue'
import HtmlDisplayPlugin from './HtmlDisplayPlugin.vue'
import PhoneReachedPlugin from './PhoneReachedPlugin.vue'
import SendEmailPlugin from './SendEmailPlugin.vue'
import SendEmailNoNotesPlugin from './SendEmailNoNotesPlugin.vue'
import TabbedActionDisplay from './TabbedActionDisplay.vue'

export default {
  name: 'ScriptDisplayPlugin',
  components: {
    TabbedActionDisplay,
    AllEmailDisplayPlugin,
    SendEmailPlugin,
    SendEmailNoNotesPlugin,
    HtmlDisplayPlugin,
    PhoneReachedPlugin,
    CallCompletePlugin,
  },
  props: {
    templates: {
      type: Array,
      default: () => [],
    },
    contacts: {
      type: Array,
      default: () => [],
    },
    currentContact: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const displayTemplates = computed(() => {
      return props.templates.filter(
        (template) =>
          (template.displayFn &&
            template.displayFn(props.currentContact.type)) ||
          template.display === 'any' ||
          (template.display === 'match' &&
            template.primaryType === props.currentContact.type)
      )
    })

    return {
      displayTemplates,
    }
  },
}
/*



*/
</script>

<style></style>
