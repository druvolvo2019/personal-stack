<template>
    <div>
        <assign-panel :userAgents="userAgents" locationKind= "School"></assign-panel>
        <div></div>
    </div>
</template>

<script>
    export default {
        components: {
	  'assign-panel' : require('components/AssignmentPanels.vue').default
  },


   data() {
    return {
      userAgents: [],

    }
  },

  mounted() {
    fetch('http://localhost:3000/data')
      .then((res) => res.json())
      .then((data) => (this.userAgents = data))
      .catch((err) => console.log(err.message))

  },
    }
    
</script>

<style scoped>

</style>