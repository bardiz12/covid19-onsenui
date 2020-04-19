<template id="main">
  <v-ons-navigator swipeable :page-stack="pageStack" @push-page="pageStack.push($event)"></v-ons-navigator>
</template>

<script>
import page1 from "./PerProvince"
export default {
    
  data() {
    return {
      pageStack: [page1]
    };
  }
};
</script>