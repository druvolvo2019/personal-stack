<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-scroll-area style="height: 250px">
        <q-item
          v-for="item in items"
          :key="item.id"
          :clickable="!displayOnly"
          v-ripple="!displayOnly"
          :class="lineClass(item)"
          @click="itemSelected(item)"
          ><q-item-section v-if="item.icon !== void 0" avatar>
            <q-icon
              :color="iconMap(item.icon).color"
              :name="iconMap(item.icon).icon"
            />
          </q-item-section>
          <q-item-section>
            <slot name="body" v-bind:item="item"></slot>
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, watch } from 'vue'
import iconMap from '../../lib/icon-maps.js'

console.log({ iconMap })

export default {
  name: 'PaginatedList',
  props: {
    title: {
      type: String,
      default: 'Placeholder',
    },
    items: {
      type: Array,
      default: () => [],
    },
    displayOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['itemSelected'],
  setup(props, { emit }) {
    console.log(props.items)
    const itemSelected = (item) => {
      if (current.value.id !== item.id) {
        current.value = item
        emit('itemSelected', item)
      }
    }

    const firstItem = () => (props.items.length > 0 ? props.items[0] : {})
    const current = ref(firstItem())

    watch(
      () => props.items,
      (items, oldItems) => {
        current.value = firstItem()
        emit('itemSelected', current.value)
      }
    )

    emit('itemSelected', current.value)
    const lineClass = (item) => {
      const selected = props.displayOnly ? '' : 'selected-item'
      if (current.value.id !== void 0) {
        return item.id === current.value.id ? selected : ''
      } else {
        return ''
      }
    }

    return {
      lineClass,
      itemSelected,
      iconMap,
    }
  },
}
</script>
<style scoped>
.my-card {
  width: 100%;
  height: 325px;
}
.selected-item {
  color: blue;
  font-weight: bold;
}
</style>
