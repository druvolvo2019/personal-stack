<template>
  <q-item-section class="q-pb-sm">
    <q-input
      outlined
      bottom-slots
      :counter="isNotGrid"
      maxlength="500"
      dense
      type="text"
      :class="_class"
      :value="value"
      :label="caption"
      :disable="disable"
      :placeholder="question.placeholder"
      @input="
        $emit('update', {
          tag: question.tag,
          value: $event,
          questionId: question.questionId,
          choiceId: question.choiceId,
          id: question.id,
        })
      "
    ></q-input>
  </q-item-section>
</template>

<script>
import {
  formatWithIndex,
  questionClass,
  questionDisable
} from 'src/components/SurveyForms/jsfiles/format'

export default {
  name: 'QuestionWriteIn',
  props: {
    index: {
      type: Array,
      required: false,
      default: () => []
    },
    question: {
      type: Object,
      required: true
    },
    response: {
      type: Object,
      require: true,
      default: null
    },
  },
  computed: {
    value() {
      return this.question.getter(this.response)
    },
    caption() {
      return this.question.caption
        ? formatWithIndex(this.question.caption, this.index)
        : undefined
    },
    isNotGrid() {
      const c = this._class;
      return !c.includes("grid");
    },
    _class() {
      return questionClass(this.question, this.response)
    },
    disable() {
      return questionDisable(this.question, this.response);
    },
  },

}
</script>
