<template>
  <q-item v-bind="myProps" v-on="myEvents">
    <q-item-section avatar top>
      <q-icon :name="asset.iconKind" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ asset.assetTagNumber }}</q-item-label>
      <q-item-label caption>{{ asset.serialNumber }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-icon v-if="deleteable" name="las la-trash" />
      <q-item-label caption>{{ asset.displayName }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'NaepAssetItemDisplay',
  props: {
    asset: {
      type: Object,
      required: true
    },
    myProps: {
      type: Object,
      default: () => {}
    },
    myEvents: {
      type: Object,
      default: () => {}
    },
    deleteable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
