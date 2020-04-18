<template>
  <div id="app">
    <v-ons-page>
      <v-ons-toolbar>
        <div class="center">{{title}}</div>
      </v-ons-toolbar>

      <v-ons-tabbar swipeable position="bottom">
        <template slot="pages">
          <Home/>
          <PerProvinceVue/>
          <About/>
        </template>
        <v-ons-tab
          v-for="(tab, i) in tabs "
          :key="i + 999999"
          :icon="tabs[i].icon"
          :label="tabs[i].label"
          :badge="tabs[i].badge"
        ></v-ons-tab>
      </v-ons-tabbar>
    </v-ons-page>
  </div>
</template>

<script>
import Home from "./pages/Home";
import About from "./pages/About";
import PerProvinceVue from "./pages/PerProvince.vue";
export default {
  name: "App",
  components:{
    Home,
    About,
    PerProvinceVue
  },
  mounted() {},
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
            myProp: "This is a page prop!"
          },
          key: "homePage"
        },
        {
          icon: "md-book",
          title: "Data Provinsi",
          label: "Data Provinsi",
          page: PerProvinceVue,
          props: {
            myProp: "This is a page prop!"
          },
          key: "provinciPage"
        },
        {
          icon: "md-info",
          title: "About",
          label: "About",
          page: About,
          props: {
            myProp: "This is a page prop!"
          },
          key: "aboutPage"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].title;
    }
  }
};
</script>
