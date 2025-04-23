<template>
  <q-select
    v-model="internalValue"
    :options="options"
    label="Missing Assets"
    filled
    clearable
    use-chips
    multiple
    @input="missingAssetsChanged"
  >
    <template v-slot:option="scope">
      <naep-asset-item-display
        :asset="scope.opt"
        :my-props="scope.itemProps"
        :my-events="scope.itemEvents"
      />
    </template>
  </q-select>
</template>

<script>
import { assetsToOptions } from 'src/lib/assetsToOptions'

export default {
  name: 'NaepAssetMultiSelect',
  components: {
    'naep-asset-item-display': require('./NaepAssetItemDisplay.vue').default
  },
  props: {
    assets: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: assetsToOptions(this.assets),
      internalValue: this.value
    }
  },
  methods: {
    missingAssetsChanged(e) {
      this.options = assetsToOptions(this.assets, e)
      this.$emit('input', e)
    }
  }
}
</script>
