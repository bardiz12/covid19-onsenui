<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{title}}</div>
    </v-ons-toolbar>
    <v-ons-pull-hook :action="refresh" @changestate="state = $event.state">
      <span v-show="state === 'initial'">Pull to refresh</span>
      <span v-show="state === 'preaction'">Release</span>
      <span v-show="state === 'action'">Memuat Data...</span>
    </v-ons-pull-hook>
    <Jumbotron
      :image="require('../assets/img/folder.png')"
    >Data Kasus COVID-19 berdasarkan Provinsi di Indonesia</Jumbotron>
    <v-ons-list>
      <v-ons-list-item v-for="(item,i) in allProvince" :key="i" tappable @click="push(i)">
        <div class="left">
          <div class="ic-jum bg-red" v-if="item.kasusPosi > 1000"></div>
          <div class="ic-jum bg-yellow" v-else-if="item.kasusPosi > 500"></div>
          <div class="ic-jum bg-green" v-else-if="item.kasusPosi > 10"></div>
          <div class="ic-jum bg-blue" v-else></div>
        </div>
        <div class="center">
          <v-ons-row>
            <strong>{{item.provinsi}}</strong>
          </v-ons-row>
          <v-ons-row>
            <v-ons-col>
              <v-ons-icon icon="md-info"></v-ons-icon>
              &nbsp; <countTo :startVal="0" :endVal="item.kasusPosi" :duration="2000"></countTo> Kasus
            </v-ons-col>
          </v-ons-row>
        </div>
        <div class="right" style="color:#aaa">Detail</div>
        <v-ons-card>hi</v-ons-card>
      </v-ons-list-item>
    </v-ons-list>
    <div class="text-center p-full">
      Tarik kebawah untuk merefresh Data
    </div>
  </v-ons-page>
</template>

<style lang="scss">
</style>
<script>
import Jumbotron from "../components/SimJumbotron";
import api from "../repository/IdCovidApi";
import detail from "../pages/DetailProvince";
import countTo from "vue-count-to"
export default {
  components: {
    Jumbotron,
    countTo
  },
  data() {
    return {
      state: "initial",
      title: "Data Covid19 Provinsi",
      allProvince: []
    };
  },
  methods: {
    async refresh(done) {
      this.allProvince = []
      await this.loadTable();
      done();
    },
    async loadTable() {
      const { data } = await api.getProvinsi();
      this.allProvince = data.data;
      await this.$nextTick();
    },
    push(index) {
      let that = this;
      this.$emit("push-page", {
        extends: detail,
        data() {
          return {
            province: that.allProvince[index],
            allProvince: that.allProvince,
            index,
            
          };
        }
      });
    }
  },
  mounted() {
    this.loadTable();
  }
};
</script>