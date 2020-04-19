<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button style="color:white">Back</v-ons-back-button>
      </div>
      <div class="center" :style="{overflow:'hidden', textOverflow: 'ellipsis'}">{{news.title}}</div>
      <div class="right">
        <a :href="news.url" ><ons-toolbar-button style="color:white !important;">Open</ons-toolbar-button></a>
      </div>
    </v-ons-toolbar>
   <iframe :src="news.url" style="border: 0px;width:100%; height:100% !important;" frameborder='0' marginheight='0' marginwidth='0' width='100%' height='100%' scrolling='auto'>

   </iframe>
  </v-ons-page>
</template>

<script>

export default {
    methods:{
        handleChange(event){
            console.log(event);
        }
    }
};
</script>