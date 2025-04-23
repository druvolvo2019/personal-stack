<template>
  <div>
    <q-page padding>
      <h4>Contact Parent</h4>
      <q-btn @click="$i18n.locale = 'en-US'">English</q-btn>
      <q-btn @click="$i18n.locale = 'es-pr'">Spanish</q-btn>
      <q-badge > {{ firstcontact }} </q-badge>
      <contact-details
        :detailPreface="$t('cd-normal-preface')"
        :label="$t('cd-descr-school')"
        :contactdata="firstcontact"
      />
      <q-badge > {{ secondcontact }} </q-badge>
      <contact-details
        :detailPreface="$t('cd-second-preface')"
        :label="$t('cd-descr-district')"
        :contactdata="secondcontact"
      />
    </q-page>
  </div>
</template>

<script>
import ContactDetails from "components/ContactDetails.vue";

/* eslint-disable */

export default {
  name: "ContactParent",

  components: {
    "contact-details": require("components/ContactDetails.vue").default,
  },
  data() {
    return {
      firstcontact: {
        name: "",
        phone: "",
        phoneext: "",
        email: "",
        title: "",
      },
      secondcontact: {
        name: "",
        phone: "",
        phoneext: "",
        email: "",
        title: "",
      },
    };
  },
  methods: {
  },
  async mounted() {
    console.log("ContactParent.mounted")
    this.$i18n.locale = 'en-US'
  },
};
</script>
