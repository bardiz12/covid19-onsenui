<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button style="color:white">Back</v-ons-back-button>
      </div>
      <div
        class="center"
        style="text-overflow: ellipsis; overflow:hidden"
      >Status di {{allProvince[index].provinsi}}</div>
    </v-ons-toolbar>

    <v-ons-carousel swipeable auto-scroll :index.sync="index">
      <v-ons-carousel-item v-for="(item,key) in allProvince" :key="item.fid">
        <!--<div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">{{key}}</div>-->
        <div
          v-if="arrayTiga.includes(key)"
          style="text-align: center; color: rgb(74, 74, 74); width: 100%; margin-top: 30px;"
        >
          <div
            style="text-transform: uppercase; font-size: 24px; line-height: 24px;"
          >{{item.provinsi}}</div>
          <div
            style="margin: 2px 0px 0px; text-transform: uppercase; font-size: 12px; line-height: 12px;"
          >Indonesia</div>

          <div style="font-size: 100px; margin: 20px 0px 0px; color: rgb(148, 168, 189);">
            <div
              style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
              class="ic-jum bg-red"
              v-if="item.kasusPosi > 1000"
            >
              <span style="margin:auto">HIGH</span>
            </div>
            <div
              style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
              class="ic-jum bg-yellow"
              v-else-if="item.kasusPosi > 500"
            >
              <span style="margin:auto">MEDIUM</span>
            </div>
            <div
              style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
              class="ic-jum bg-green"
              v-else-if="item.kasusPosi > 10"
            >
              <span style="margin:auto">LOW</span>
            </div>
            <div
              style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
              class="ic-jum bg-blue"
              v-else
            >
              <span style="margin:auto">VERY LOW</span>
            </div>
          </div>

          <div style="font-size: 40px; font-weight: 300; display: flex; margin: 40px 25px;">
            <div style="flex-grow: 1; display: flex; flex-direction: column;">
              <div style="font-size: 60px;">
                <countTo
                  v-if="index == key"
                  :startVal="startVal"
                  :endVal="item.kasusMeni"
                  :duration="2000"
                ></countTo>
                <template v-else>0</template>
              </div>
              <div style="font-size: 14px; font-weight: 400;">Meninggal</div>
            </div>
            <div style="flex-grow: 1; display: flex; flex-direction: column;">
              <div style="font-size: 60px;">
                <countTo v-if="index == key" :endVal="item.kasusSemb" :duration="2000"></countTo>
                <template v-else>0</template>
              </div>
              <div style="font-size: 14px; font-weight: 400;">Sembuh</div>
            </div>
          </div>
          <div style="font-size: 40px; font-weight: 300; display: flex; margin: 40px 25px;">
            <div style="flex-grow: 1; display: flex; flex-direction: column;">
              <div style="font-size: 60px;">
                <countTo v-if="index == key" :endVal="item.kasusPosi" :duration="2000"></countTo>
                <template v-else>0</template>
              </div>
              <div style="font-size: 14px; font-weight: 400;">Kasus</div>
            </div>
          </div>
          <div style="font-size:10pt;color:#888">Usap layar untuk melihat Provinsi lain</div>
        </div>
      </v-ons-carousel-item>
    </v-ons-carousel>
  </v-ons-page>
</template>

<script>
import countTo from "vue-count-to";

export default {
  data() {
    return {
      startVal: 0
    };
  },
  components: {
    countTo
  },
  methods: {
    onSwipe(index, animationOptions) {
      console.log(index, animationOptions);
      this.startVal = Math.random();
    }
  },
  computed:{
    arrayTiga(){
      let i = this.index;
      if(i == null){
        i = 0
      }
      return [i-1,i,i+1]
    }
  }
};
</script>