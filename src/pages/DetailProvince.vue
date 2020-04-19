<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button style="color:white">Back</v-ons-back-button>
      </div>
      <div class="center">Status di {{province.attributes.Provinsi}}</div>
    </v-ons-toolbar>
    <div style="text-align: center; color: rgb(74, 74, 74); width: 100%; margin-top: 30px;">
      <div
        style="text-transform: uppercase; font-size: 24px; line-height: 24px;"
      >{{province.attributes.Provinsi}}</div>
      <div
        style="margin: 2px 0px 0px; text-transform: uppercase; font-size: 12px; line-height: 12px;"
      >Indonesia</div>

      <div style="font-size: 100px; margin: 20px 0px 0px; color: rgb(148, 168, 189);">
        <div
          style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
          class="ic-jum bg-red"
          v-if="province.attributes.Kasus_Posi > 1000"
        >
          <span style="margin:auto">HIGH</span>
        </div>
        <div
          style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
          class="ic-jum bg-yellow"
          v-else-if="province.attributes.Kasus_Posi > 500"
        >
          <span style="margin:auto">INTERMEDIET</span>
        </div>
        <div
          style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
          class="ic-jum bg-green"
          v-else-if="province.attributes.Kasus_Posi > 10"
        >
          <span style="margin:auto">SMALL</span>
        </div>
        <div
          style="width:100px;height:100px;margin:auto;font-size:12pt;color:white"
          class="ic-jum bg-blue"
          v-else
        >
          <span style="margin:auto">VERY SMALL</span>
        </div>
      </div>

      <div style="font-size: 40px; font-weight: 300; display: flex; margin: 40px 25px;">
        <div style="flex-grow: 1; display: flex; flex-direction: column;">
          <div style="font-size: 60px;">
            <countTo :startVal="0" :endVal="province.attributes.Kasus_Meni" :duration="2000"></countTo>
          </div>
          <div style="font-size: 14px; font-weight: 400;">Meninggal</div>
        </div>
        <div style="flex-grow: 1; display: flex; flex-direction: column;">
          <div style="font-size: 60px;">
           <countTo :startVal="0" :endVal="province.attributes.Kasus_Semb" :duration="2000"></countTo>
          </div>
          <div style="font-size: 14px; font-weight: 400;">Sembuh</div>
        </div>
      </div>
      <div style="font-size: 40px; font-weight: 300; display: flex; margin: 40px 25px;">
        <div style="flex-grow: 1; display: flex; flex-direction: column;">
          <div style="font-size: 60px;">
            <countTo :startVal="0" :endVal="province.attributes.Kasus_Posi" :duration="2000"></countTo>
          </div>
          <div style="font-size: 14px; font-weight: 400;">Kasus</div>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: {
    countTo
  }
};
</script>