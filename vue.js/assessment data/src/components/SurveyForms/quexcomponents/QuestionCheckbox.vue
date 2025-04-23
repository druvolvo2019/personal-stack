<template>
  <q-item-section>
    <q-checkbox
      class="q-pb-sm"
      dense
      :value="value"
      :label="caption"
      :disable="disable"
      @input="
        $emit('update', {
          tag: question.tag,
          value: $event,
          questionId: question.questionId,
          choiceId: question.choiceId,
          id: question.id,
          textEnable: question.textEnable,
        })
      "
    ></q-checkbox>
  </q-item-section>
</template>

<script>
import { formatWithIndex, questionClass, questionDisable } from 'src/components/SurveyForms/jsfiles/format';

export default {
  name: 'QuestionCheckbox',
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
      default: () => {}
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
      const val = this.question.getter(this.response);
      return val || false;
    },
    _class() {
      return `q-pb-sm ${questionClass(this.question.class, this.index)}`;
    },
    caption() {
      return formatWithIndex(this.question.caption, this.index);
    },
     disable() {
      var ret = false 
      if (this.teamReadOnly === true) {
        ret = true 
      } else {
        ret = questionDisable(this.question, this.response);
      }
      return ret
    },
  },
};
</script>
