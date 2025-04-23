<template>
  <q-card style="width: 800px; max-width: 120vw;">
    <q-bar>
      <div>{{ title }}</div>

      <q-space />

      <q-btn v-close-popup dense flat icon="close">
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section>
      <div class="text-h6">History</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- eslint-disable vue/no-v-html -->
      <div class="q-pa-md" v-html="html"></div>
      <!--eslint-enable -->
    </q-card-section>

    <q-card-section v-if="isEditable" class="q-pt-none">
      <q-btn v-close-popup outline label="Edit" @click="$emit('editHistory')">
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'SurveyHistoryDialog',

  props: {
    title: {
      type: String,
      default: '',
    },

    text: {
      type: String,
      default: '',
    },

    html: {
      type: String,
      default: '',
    },

    editable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isEditable: this.editable,
    }
  },
}
</script>
