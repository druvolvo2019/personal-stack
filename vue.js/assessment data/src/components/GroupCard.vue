<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <q-card bordered flat square class="fit">
      <div class="row items-center q-pt-md q-px-md">
        <div class="col-4 text-subtitle1">{{ group.time }}</div>
        <q-space />
        <div class="col-7 text-right">
         <template v-if="group.type == 'Regular'">{{ groupname }}</template>
         <template v-if="group.type == 'Accommodation'">Accommodation {{ groupname }}</template>
        </div>
      </div>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-chair" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ locationandtime }}
              </q-item-label>
              <q-item-label caption>
                {{ group.type }}
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="group.studentCount === 1" side>
              {{ group.studentCount }} student
            </q-item-section>
            <q-item-section v-if="group.studentCount > 1" side>
              {{ group.studentCount }} students
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="las la-user" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span
                  v-for="(administrator, index) in group.assignedAdministrators"
                  :key="index"
                  ><span v-if="index > 0">, </span>{{ administrator }}</span
                >
              </q-item-label>
              <q-item-label
                v-if="group.assignedAdministrators.length === 1"
                caption
              >
                Assessment Administrator
              </q-item-label>
              <q-item-label
                v-if="group.assignedAdministrators.length > 1"
                caption
              >
                Assessment Administrators
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="group.schoolStaffName.length > 0">
            <q-item-section avatar>
              <q-icon name="las la-user" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span
                  v-for="(schoolstaff, index) in group.schoolStaffName"
                  :key="index"
                  ><span v-if="index > 0">, </span>{{ schoolstaff }}</span
                >
              </q-item-label>
              <q-item-label
                v-if="group.schoolStaffName.length === 1"
                caption
              >
                School Staff
              </q-item-label>
              <q-item-label
                v-if="group.schoolStaffName.length > 1"
                caption
              >
                School Staffs
              </q-item-label>
              
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-gutter-xs">
        <q-chip
          v-for="item in group.accommodations"
          :key="item.code"
          class="my-chip"
        >
          <q-avatar class="my-avatar">{{ item.count }}</q-avatar>
          {{ item.code }}
        </q-chip>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Utils from 'src/lib/schoolListCardsUtils';

export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  computed: {
    locationandtime: function () {
      var ret = "";
      
      if (this.group.time != "" && this.group.location != "") {
        ret = this.group.time + ", " + this.group.location;
      }
      
      return ret;
    },
    groupname: function () {
      
      return Utils.getGroupName(this.group);
      //return this.group.label + this.group.sessId.substring(this.group.sessId.length - 1, this.group.sessId.length);
      
    }
  }
}
</script>

<style lang="sass">
.my-chip
  background-color: lighten($primary, 50)
.my-avatar
  background-color: lighten($primary, 25)
  color: white
</style>
