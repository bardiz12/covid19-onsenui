<script>
import VueChartJs from "vue-chartjs";
import api from "../repository/covid19api";
export default {
  extends: VueChartJs.Bar,
  props:["countries"],
  data: function() {
    return {
      allData:{},
      selectedCountries : [],
      /*countries_name: [
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
      ],*/
      datacollection: {
        labels: ["x", "x"],
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Jumlah"
              },
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Negara"
              },
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
    setDataset() {
      
      /*var positif, meninggal, sembuh, country
      var positif_set = this.datacollection.datasets[0];
      positif_set.data = positif;

      var meninggal_set = this.datacollection.datasets[1];
      meninggal_set.data = meninggal;

      var sembuh_set = this.datacollection.datasets[2];
      sembuh_set.data = sembuh;

      this.$set(this.datacollection.datasets, 0, positif_set);
      this.$set(this.datacollection.datasets, 1, meninggal_set);
      this.$set(this.datacollection.datasets, 2, sembuh_set);
      this.datacollection.labels = country;*/
      //
      let toShow = [];
      for(let key in this.countries){
          toShow.push(this.countries[key].key);
      }

      let datacollection = this.datacollection;
      let options = this.options;
      
      let positif = [];
      let meninggal = [];
      let sembuh = [];
      let labels = [];
      for(let key in this.allData){
        if(toShow.includes(key)){
          let kasus = this.allData[key]
          positif.push(kasus.confirmed.value)
          meninggal.push(kasus.deaths.value)
          sembuh.push(kasus.recovered.value)
          labels.push(this.countries[toShow.indexOf(key)].name)
        }
      }
      datacollection.datasets[0].data = positif;
      datacollection.datasets[1].data = meninggal;
      datacollection.datasets[2].data = sembuh;
      datacollection.labels = labels;
      console.log(datacollection,toShow);
      
      this.datacollection = datacollection
      this.options = options;
      this.$nextTick();
      this.renderChart(this.datacollection, this.options);
      
    }
  },
  watch:{
    countries(){
      this.setDataset();
    }
  },
  mounted() {
    // this.chartData is created in the mixin
    /*let positif = [];
    let meninggal = [];
    let sembuh = [];
    let countries = [];*/
    this.countries.forEach((country) => {
      api.getCase(country.key).then(res => {
        const { data } = res;
        this.allData[country.key] = (data)
/*        positif.push(data.confirmed.value);
        meninggal.push(data.deaths.value);
        sembuh.push(data.recovered.value);*/
        this.selectedCountries.push(country);
        this.setDataset();
      });
    });
  }
};
</script>