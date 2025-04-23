<template>
  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
    <q-item-section>
      <div class="row q-pb-xs">
        <q-item-label caption>{{ scope.opt.assignedFieldArea }}</q-item-label>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'TraItem',
  props: {
    scope: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
