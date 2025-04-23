<template>
  <q-item v-if="!isStatic">
    <q-item-section>
      <q-item-label><b>Question:</b> {{ description }}</q-item-label>
      <q-item-label v-if="isGroup || isGrid"><b>Response:</b></q-item-label>
      <ul>
        <li v-for="key in Object.keys(questionValue)" :key="key">
          {{ key }}: {{ questionValue[key] }}
        </li>
      </ul>
    </q-item-section>
  </q-item>
</template>

<script>
import QuestionType from 'src/components/SurveyForms/jsfiles/questionType';
import { formatWithIndex } from 'src/components/SurveyForms/jsfiles/format';

export default {
  name: 'ResponseSummry',
  props: {
    index: {
      type: Array,
      required: false,
      default: () => [],
    },
    question: {
      type: Object,
      required: true,
    },
    response: {
      type: Object,
      required: true,
    },
  },
  computed: {
    questionValue() {
      switch (this.question.type) {
        case QuestionType.GROUP:
        case QuestionType.GRID:
          return this.groupedChildValues(this.childValues(this.question));
        default:
          return null;
      }
      const valueText = this.question.responseValue
        ? this.question.displayNames[this.question.responseValue]
        : 'not answered';
      const writeInText = this.question.responseWriteIn
        ? ` / ${this.question.responseWriteIn}`
        : '';
      return `${valueText}${writeInText}`;
    },
    description() {
      return formatWithIndex(this.question.description, this.index);
    },
    isStatic() {
      return this.question && this.question.type === QuestionType.STATIC;
    },
    isGroup() {
      return this.question && this.question.type === QuestionType.GROUP;
    },
    isGrid() {
      return this.question && this.question.type === QuestionType.GRID;
    },
  },
  methods: {
    groupedChildValues(childValues) {
      return childValues.reduce((accum, val) => {
        accum[val.tag] = val.value;
        return accum;
      }, {});
    },
    childValues(question) {
      const thisV =
        question.tag && question.getter
          ? {
              tag: question.tag,
              value: this.sValue(question.getter(this.response)),
            }
          : null;
      const childVs = question.children
        ? question.children.flatMap((child) => this.childValues(child))
        : [];
      return [thisV, ...childVs].filter((v) => !!v);
    },
    sValue(value) {
      return value ? value.toString() : null;
    },
  },
};
</script>
