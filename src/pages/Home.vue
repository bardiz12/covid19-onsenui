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
    <Jumbotron :image="image1">Hi!, Selamat datang di Aplikasi Pantau COVID-19</Jumbotron>
    <div class="m-5"></div>
    <v-ons-row>
      <v-ons-col class="p-start">
        <h2>Statistik Covid-19 di Indonesia</h2>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card class="card-border-bottom-blue">
          <div class="title">Jumlah Kasus</div>
          <div class="content text-right text-big">
            <countTo :startVal="0" :endVal="statusIndo.confirmed" :duration="2000"></countTo>
          </div>
        </v-ons-card>
      </v-ons-col>
      <v-ons-col>
        <v-ons-card class="card-border-bottom-red">
          <div class="title">Meninggal</div>
          <div class="content text-right text-big">
            <countTo :startVal="0" :endVal="statusIndo.deaths" :duration="2000"></countTo>
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card class="card-border-bottom-green">
          <div class="title">Sembuh</div>
          <div class="content text-right text-big">
            <countTo :startVal="0" :endVal="statusIndo.recovered" :duration="2000"></countTo>
          </div>
        </v-ons-card>
      </v-ons-col>
      <v-ons-col>
        <v-ons-card class="card-border-bottom-yellow">
          <div class="title">Kasus Aktif</div>
          <div class="content text-right text-big">
            <countTo :startVal="0" :endVal="statusIndo.active" :duration="2000"></countTo>
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col class="p-full text-right text-small">
        <i>
          Last Update :
          <time-ago
            :locale="locale"
            :refresh="1"
            :datetime="statusIndo.lastUpdate ? statusIndo.lastUpdate  : 0"
            long
          ></time-ago>
        </i>
      </v-ons-col>
    </v-ons-row>

    <div v-for="(prov,i) in allProvince" :key="i + 100">hiasdasdadsasda {{prov}}</div>
    <template v-if="allProvince != null">
      <div v-for="n in 20" v-bind:key="n+1000">{{n*5}}</div>
    </template>
    <template v-else></template>
    <Jumbotron iconPos="left" :image="image2" class="text-right">
      <h1>Incident Rate</h1>Nilai incident rate di indonesia sebesar :
      <div class="text-big">
        <countTo :startVal="0" :endVal="statusIndo.incidentRate" :duration="2000" :decimals="5"></countTo>%
      </div>
    </Jumbotron>

    <v-ons-card>
      <div class="title">Stastik Kasus Covid19 di Negara Asean</div>
      <div class="content">
        
        <AseanBar :countries="selected" />
        <div style="font-size:5pt !important">
          <multiselect v-model="selected" :options="countries" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true" multiple>
             <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length && !isOpen">{{ values.length }} Negara ditampilkan</span></template>
          </multiselect>
        </div>
      </div>
    </v-ons-card>

    <v-ons-card>
      <div class="title">Grafik Harian Kasus Covid19 di Indonesia</div>
      <div class="content">
        <v-ons-card class="">
          <v-ons-row>
            <v-ons-col>
              Dari
            </v-ons-col>
            <v-ons-col>
              Sampai
            </v-ons-col>
          </v-ons-row>

          <v-ons-row>
            <v-ons-col>
              <v-ons-input  v-model="mulai" type="date"></v-ons-input>
            </v-ons-col>
            <v-ons-col>
               <v-ons-input  v-model="sampai" type="date"></v-ons-input>
            </v-ons-col>
          </v-ons-row>
        </v-ons-card>

        <HarianBar :height="600" :mulai="mulai" :sampai="sampai" />
      </div>
    </v-ons-card>
    <div class="text-center p-full">
      Tarik kebawah untuk merefresh Data
    </div>
  </v-ons-page>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import Jumbotron from "../components/SimJumbotron";
import countTo from "vue-count-to";
import api from "../repository/covid19api";
import TimeAgo from "vue2-timeago";
import AseanBar from "../components/AseanBar";
import HarianBar from "../components/HarianBar";
import multiselect from "vue-multiselect";
export default {
  props: ["title"],
  data: function() {
    return {
      
      countries: [
        {key: "ID", name:"Indonesia"},
        {key: "MY", name:"Malaysia"},
        {key: "SG", name:"Singapore"},
        {key: "TH", name:"Thailand"},
        {key: "VN", name:"Vietnam"},
        {key: "PH", name:"Philiphines"},
        {key: "BN", name:"Brunei"},
        {key: "LA", name:"Laos"},
        {key: "KH", name:"Cambodia"},
        {key: "Burma", name:"Burma"}
      ],
      selected: [
        {key: "ID", name:"Indonesia"},
        {key: "MY", name:"Malaysia"},
        {key: "SG", name:"Singapore"},
        {key: "TH", name:"Thailand"},
        {key: "VN", name:"Vietnam"},
        {key: "PH", name:"Philiphines"},
        {key: "BN", name:"Brunei"},
        {key: "LA", name:"Laos"},
        {key: "KH", name:"Cambodia"},
        {key: "Burma", name:"Burma"}
      ],
      mulai:"2020-03-02",
      sampai:"2020-03-30",
      chartData: null,
      allProvince: null,
      state: "initial",
      locale: "id",
      statusIndo: {
        lastUpdate: null,
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        active: 0,
        incidentRate: 0
      },
      image1: require("../assets/img/covid.png"),
      image2: require("../assets/img/chart.png")
      //chartjs
    };
  },
  components: {
    Jumbotron,
    countTo,
    TimeAgo,
    AseanBar,
    HarianBar,
    multiselect
  },
  methods: {
    async loadIndo() {
      const { data } = await api.getConfirmed("ID");
      this.statusIndo = data[0];
    },
    
    async refresh(done) {
      this.statusIndo = {
        lastUpdate: null,
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        active: 0,
        incidentRate: 0
      };
      await this.loadIndo();
      done();
    },
    addData: function addData() {
      this.dataset.push(this.dataentry);
      this.labels.push(this.datalabel);
      this.datalabel = "";
      this.dataentry = "";
    }
  },
  mounted() {
    this.loadIndo();
   

    
  },
  computed: {
    toRender() {
      return this.allProvince;
    }
  },
  created() {
     var date = new Date()
    this.sampai = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" : "") + parseInt(date.getMonth() + 1) + "-" + date.getDate();
  }
};
</script>