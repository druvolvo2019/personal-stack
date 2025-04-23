<template>
  <div>
    <q-item>
      <q-item-section>{{ heading }}</q-item-section>
      <q-item-section side
        >Q-{{ questionnaireType }}</q-item-section
      >
    </q-item>
  </div>
</template>

<script>
export default {
  name: "SectionHeading",
  props: {
    heading: { type: String, default: "" },
    questionnaireType: { type: String, default: "" }
  }
};
</script>
