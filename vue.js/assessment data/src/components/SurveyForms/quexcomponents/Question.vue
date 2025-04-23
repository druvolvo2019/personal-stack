<template>
  <question-static v-if="isStatic" :question="question" :index="index">
  </question-static>
  <question-group
    v-else-if="isGroup"
    :question="question"
    :index="index"
    :response="response"
    @update="$emit('update', $event)"
  >
  </question-group>
  <question-radio-button
    v-else-if="isRadioButton"
    :class="questionClass"
    :question="question"
    :index="index"
    :response="response"
    @update="$emit('update', $event)"
  ></question-radio-button>
  <question-checkbox
    v-else-if="isCheckbox"
    :class="questionClass"
    :question="question"
    :index="index"
    :response="response"
    @update="$emit('update', $event)"
  ></question-checkbox>
  <question-write-in
    v-else-if="isWriteIn"
    :class="questionClass"
    :question="question"
    :index="index"
    :response="response"
    @update="$emit('update', $event)"
  ></question-write-in>
  <question-grid
    v-else-if="isGrid"
    :class="questionClass"
    :question="question"
    :index="index"
    :response="response"
    @update="$emit('update', $event)"
  ></question-grid>
  <question-static-list
    v-else-if="isStaticList"
    :class="questionClass"
    :question="question"
    :index="index"
  ></question-static-list>
</template>

<script>
import QuestionType from 'src/components/SurveyForms/jsfiles/questionType';
import QuestionStatic from './QuestionStatic';
import QuestionGroup from './QuestionGroup';
import QuestionGrid from './QuestionGrid';
import QuestionRadioButton from './QuestionRadioButton';
import QuestionCheckbox from './QuestionCheckbox';
import QuestionWriteIn from './QuestionWriteIn';
import QuestionStaticList from './QuestionStaticList'
//import { formatWithIndex } from 'src/components/SurveyForms/jsfiles/format.js';

export default {
  name: 'Question',
  components: {
    QuestionStatic,
    QuestionGroup,
    QuestionGrid,
    QuestionRadioButton,
    QuestionCheckbox,
    QuestionWriteIn,
    QuestionStaticList,
  },
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
    questionClass() {
      if (this.question && this.question.class) {
        if (typeof this.question.class === 'function') {
          return this.question.class(this.response);
        } else {
          return this.question.class;
        }
      }
      return '';
    },
    questionChildren() {
      return this.question && this.question.children
        ? this.question.children
        : [];
    },
    isStatic() {
      return this.question && this.question.type === QuestionType.STATIC;
    },
    isGroup() {
      return this.question && this.question.type === QuestionType.GROUP;
    },
    isRadioButton() {
      return this.question && this.question.type === QuestionType.RADIO_BUTTON;
    },
    isCheckbox() {
      return this.question && this.question.type === QuestionType.CHECKBOX;
    },
    isWriteIn() {
      return this.question && this.question.type === QuestionType.WRITE_IN;
    },
    isGrid() {
      return this.question && this.question.type === QuestionType.GRID
    },
    isStaticList() {
      return this.question && this.question.type === QuestionType.STATIC_LIST
    },
  },
};
</script>
