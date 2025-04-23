import PaginatedList from '../components/incident-detail/PaginatedList.vue'
import { createTemplate } from './lib'

export default {
  title: 'CIMS/PaginatedList',
  component: PaginatedList,
  argTypes: {
    onItemSelected: {},
  },
}

const { useTemplate } = createTemplate((args) => {
  return {
    components: { PaginatedList },
    setup() {
      return { args }
    },
    template: `<paginated-list v-bind="args">
<template v-slot:body="props">
<div>{{props.item}}</div>
</template>
</paginated-list>`,
  }
})

export const EmptyList = useTemplate({
  title: 'Schools',
  items: [],
  current: {},
})

function makeItem(index, icon) {
  return {
    id: index + 1,
    name: `School ${index + 1}`,
    icon,
  }
}

function makeItems(n, icon) {
  const result = []
  for (let i = 0; i < n; i++) {
    result.push(makeItem(i, icon))
  }
  return result
}

export const OneItemList = useTemplate({
  title: 'Schools',
  items: [makeItem(0)],
  current: makeItem(0),
})

export const FiveItemList = useTemplate({
  title: 'Schools',
  items: makeItems(5),
  current: makeItem(0),
})

export const FiveItemListWithIcons = useTemplate({
  title: 'Schools',
  items: makeItems(5, 'completed'),
  current: makeItem(0),
})

export const FifteenItemList = useTemplate({
  title: 'Schools',
  items: makeItems(15),
  current: makeItem(0),
})
