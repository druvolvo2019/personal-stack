<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-icon name="las la-file-contract"></q-icon>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.name }}</q-item-label>
      <q-item-label caption>{{ item.email }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        dense
        flat
        round
        icon="las la-trash"
        color="primary"
        @click="deleteNDA(item.ndaId)"
      ></q-btn>
    </q-item-section>
    <q-item-section side>
      <q-btn
        dense
        flat
        round
        icon="las la-edit"
        color="primary"
        @click="selectNDA(item)"
      ></q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'AgreementItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteNDA(id) {
      this.$emit('delete', id)
    },
    selectNDA(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style></style>
