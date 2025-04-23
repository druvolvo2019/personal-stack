<template>
  <q-item :class="_class">
    <q-markdown :src="caption" />
  </q-item>
</template>

<script>
import {
  formatWithIndex,
  questionClass
} from 'src/components/SurveyForms/jsfiles/format'

export default {
  name: 'QuestionStatic',
  props: {
    index: {
      type: Array,
      required: false,
      default: () => []
    },
    question: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    _class() {
      return questionClass(this.question, null)
    },
    caption() {
      return formatWithIndex(this.question.caption, this.index)
    }
  }
}
</script>
