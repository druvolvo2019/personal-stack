<template>
    <div>
        <notes-panel></notes-panel>
    </div>

</template>

<script>
    export default {
          components: {
	  'notes-panel' : require('components/NotesPanel.vue').default
  }
    }
</script>

<style>

</style>