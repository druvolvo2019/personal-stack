<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-item v-for="item in itemsWithData" :key="item.id">
        <q-item-section>
          <q-item-label>{{ item.displayName }}</q-item-label>
          <q-item-label caption>{{ item.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'InformationView',
  props: {
    title: {
      type: String,
      default: 'Placeholder',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const itemsWithData = computed(() =>
      props.items.filter((x) => x.displayName !== '')
    )
    return {
      itemsWithData,
    }
  },
}
</script>

<style scoped>
.my-card {
  width: 100%;
  height: 325px;
}
</style>
