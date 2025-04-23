<template>
  <q-item-section>
    <q-radio
      class="q-pb-sm"
      dense
      :value="value"
      :label="caption"
      :val="question.val"
      :disable="teamReadOnly"
      @input="
        $emit('update', {
          tag: question.tag,
          value: question.val,
          questionId: question.questionId,
          choiceId: question.choiceId,
          id: question.id,
          textEnable: question.textEnable,
        })
      "
    ></q-radio>
  </q-item-section>
</template>

<script>
import { formatWithIndex, questionClass } from 'src/components/SurveyForms/jsfiles/format';

export default {
  name: 'QuestionRadioButton',
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
      require: true,
      default: null,
    },
  },
  
  computed: {
    teamReadOnly:{
      get() {
        return this.$store.state.userprofile.teamReadOnlyCurrent
      },

      set(val) {
        this.$store.commit('userprofile/updateTeamReadOnlyCurrent', val)
      }
    },
    value() {
      return this.question.getter(this.response);
    },
    _class() {
      return `q-pb-sm ${questionClass(this.question.class, this.index)}`;
    },
    caption() {
      return formatWithIndex(this.question.caption, this.index);
    },
  },

};
</script>
