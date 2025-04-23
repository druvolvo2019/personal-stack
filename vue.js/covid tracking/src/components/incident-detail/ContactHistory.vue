<template>
  <q-card flat bordered :contactHistory="contactHistory">
    <div class="q-pl-md q-pb-lg q-pt-md text-black text-h6">
      Contact History
    </div>
    <q-scroll-area class="bordered" style="height: 1000px; max-width: 800px">
      <div
        v-for="instance in contactHistory"
        :key="instance.cifreferenceid"
        class="contactHistory"
      >
        <q-list dense class="list-wrapper">
          <div class="blue-line"></div>
          <q-item v-if="instance.contactlogtypedesc != 'Agent Assigned'">
            <q-item-section>
              <div class="row">
                <div class="row">
                  <div class="list-bullet"></div>
                  <div>
                    <q-item-label class="q-pt-sm text-black text-weight-medium">
                      {{ instance.contactlogtypedesc }}:
                      {{ instance.fldcontactcodedesc }}</q-item-label
                    >
                  </div>
                  <div>
                    <q-item-label
                      class="q-pt-sm q-pl-sm text-negative text-weight-medium"
                      >#{{ instance.cifreferenceid }}</q-item-label
                    >
                  </div>
                </div>

              </div>
              <div class="row">
                <div class="list-bullet-clear"></div>
                <q-item-label class="q-pb-md text-black text-body2"
                  >{{ instance.updateduesrname }} | {{ instance.createdTime }}
                  {{ instance.createdDate }}</q-item-label
                >
              </div>

            </q-item-section>
          </q-item>

          <q-item v-if="instance.contactlogtypedesc == 'Agent Assigned'">
            <q-item-section>
              <div class="row">
                <div class="row">
                  <div class="list-bullet"></div>
                  <div>
                    <q-item-label class="q-pt-sm text-black text-weight-medium">
                      {{ instance.contactlogtypedesc }}</q-item-label
                    >
                  </div>
                  <div>
                    <q-item-label
                      class="q-pt-sm q-pl-sm text-negative text-weight-medium"
                      >#{{ instance.cifreferenceid }}</q-item-label
                    >
                  </div>
                </div>

              </div>
              <div class="row">
                <div class="list-bullet-clear"></div>
                <q-item-label class="q-pb-md text-black text-body2"
                  >{{ instance.updateduesrname }} | {{ instance.createdTime }}
                  {{ instance.createdDate }}</q-item-label
                >
              </div>

                <q-item-label class="q-ml-lg text-black text-body2 q-pb-sm">
                  Assigned to @{{ instance.fldcontactcodedesc }}
                </q-item-label>
          
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      // ContactLog: [],
      dropdown: {},
    }
  },

  props: {
    contactHistory: {
      type: Array,
      required: true,
    },
  },

  methods: {
    setDropDesc(incident_number, event) {
      this.dropdown[incident_number] = this.dropdown[incident_number] || {}
      this.dropdown[incident_number][event] =
        !this.dropdown[incident_number][event]
    },

    getDropDesc(incident_number, event) {
      this.dropdown[incident_number] = this.dropdown[incident_number] || {}
      return this.dropdown[incident_number][event]
    },
  },
}
</script>

<style>
.list-bullet {
  float: right;
  z-index: 2;
  margin-right: 10px;
  background: #186faf;
  height: 10px;
  width: 10px;
  line-height: 30px;
  border-radius: 100px;
  margin-top: 12px;
}
.list-bullet-clear {
  float: right;
  z-index: 2;
  margin-right: 20px;
  background: #186faf;
  height: 10px;
  line-height: 30px;
  border-radius: 100px;
  font-weight: 700;
  color: white;
  text-align: center;
  opacity: 0;
}
.blue-line {
  background: #9fb3c8;
  z-index: 1;
  width: 2px;
  height: 100%;
  position: absolute;
  left: 20px;
}
.list-wrapper {
  position: relative;
}
.list-item-wrapper {
  position: relative;
}
</style>
