<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">
        {{title}}
      </div>
    </v-ons-toolbar>
    <Jumbotron
      :image="require('../assets/img/folder.png')"
    >Data Kasus COVID-19 berdasarkan Provinsi di Indonesia</Jumbotron>
    <v-ons-list>
      <v-ons-list-item v-for="(item,i) in allProvince" :key="i" tappable @click="push(i)">
        <div class="left">
          <div class="ic-jum bg-red" v-if="item.attributes.Kasus_Posi > 1000"></div>
          <div class="ic-jum bg-yellow" v-else-if="item.attributes.Kasus_Posi > 500"></div>
          <div class="ic-jum bg-green" v-else-if="item.attributes.Kasus_Posi > 10"></div>
          <div class="ic-jum bg-blue" v-else></div>
        </div>
        <div class="center">
          <v-ons-row>
            <strong>{{item.attributes.Provinsi}}</strong>
          </v-ons-row>
          <v-ons-row>
            <v-ons-col>
              <v-ons-icon icon="md-info"></v-ons-icon>
              &nbsp; {{item.attributes.Kasus_Posi}} Kasus
            </v-ons-col>
          </v-ons-row>
        </div>
        <div class="right" style="color:#aaa">Detail</div>
        <v-ons-card>hi</v-ons-card>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<style lang="scss">

</style>
<script>
import Jumbotron from "../components/SimJumbotron";
import kawalApi from "../repository/kawalCovid";
import detail from "../pages/DetailProvince";
export default {

  components: {
    Jumbotron
  },
  data() {
    return {
      title:"Data Covid19 Provinsi",
      allProvince: []
    };
  },
  methods: {
    async loadTable() {
      const { data } = await kawalApi.getAllProvince();
      this.allProvince = data.data;
      await this.$nextTick();
    },
    push(index) {
      let that = this;
      this.$emit("push-page", {
        extends: detail,
        data(){
          return  {
            province: that.allProvince[index]
          } 
        }
      });
    }
  },
  mounted() {
    this.loadTable();
  }
};
</script>