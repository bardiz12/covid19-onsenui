<template>
  <v-ons-page>
    <Jumbotron
      :image="require('../assets/img/folder.png')"
    >Data Kasus COVID-19 berdasarkan Provinsi di Indonesia</Jumbotron>
     
  </v-ons-page>
</template>

<script>
import Jumbotron from "../components/SimJumbotron";
import kawalApi from "../repository/kawalCovid";
import axios from "axios";
export default {
  components: {
    Jumbotron
  },
  data() {
    return {
      allProvince: []
    };
  },
  methods: {
    async loadTable() {
      const { data } = await kawalApi.getAllProvince();
      this.allProvince = data;
      await this.$nextTick();
    },
    loadBaru() {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia/provinsi"
        )
        .then(res => {
          this.allProvince = res.data;
          console.log(this.allProvince);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    //this.loadTable()
    //this.loadBaru();
  }
};
</script>