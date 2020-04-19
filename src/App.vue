<template>
  <div id="app">
    <v-ons-page>
     

      <v-ons-tabbar swipeable position="item"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
      @click="changeTitle"
    ></v-ons-tabbar>

    </v-ons-page>
  </div>
</template>

<script>
import Home from "./pages/Home";
import About from "./pages/About";
import DataProvince from "./pages/DataProvince.vue";
export default {
  name: "App",

  methods:{
    changeTitle(){
      window.document.title = "Covid19Apps - " + this.tabs[this.activeIndex].label;
    }
  },
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: "md-home",
          title: "Home",
          label: "Home",
          page: Home,
          props: {
            title: "Home"
          },
          key: "homePage"
        },
        {
          icon: "md-book",
          title: "Data Provinsi",
          label: "Data Provinsi",
          page: DataProvince,
          props: {
            title: "Data Provinsi",
          },
          key: "provinciPage"
        },
        {
          icon: "md-info",
          title: "About",
          label: "About",
          page: About,
          props: {
            title: "About",
          },
          key: "aboutPage"
        }
      ]
    };
  },
  computed: {
    title() {
      window.document.title = "Covid19Apps - " + this.tabs[this.activeIndex].label;
      console.log(window.document.title);
      return this.tabs[this.activeIndex].label;
    }
  }
};
</script>
