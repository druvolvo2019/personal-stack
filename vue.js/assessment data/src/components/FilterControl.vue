<template>
  <q-select
    v-model="foundObj"
    :value="filterString"
    :options="filterOptions"
    :disable="isDisabled"
    outlined
    class="q-my-sm"
    bg-color="white"
    use-input
    stack-label
    placeholder="Search..."
    display-value=""
    style="width: 300px;"
    @filter="runFilter"
  >
    <q-tooltip content-style="font-size: 16px">{{ tooltipText }}</q-tooltip>
    <template v-slot:append>
      <q-icon name="las la-search" class="cursor-pointer" />
    </template>

    <template v-slot:option="scope">
      <slot name="displayItem" v-bind="scope">
        <school-item v-if="filterKind === 'visit'" :scope="scope" />
        <tra-item v-else :scope="scope" />
      </slot>
    </template>
  </q-select>
</template>

<script>
//import svg icons
import { mdiFilterVariant } from '@quasar/extras/mdi-v5'

export default {
  name: 'FilterControl',
  components: {
    'school-item': require('src/components/Selects/SchoolSelectComponents/SchoolItem.vue')
      .default,
    'tra-item': require('src/components/Selects/SchoolSelectComponents/TraItem.vue')
      .default
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    filterKind: {
      type: String,
      required: true,
      validator: function(value) {
        return ['visit', 'tra'].indexOf(value) !== -1
      }
    }
  },

  data() {
    return {
      filterString: '',
      ourfoundObj: null,
      filterOptions: [],
      tooltipText:
        this.filterKind === 'visit'
          ? 'Type in any part of the school information'
          : 'Type in any part of a TRA'
    }
  },

  computed: {
    foundObj: {
      get() {
        return this.ourfoundObj
      },
      set(v) {
        this.ourfoundObj = v
        this.$emit('selectObject', v)
      }
    }
  },

  //initialize svg icons
  created() {
    this.mdiFilterVariant = mdiFilterVariant
  },

  methods: {
    runFilter(val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.options
        } else {
          const aterm = val.trim().toLowerCase()
          this.filterOptions = this.options.filter(v =>
            JSON.stringify(v)
              .toLowerCase()
              .includes(aterm)
          )
        }
      })
    }
  }
}
</script>
