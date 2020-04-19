<template>
  <v-ons-list-item :key="index">#{{ index }}</v-ons-list-item>
</template>

<script>
export default {
  props: ["i"],
  data() {
    return {
      index: i
    };
  }
};
</script>