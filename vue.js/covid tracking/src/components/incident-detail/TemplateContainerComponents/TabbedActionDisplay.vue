<template>
  <q-card-section class="q-pt-none">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      narrow-indicator
    >
      <q-tab
        v-for="item in context.templates"
        :key="item.id"
        :name="item.id"
        :label="item.tabDisplayText"
      />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        v-for="item in context.templates"
        :key="item.id"
        :name="item.id"
      >
        <slot :template="item" :context="context"></slot>
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { contextManagerFactory } from '../../../lib/contextManagerFactory'

export default {
  name: 'TabbedActionDisplay',
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
    const tab = ref(
      props.templates.length > 0 ? props.templates[0].id : undefined
    )
    watch(
      () => props.templates,
      (value) => {
        tab.value = value.length > 0 ? value[0].id : undefined
      }
    )
    watch(
      () => tab.value,
      (value) => {
        emit('contextChanged', context.value)
      }
    )
    const context = computed(() => {
      const contextManager = contextManagerFactory(
        props.templates,
        props.contacts,
        props.currentContact
      )
      return contextManager(tab.value)
    })

    if (tab.value !== void 0) {
      emit('contextChanged', context.value)
    }
    return { tab, context }
  },
}
</script>

<style></style>
