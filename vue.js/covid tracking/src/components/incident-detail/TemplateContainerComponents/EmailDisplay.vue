<template>
  <q-item>
    <q-item-section>
      <q-item-label overline>{{ sendType.toLocaleUpperCase() }}</q-item-label>
      <q-item-label class="q-pl-md">{{ contact.email }}</q-item-label>
      <q-item-label caption class="q-pl-md">{{ contact.type }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EmailDisplay',
  props: {
    sendType: {
      type: String,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
