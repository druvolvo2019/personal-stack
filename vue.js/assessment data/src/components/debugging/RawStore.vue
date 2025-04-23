<template>
  <q-card flat bordered class="my-card" style="width: 100%;">
    <div v-if="editing">
      <q-card-section>
        <div class="q-gutter-md">
          <q-btn @click="saveValues">Save</q-btn>
          <q-btn @click="cancelEdit">Cancel</q-btn>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-scroll-area style="height: 700px; width: 100%;">
          <textarea
            v-model="workingCopy"
            style="width: 100%; min-height: 600px;"
          ></textarea>
        </q-scroll-area>
      </q-card-section>
    </div>
    <div v-else>
      <q-card-section>
        <q-btn @click="editValues">Edit</q-btn>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-scroll-area style="height: 700px; width: 100%;">
          <pre
            >{{ cache }}
            </pre
          >
        </q-scroll-area>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'RawStore',
  props: {
    cache: {
      type: null,
      required: true,
    },
  },
  data() {
    return {
      workingCopy: '',
      editing: false,
    }
  },
  methods: {
    editValues() {
      this.workingCopy = JSON.stringify(this.cache, null, 2)
      this.editing = true
    },
    saveValues() {
      console.log(JSON.parse(this.workingCopy))
      this.editing = false
      this.$emit('save', JSON.parse(this.workingCopy))
    },
    cancelEdit() {
      this.editing = false
    },
  },
}
</script>

<style></style>
