<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-btn icon="las la-sync" @click="reLoadCache"></q-btn>
      <raw-store :cache="cache" @save="saveUser"></raw-store>
    </div>
  </div>
</template>

<script>
import RawStore from 'src/components/debugging/RawStore'

export default {
  name: 'DisplayUserInformation',
  components: {
    RawStore
  },
  data() {
    return {
      cache: ''
    }
  },
  async mounted() {
    await this.reLoadCache()
  },
  methods: {
    async reLoadCache() {
      this.cache = await this.$naepStorage.readUser()
    },
    async saveUser(data) {
      await this.$naepStorage.writeUser(data)
      await this.reLoadCache()
    }
  }
}
</script>

<style></style>
