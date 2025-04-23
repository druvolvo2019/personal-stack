<template>
  <div>
    <q-btn icon="las la-sync" @click="reLoadCache"></q-btn>
    <q-splitter v-model="splitterModel" style="height: 800px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-black">
          <q-tab name="raw" icon="code" label="Raw Data" />
          <q-tab name="queries" icon="code" label="Queries" />
          <q-tab name="cachedValues" icon="movie" label="Cached Values" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="raw">
            <div class="text-h4 q-mb-md">Raw Data</div>
            <div class="q-pa-md row items-start q-gutter-md">
              <raw-store :cache="cache" @save="saveChanges"></raw-store>
            </div>
          </q-tab-panel>

          <q-tab-panel name="queries">
            <div class="text-h4 q-mb-md">Queries</div>
            <q-splitter v-model="splitterModel2" style="height: 800px">
              <template v-slot:before>
                <div class="q-pa-md" style="max-width: 300px;">
                  <q-list bordered separator>
                    <q-item
                      v-for="(query, i) in queries"
                      :key="`qry-${i}`"
                      v-ripple
                      clickable
                      @click="selectQuery(query)"
                    >
                      <q-item-section>
                        <q-item-label>{{ query.name }}</q-item-label>
                        <q-item-label caption>{{ query.caption }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </template>
              <template v-slot:after>
                <q-card flat bordered class="my-card" style="width: 100%;">
                  <q-scroll-area style="height: 700px; width: 100%;">
                    <pre
                      >{{ queryData }}
            </pre
                    >
                  </q-scroll-area>
                </q-card>
              </template>
            </q-splitter>
          </q-tab-panel>

          <q-tab-panel name="cachedValues">
            <div class="text-h4 q-mb-md">Cached Values</div>
            <q-splitter v-model="splitterModel3" style="height: 700px">
              <template v-slot:before>
                <div class="q-pa-md" style="max-width: 300px;">
                  <q-list bordered separator>
                    <q-item
                      v-for="(obj, i) in objects"
                      :key="`qry-${i}`"
                      v-ripple
                      clickable
                      @click="selectObject(obj)"
                    >
                      <q-item-section>
                        <q-item-label>{{ obj.typename }}</q-item-label>
                        <q-item-label caption>{{ obj.id }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </template>
              <template v-slot:after>
                <q-card flat bordered class="my-card" style="width: 100%;">
                  <q-scroll-area style="height: 700px; width: 100%;">
                    <pre
                      >{{ objectData }}
            </pre
                    >
                  </q-scroll-area>
                </q-card>
              </template>
            </q-splitter>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import RawStore from 'src/components/debugging/RawStore'
function compare(xObj, yObj, key) {
  const x = xObj[key]
  const y = yObj[key]
  if (x > y) {
    return 1
  } else if (x < y) {
    return -1
  } else {
    return 0
  }
}

const normalize = (cache, value) => {
  if (value.match(/"/)) {
    return this.cache[key].replace(/\"/g, '')
  } else {
    return JSON.parse(value)
  }
}
export default {
  name: 'DisplayCache',
  components: {
    RawStore
  },
  data() {
    return {
      cache: {},
      queries: [],
      objects: [],
      queryData: '',
      objectData: '',
      tab: 'raw',
      splitterModel: 10,
      splitterModel2: 20,
      splitterModel3: 20
    }
  },
  async mounted() {
    await this.reLoadCache()
  },
  methods: {
    async saveChanges(data) {
      await this.$naepStorage.writeData(data)
      await this.reLoadCache()
    },
    async reLoadCache() {
      this.cache = await this.$naepStorage.readData()
      this.queries = Object.keys(this.cache)
        .filter(x => x.match(/^Query\./))
        .map(key => {
          const name = key.replace('Query.', '').split('(')[0]
          const caption = '(' + key.split('(')[1]
          return {
            name,
            caption
          }
        })
        .sort((x, y) => compare(x, y, 'name'))

      this.objects = Object.keys(this.cache)
        .filter(x => !x.match(/^Query/))
        .map(key => {
          const typename = key.split(':')[0]
          const id = key.replace(typename + ':', '').replace(/\.[^.]+$/, '')
          return {
            typename,
            id,
            key
          }
        })
        .filter(
          (x, i, a) =>
            a.findIndex(k => {
              return k.typename === x.typename && k.id === x.id
            }) === i
        )
        .sort((x, y) => compare(x, y, 'typename'))
    },
    test() {
      alert('clicked')
    },
    selectQuery(query) {
      this.queryData = Object.keys(this.cache)
        .filter(x => {
          return x.includes(query.name)
        })
        .reduce((o, item, i) => {
          const key = item.split('.')[1]
          return {
            ...o,
            [key]: this.cache[item].replace(/\"/g, '')
          }
        }, {})
    },
    selectObject(obj) {
      const fullKey = obj.typename + ':' + obj.id
      this.objectData = Object.keys(this.cache)
        .filter(x => {
          return x.includes(fullKey) && !x.includes(fullKey + '%2e')
        })
        .sort((x, y) => {
          if (x > y) {
            return 1
          } else if (x < y) {
            return -1
          } else {
            return 0
          }
        })
        .reduce((o, key, i) => {
          const lookup = key.replace(fullKey + '.', '')
          return {
            ...o,
            [lookup]: this.cache[key].replace(/\"/g, '')
          }
        }, {})
    }
  }
}
</script>

<style></style>
