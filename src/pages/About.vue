<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{title}}</div>
    </v-ons-toolbar>
    <Jumbotron :image="image" :isRounded="true">
      Hi! My name is Bardizba. This Apps is intended to retreive the latest update of Covid-19 Statistics in Indonesia. Thanks to
      <a
        href="https://github.com/mathdroid/indonesia-covid-19-api"
      >mathdroid</a> for providing the API. beside, im stuck on my thesis and work project. lol.
    </Jumbotron>
    <v-ons-card>
      <div class="title">Find me!</div>
      <div class="content">
        <v-ons-row>
          <template v-for="link in links">
            <a :key="link.link" :href="link.link">
              <v-ons-button modifier="outline" style="margin:5px">
                <v-ons-icon :icon="link.icon" />
                {{link.label}}
              </v-ons-button>
            </a>
          </template>
        </v-ons-row>
      </div>
    </v-ons-card>
    <v-ons-card>
      <div class="content">
        <v-ons-list>
          <v-ons-list-header>Thanks to</v-ons-list-header>
          <v-ons-list-item v-for="thank in thanks" :key="thank" @click="goToLink(thank)">{{thank}}</v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import Jumbotron from "../components/SimJumbotron";
export default {
  props: ["title"],
  data() {
    return {
      image: require("../assets/img/profile.jpg"),
      links: [
        {
          icon: "md-github",
          link: "https://github.com/bardiz12",
          label: "Github"
        },
        {
          icon: "fa-globe",
          link: "https://bardiz.digital",
          label: "Website"
        },
        {
          icon: "fa-twitter",
          link: "https://twitter.com/bardiz12",
          label: "Twitter"
        },
        {
          icon: "fa-instagram",
          link: "https://instagram.com/bardiz12",
          label: "Instagram"
        },
        {
          icon: "",
          link: "https://www.dicoding.com/users/220176",
          label: "Dicoding"
        },
        
      ],
      thanks: [
        "https://github.com/mathdroid/",
        "http://github.com/OnsenUI",
        "https://github.com/PanJiaChen/vue-countTo",
        "https://material.io/",
        "https://www.netlify.com/",
        "https://vuejs.org/"
      ]
    };
  },
  components: {
    Jumbotron
  },
  methods: {
    goToLink(link) {
      window.location.href = link;
    }
  }
};
</script>