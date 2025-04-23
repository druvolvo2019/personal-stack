<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-btn icon="las la-sync" @click="reLoadCache"></q-btn>
      <raw-store :cache="cache" @save="saveMetadata"></raw-store>
    </div>
  </div>
</template>

<script>
import RawStore from 'src/components/debugging/RawStore'

export default {
  name: 'DisplayCache',
  components: {
    RawStore
  },
  data() {
    return {
      cache: []
    }
  },
  async mounted() {
    await this.reLoadCache()
  },
  methods: {
    async reLoadCache() {
      this.cache = await this.$naepStorage.readMetadata()
    },
    async saveMetadata(data) {
      await this.$naepStorage.writeMetadata(data)
      await this.reLoadCache()
    }
  }
}
</script>

<style></style>
