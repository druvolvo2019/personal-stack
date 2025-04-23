<template>
  <q-select
    class="q-pt-sm"
    filled
    label="Assign hardcopy questionnaire"
    lazy-rules
    :options="getBarcodeOptions"
    :rules="[val => value !== undefined || 'Please assign a barcode']"
    style="width: 100%"
    :value="value"
    @input="inputChanged"
  >
    <template v-slot:prepend>
      <q-icon name="las la-barcode" />
    </template>
  </q-select>
</template>

<script>
import selectBarcodeOptions from "src/lib/selectBarcodeOptions";

export default {
  name: "SelectBarcode",
  props: {
    barcodeOptions: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      optionsCalculator: selectBarcodeOptions(this.value, this.barcodeOptions)
    };
  },
  computed: {
    getBarcodeOptions() {
      return this.optionsCalculator(this.value);
    }
  },
  methods: {
    inputChanged(val) {
      this.$emit("input", val);
    }
  }
};
</script>
