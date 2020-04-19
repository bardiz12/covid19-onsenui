<script>
import VueChartJs from "vue-chartjs";
import api from "../repository/covid19api";
export default {
  extends: VueChartJs.Bar,
  data: function() {
    return {
      countries: ["ID", "MY", "SG", "TH", "VN", "PH", "BN", "LA", "KH","Burma"],
      countries_name : ["Indonesia", "Malaysia", "Singapore", "Thailand", "Vietnam", "Philiphines","Brunei","Laos","Cambodia","Burma"],
      datacollection: {
        labels: ["x","x"],
        datasets: [
          {
            label: "Kasus Positif",
            backgroundColor: "#FFD484",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: [0, 0]
          },
          {
            label: "Meninggal",
            backgroundColor: "#F76379",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#F76379",
            data: [0, 20]
          },
          {
            label: "Sembuh",
            backgroundColor: "#6DBFBA",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#F76379",
            data: [0, 20]
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
          mode: "single",
          callbacks: {
            label: function(tooltipItems, data) {
              //console.log(data.datasets, tooltipItems);
              var str = data.datasets[tooltipItems.datasetIndex].label
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
    setDataset(positif, meninggal, sembuh, country) {
      var positif_set = this.datacollection.datasets[0];
      positif_set.data = positif;

      var meninggal_set = this.datacollection.datasets[1];
      meninggal_set.data = meninggal;
      
      var sembuh_set = this.datacollection.datasets[2];
      sembuh_set.data = sembuh;

      this.$set(this.datacollection.datasets, 0, positif_set);
      this.$set(this.datacollection.datasets, 1, meninggal_set);
      this.$set(this.datacollection.datasets, 2, sembuh_set);
      this.datacollection.labels = country;
      //
      
      this.$nextTick();
      this.renderChart(this.datacollection, this.options);
    }
  },
  mounted() {
    // this.chartData is created in the mixin
    let positif = [];
    let meninggal = [];
    let sembuh = [];
    let countries = [];
    var that = this;
    this.countries.forEach((country, index) => {
      api.getCase(country).then(res => {
        const { data } = res;
        positif.push(data.confirmed.value);
        meninggal.push(data.deaths.value);
        sembuh.push(data.recovered.value);
        countries.push(that.countries_name[index])
        that.setDataset(positif, meninggal, sembuh, countries);
      });
    });
  }
};
</script>