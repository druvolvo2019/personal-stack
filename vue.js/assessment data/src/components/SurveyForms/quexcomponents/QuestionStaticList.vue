<template>
  <q-item-section>
    <q-expansion-item v-model="expanded" :label="caption">
      <q-card>
        <q-card-section>
          <q-list dense padding class="rounded-borders">
            <q-item v-for="(item, i) in items" :key="`item-${i}`">
              <q-item-section>
                <q-item-label> * {{ item }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-item-section>
</template>

<script>
import {
  formatWithIndex,
  questionClass,
} from 'src/components/SurveyForms/jsfiles/format'

export default {
  name: 'QuestionStaticList',
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
      default: () => {},
    },
  },
  data() {
    return {
      expanded: true,
    }
  },
  computed: {
    value() {
      return false
    },
    _class() {
      return `q-pb-sm ${questionClass(this.question.class, this.index)}`
    },
    caption() {
      return formatWithIndex(this.question.caption, this.index)
    },
    items() {
      return this.question.items
    },
  },
}
</script>
