<template>
  <q-item dense class="column">
    <q-item-section :class="_class">
      <q-markdown :src="caption" />
    </q-item-section>
    <q-item-section>
      <question
        v-for="(child, ix) in children"
        :key="child.id"
        :question="child"
        :index="[...index, ix]"
        :response="response"
        style="margin-left: 0"
        @update="$emit('update', $event)"
      ></question>
    </q-item-section>
  </q-item>
</template>

<script>
import {
  formatWithIndex,
  questionClass,
} from 'src/components/SurveyForms/jsfiles/format'

export default {
  name: 'QuestionGroup',
  components: {},
  props: {
    index: {
      type: Array,
      required: false,
      default: () => [],
    },
    question: {
      type: Object,
      required: true,
      default: () => {},
    },
    response: {
      type: Object,
      required: true,
    },
  },
  computed: {
    _class() {
      return `q-pb-sm ${questionClass(this.question, null)}`
    },
    caption() {
      return formatWithIndex(this.question.caption, this.index)
    },
    children() {
      return this.question && this.question.children
        ? this.question.children
        : []
    },
  },
}
</script>
