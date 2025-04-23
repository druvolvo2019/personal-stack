<template>
  <q-item dense :class="_class">
    <q-item-section class="q-pb-sm">{{ caption }}</q-item-section>
    <q-table
      square
      flat
      dense
      hide-bottom
      hide-header
      :columns="columns"
      :data="rows"
      row-key="id"
      table-style="border-top: 1px solid gray; border-right: 1px solid gray;"
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props" :class="rowBackground(props)">
          <q-td v-for="(child, ix) in props.row.children" :key="ix" class="grid-borders">
            <question
              :question="child"
              :index="[...index, ix]"
              :response="response"
              @update="$emit('update', $event)"
            ></question>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-item-section class="q-pb-sm"></q-item-section>
  </q-item>
</template>

<script>
import {
  formatWithIndex,
  questionClass,
} from 'src/components/SurveyForms/jsfiles/format'

export default {
  name: 'QuestionGrid',
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
  data() {
    return {
      pagination: { rowsPerPage: 0 },
    }
  },
  computed: {
    _class() {
      return `column ${questionClass(this.question, null)}`
    },
    caption() {
      return formatWithIndex(this.question.caption, this.index)
    },
    rows() {
      return this.question && this.question.children
        ? this.question.children
        : []
    },
    columns() {
      return this.question && this.question.columns
        ? this.question.columns.map((name, index) => {
            return {
              name,
              index,
              align: 'left',
              label: '',
              required: true,
              sortable: false,
            }
          })
        : []
    },
  },
  methods: {
    rowBackground(props) {
      return props.rowIndex % 2 ? 'grid-row-odd' : 'grid-row-even'
    },
  },
}
</script>
