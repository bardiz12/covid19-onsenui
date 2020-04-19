<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Berita</div>
    </v-ons-toolbar>
    <v-ons-pull-hook :action="refresh" @changestate="state = $event.state">
      <span v-show="state === 'initial'">Pull to refresh</span>
      <span v-show="state === 'preaction'">Release</span>
      <span v-show="state === 'action'">Memuat Data...</span>
    </v-ons-pull-hook>
    <Jumbotron :image="image">Berita terbaru seputar Covid-19 di Indonesia</Jumbotron>
    <div v-if="newsData != null">
      <v-ons-card
        v-for="(item,i) in newsData.articles"
        :key="`newsxx-${i}`"
        tappable
        @click="push(i)"
      >
        <img :src="item.urlToImage" style="width: 100%" />
        <div class="title">{{newsData.articles[i].title}}</div>
      </v-ons-card>
    </div>
    <div v-else>
        <div class="text-center">Tidak ada Data</div>
    </div>
  </v-ons-page>
</template>

<script>
//import countTo from "vue-count-to";
import Jumbotron from "../../components/SimJumbotron";
import axios from "axios";
import detail from "./NewsRead";

export default {
  components: {
    Jumbotron
  },
  data() {
    return {
      state: "initial",
      newsData: null,
      image: require("../../assets/img/newspaper.png"),
      carouselIndex: 0,
      items: {
        BLUE: "#085078",
        DARK: "#373B44",
        ORANGE: "#D38312"
      },
      dots: {
        textAlign: "center",
        fontSize: "30px",
        color: "#fff",
        position: "absolute",
        bottom: "40px",
        left: 0,
        right: 0
      }
    };
  },
  methods: {
    loadNews() {
      return axios
        .get(
          "https://newsapi.org/v2/top-headlines?q=corona&country=id&pageSize=10&page=1&apiKey=d0c2bfcae96344348f3f4a5835bfcd7c"
        )
        .then(res => {
          this.newsData = res.data;
          this.$nextTick();
        })
        .catch(err => {
          console.error(err);
        });
    },
    refresh(done) {
      this.newsData = null;
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?q=corona&country=id&pageSize=10&page=1&apiKey=d0c2bfcae96344348f3f4a5835bfcd7c"
        )
        .then(res => {
          this.newsData = res.data;
          done();
        })
        .catch(err => {
          console.error(err);
        });
    },
    push(index) {
      let that = this;
      this.$emit("push-page", {
        extends: detail,
        data() {
          return {
            news: that.newsData.articles[index]
          };
        }
      });
    }
  },
  mounted() {
    this.loadNews();
  }
};
</script>