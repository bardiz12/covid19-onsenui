<script>
import VueChartJs from "vue-chartjs";
import api from "../repository/IdCovidApi";
export default {
  extends: VueChartJs.Line,
  props: {
      mulai: {
          type: String,
          default: ""
      },
      sampai: {
          type: String,
          default: ""
      }
  },
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Kasus Positif",
            backgroundColor: "#FFD484",
            pointBackgroundColor: "#FFD484",
            borderWidth: 5,
            pointBorderColor: "#FFD484",
            data: [0, 0],
            order: 3,
            fill:false,
          },
          {
            label: "Meninggal",
            backgroundColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "#F76379",
            borderWidth: 5,
            pointBorderColor: "#F76379",
            data: [0, 20],
            order: 1,
            fill:false,
          },
          {
            label: "Sembuh",
            backgroundColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "#6DBFBA",
            borderWidth: 5,
            pointBorderColor: "#6DBFBA",
            data: [0, 20],
            order: 2,
            fill:false,
          },
          {
            label: "Kasus Baru",
            backgroundColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "black",
            borderWidth: 5,
            pointBorderColor: "black",
            data: [0, 20],
            order: 2,
            fill:false,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true,
          position: "bottom",
          flabels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        tooltips: {
          enabled: true,
          mode: "index",
          intersect:false,
          callbacks: {
            label: function(tooltipItems, data) {
              //console.log(data.datasets, tooltipItems);
              var str = data.datasets[tooltipItems.datasetIndex].label;
              return tooltipItems.yLabel + " " + str;
            },
            
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 600
      }
    };
  },
  methods: {
    setDataset(hari) {
      console.log(hari);
      //   var label = this.datacollection.label;
      //   label.push(hari.tanggal);

      //   var positif_set = this.datacollection.datasets[0];
      //   positif_set.data = positif;

      //   var meninggal_set = this.datacollection.datasets[1];
      //   meninggal_set.data = meninggal;

      //   var sembuh_set = this.datacollection.datasets[2];
      //   sembuh_set.data = sembuh;

      //   this.$set(this.datacollection.datasets, 0, positif_set);
      //   this.$set(this.datacollection.datasets, 1, meninggal_set);
      //   this.$set(this.datacollection.datasets, 2, sembuh_set);
      //   this.datacollection.labels = label;
      //   //

      //   this.$nextTick();
      //   this.renderChart(this.datacollection, this.options);
    },
    createChart: function() {
      this.datacollection.labels = [];
      this.datacollection.datasets[0].data = [];
      this.datacollection.datasets[1].data = [];
      this.datacollection.datasets[2].data = [];
      this.datacollection.datasets[3].data = [];

      var options = {
        month: "long",
        day: "numeric"
      };
      let dateMulai = new Date(this.mulai).getTime();
      let dateSampai = new Date(this.sampai).getTime();

      for (var i = 0; i < this.result.length; i++) {
        let hari = this.result[i];
        let date = new Date(hari.tanggal);
        let str = date.toLocaleDateString("id-ID", options);

        //console.log(str);
        if (dateMulai <= date.getTime() && date.getTime() <= dateSampai) {
          this.datacollection.labels.push(str);
          this.datacollection.datasets[0].data.push(hari.jumlahKasusKumulatif);
          this.datacollection.datasets[1].data.push(hari.jumlahPasienMeninggal);
          this.datacollection.datasets[2].data.push(hari.jumlahPasienSembuh);
          this.datacollection.datasets[3].data.push(hari.jumlahKasusBaruperHari);
        }
      }
      this.renderChart(this.datacollection, this.options);
      /*this.result.forEach(hari => {
        //this.renderChart(this.datacollection, this.options);
        //this.setDataset(hari);
      });*/
    }
  },
  watch: {
    mulai() {
      this.createChart();
    },
    sampai(val) {
      if(val != undefined){
          this.createChart();
      }
    }
  },
  mounted() {
    // this.chartData is created in the mixin
    // let positif = [];
    // let meninggal = [];
    // let sembuh = [];
    // let countries = [];
    //var that = this;
    api.getHarian().then(res => {
      const { data } = res;
      this.result = data.data;
      this.createChart();
      //this.renderChart();
    });
  }
};
</script>