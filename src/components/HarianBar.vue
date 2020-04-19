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
      countries: [
        "ID",
        "MY",
        "SG",
        "TH",
        "VN",
        "PH",
        "BN",
        "LA",
        "KH",
        "Burma"
      ],
      countries_name: [
        "Indonesia",
        "Malaysia",
        "Singapore",
        "Thailand",
        "Vietnam",
        "Philiphines",
        "Brunei",
        "Laos",
        "Cambodia",
        "Burma"
      ],
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Kasus Positif",
            backgroundColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "white",
            borderWidth: 5,
            pointBorderColor: "#FFD484",
            data: [0, 0],
            order: 3
          },
          {
            label: "Meninggal",
            backgroundColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "white",
            borderWidth: 5,
            pointBorderColor: "#F76379",
            data: [0, 20],
            order: 1
          },
          {
            label: "Sembuh",
            backgroundColor: "rgba(0,0,0,0)",
            pointBackgroundColor: "white",
            borderWidth: 5,
            pointBorderColor: "#6DBFBA",
            data: [0, 20],
            order: 2
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
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true,
          mode: "index",
          callbacks: {
            label: function(tooltipItems, data) {
              //console.log(data.datasets, tooltipItems);
              var str = data.datasets[tooltipItems.datasetIndex].label;
              return tooltipItems.yLabel + " " + str;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
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

      var options = {
        year: "numeric",
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
    sampai() {
      this.createChart();
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