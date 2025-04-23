<template>
  <q-card dark bordered class="bg-primary">
    <q-card-section horizontal>
      <q-card-section>
        <div class="bg-white" style="width: 250px">
          <q-input
            outlined
            v-model="filterValues.text"
            label="Text to filter on"
            debounce="500"
            clearable
            dense
          >
            <template v-slot:prepend>
              <q-icon name="filter_list" size="xs" />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-separator vertical></q-separator>
      <q-card-section>
        <div class="bg-white" style="width: 200px">
          <q-select
            dense
            clearable
            outlined
            v-model="filterValues.status"
            :options="statusOptions"
            label="Status"
          />
        </div>
      </q-card-section>
      <q-separator vertical></q-separator>
      <q-card-section>
        <div class="bg-white">
          <q-input
            outlined
            dense
            :model-value="displayRange"
            clearable
            @update:modelValue="changeRange"
            label="Date Range"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="filterValues.date" range mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, reactive, watch, computed } from 'vue'
export default {
  name: 'FilterDialogBar',
  emits: ['filterChanged'],
  setup(props, { emit }) {
    const filterValues = reactive({ text: '', status: null, date: null })
    const statusOptions = ref(['Pending', 'Open', 'Closed', 'Locked'])
    watch(filterValues, (current, old) => {
      console.log(current)
      emit('filterChanged', current)
    })

    const displayRange = computed(() => {
      if (filterValues.date === null) {
        return null
      } else {
        if (typeof filterValues.date === 'object') {
          return `${filterValues.date.from} to ${filterValues.date.to}`
        } else {
          return filterValues.date
        }
      }
    })
    const changeRange = (v) => {
      console.log({ v })
      filterValues.date = v
    }
    return {
      filterValues,
      statusOptions,
      displayRange,
      changeRange,
    }
  },
}
</script>

<style lang="scss" scoped>
.bg-primary {
  background-color: #1976d2;
}
</style>
