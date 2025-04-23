


<template lang="">
  <header>
    <h1>{{title}}</h1>
    <Button text="Add TasK" color ="green"/>
  </header>
</template>


<script>
import Button from "./Button.vue";

export default {
  name: "Header",
  //   props: ["title"],
  props: {
    title: String,
  },
  components: {
    Button,
  },

  // props:{
  //     title:{
  //         type:String,
  //         default:'this is me not you just me'
  //     }

  // }
};
</script>

<style lang="css" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>