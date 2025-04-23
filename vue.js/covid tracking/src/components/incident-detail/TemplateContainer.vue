<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <div v-if="templates.length === 0">
      <q-card-section class="q-pt-none">
        {{ $t('noTemplatesAvailable') }}
      </q-card-section>
    </div>
    <div v-else>
      <script-display-plugin
        :templates="templates"
        :contacts="contacts"
        v-bind="$attrs"
      ></script-display-plugin>
    </div>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import ScriptDisplayPlugin from './TemplateContainerComponents/ScriptDisplayPlugin.vue'

export default {
  name: 'TemplateContainer',
  components: {
    ScriptDisplayPlugin,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    templates: {
      type: Array,
      default: () => [],
    },
    contacts: {
      type: Array,
      default: () => [],
    },
    incidentId: {
      type: String,
      default: null,
    },
  },
}
</script>

<style></style>
