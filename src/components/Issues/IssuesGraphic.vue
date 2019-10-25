<template>
  <div v-if="error == false">
    <div class="modal fade" id ="issuesGraphicModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="row modal-body">
            <div class="col">
              <div class="row">
                <div class="col" v-on:>
                  <p><label > Initial Date </label></p>
                  <p><input type = "date" v-model="initialDate"></input><br></p>
                </div>
                <div class="col">
                  <p><label> Final Date </label></p>
                  <input type = "date" v-model="finalDate"></input><br>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <v-btn type="button" class="info btn-md falko-button" v-on:click="getIssuesGraphicData" data-dismiss="modal" color="#86B1B1">Save</v-btn>
            <v-btn type="button" class="info btn-md falko-button-grey" data-dismiss="modal" color="#868e96">Close</v-btn>
          </div>
        </div>
      </div>
    </div>
      <div id = "graphics">
        <div class="card-body " id="dashBoard" v-if="finalDate !== ''">
          <div class="row">
          <div v-if=" dataActualClosedIssues.datasets[0].data != ''" class="float-right card chartIssuesDoughnut col-md-4">
            <h4>Closed Issues</h4>
            <h6>Closed and opened issues relation of the last 3 months</h6>
            <div class="labelIssuesDoughnut">
              {{actualClosedPercentage}}%
            </div>
            <vue-chart type="doughnut" v-bind:width="7.5" v-bind:height="3" v-bind:options="dataActualClosedIssues.options" v-bind:data="dataActualClosedIssues"></vue-chart>
          </div>

          <div v-if=" dataCompareClosedIssues.datasets[0].data != ''" class="float-right card chartIssuesDoughnut col-md-4">
            <h4>Issues closed this month</h4>
            <h6>Projected monthly trend compared to last month</h6>
            <div class="labelIssues">
              <img v-if="closedPercentageIcon==true" src="../../assets/up-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              <img v-if="closedPercentageIcon==false" src="../../assets/down-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              {{compareClosedPercentage}}%
            </div>
          </div>

          <div v-if=" dataCompareOpenedIssues.datasets[0].data != ''" class="float-right card chartIssuesDoughnut col-md-4">
            <h4>Issues opened this month</h4>
            <h6>Projected monthly trend compared to last month</h6>
            <div class="labelIssues">
              <img v-if="openedPercentageIcon==true"src="../../assets/up-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              <img v-if="openedPercentageIcon==false" src="../../assets/down-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              {{compareOpenedPercentage}}%
            </div>
          </div>
        </div>
          <div>
          <div class = "col-md-12 card" id="chartBar">
            <br>
            <h1 align="left">Issues Graphic</h1>
            <br>
            <vue-chart type="bar" v-bind:width="19" v-bind:height="7" v-bind:options="dataBar.options" v-bind:data="dataBar"></vue-chart>
            <br>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div v-else class="empty-issues">
    <h1>There are no issues in this project</h1>
    <div class="error-icons">
      <i class="fa fa-times-circle-o empty-issues-icon" aria-hidden="true"></i>
      <i class="fa fa-list-alt issues-icon" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chart-js'
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
  extends: Bar,
  data () {
    return {
      initialDate: '',
      finalDate: '',
      error: true,
      actualClosedPercentage: 0,
      compareClosedPercentage: 0,
      compareOpenedPercentage: 0,

      closedPercentageIcon: true,
      openedPercentageIcon: true,
      closedIcon: true,

      dataBar: {
        options: {
          hover: {
            animationDuration: 600,
          },
          tooltips: {
            titleFontSize: 25,
            mode: "index",
            bodyFontSize: 20,
            bodySpacing: 6,
          },
          legend: {
            position: "top",
            labels: {
              fontSize: 20,
              padding: 25,
              // usePointStyle: true,
              boxWidth: 30,
            },
          },
          scales: {
            yAxes: [
              {
                display: true,
                gridLines: {
                  zeroLineColor: "black",
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 5,
                }
              }
            ],
            xAxes: [
              {
                categoryPercentage: 0.3,
                ticks: {
                  fontFamily: "'Open Sans Bold', sans-serif",
                  fontSize: 23,
                },
                gridLines: {
                   color: "rgba(0, 0, 0, 0)",
               },
                display: true,
              }
            ]
          },
          maxBarThickness: 1,
        },
        display: false,
        labels: [],
        datasets: [
          {
            label: 'Closed Issues',
            backgroundColor: "#124559",
            borderColor: "black",
            borderWidth: 2,
            fontSize: 10,
            data: []
          },
          {
            label: 'Opened Issues',
            backgroundColor: "#AEC3B0",
            borderColor: "black",
            borderWidth: 2,
            data: []
          },
        ],
      },

      dataActualClosedIssues: {
        options: {
          tooltips: {
            titleFontSize: 20,
            mode: "index",
            position: "nearest",
            bodyFontSize: 15,
            bodySpacing: 6,
          },
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          cutoutPercentage: 85,
          legend: {
            display: false
          },
        },
        datasets: [
          {
            data: [],
            backgroundColor: ["#124559", "#AEC3B0"],
            borderColor: "black",
            borderWidth: 1,
          }
        ],
        labels: [
          'Closed Issues',
          'Opened Issues'
        ]
      },

      dataCompareClosedIssues: {
        options: {
          tooltips: {
            titleFontSize: 20,
            mode: "index",
            bodyFontSize: 15,
            bodySpacing: 6,
          },
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          cutoutPercentage: 85,
          legend: {
            display: false
          },
        },
        datasets: [
          {
            data: [],
            backgroundColor: ["#124559", "#AEC3B0"],
            borderColor: "black",
            borderWidth: 1,
          }
        ],
        labels: [
          'Closed Issues Actual',
          'Closed Issues Before'
        ]
      },

      dataCompareOpenedIssues: {
        options: {
          tooltips: {
            titleFontSize: 20,
            mode: "index",
            bodyFontSize: 15,
            bodySpacing: 6,
          },
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          cutoutPercentage: 85,
          legend: {
            display: false
          },
        },
        datasets: [
          {
            data: [],
            backgroundColor: ["#124559", "white"],
            borderColor: "black",
            borderWidth: 1,
          }
        ],
        labels: [
          'Opened Issues Actual',
          'Opened Issues Before'
        ]
      },
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    fillChart(response) {
      this.compareClosedIssuesBar(response);
      this.compareClosedIssuesDoughnut(response);
      this.compareClosedIssuesDoughnutPercentage(response);
      this.compareOpenedIssuesDoughnutPercentage(response);
    },

    compareClosedIssuesBar(response) {
      this.dataBar.labels = response.data.months;
      this.dataBar.datasets[0].data = response.data.closed_issues;
      this.dataBar.datasets[1].data = response.data.opened_issues;
    },

    compareClosedIssuesDoughnut(response) {
      const sumOfClosedIssues = response.data.closed_issues[2] +
      response.data.closed_issues[1] +
      response.data.closed_issues[0];

      const sumOfOpenedIssues = response.data.opened_issues[2] +
      response.data.opened_issues[1] +
      response.data.opened_issues[0];


      const sumOfAllIssues = response.data.opened_issues[2] +
      response.data.closed_issues[2] +
      response.data.closed_issues[1] +
      response.data.opened_issues[1] +
      response.data.closed_issues[0] +
      response.data.opened_issues[0];

      if (sumOfClosedIssues === 0) {
        this.actualClosedPercentage = 0;
      }

      else {
        this.actualClosedPercentage = Math.round(sumOfClosedIssues*100/sumOfAllIssues);
      }

      this.dataActualClosedIssues.datasets[0].data = [sumOfClosedIssues, sumOfOpenedIssues];
    },

    compareClosedIssuesDoughnutPercentage(response) {
      const diffClosedIssues = Math.abs(response.data.closed_issues[1] - response.data.closed_issues[2])
      if (response.data.closed_issues[1] === 0) {
        this.compareClosedPercentage = response.data.closed_issues[2]*100;
      }
      else {
        if (response.data.closed_issues[2] > response.data.closed_issues[1]) {
          this.closedPercentageIcon = true;
        }
        else {
          this.closedPercentageIcon = false;
        }
        this.compareClosedPercentage = Math.round(diffClosedIssues*100 / response.data.closed_issues[1]);
      }
      this.dataCompareClosedIssues.datasets[0].data = [response.data.closed_issues[2],
                                                       response.data.closed_issues[1]];
    },

    compareOpenedIssuesDoughnutPercentage(response) {
      const diffOpenedIssues = Math.abs(response.data.opened_issues[1] - response.data.opened_issues[2])
      if (response.data.opened_issues[1] === 0) {
        this.compareOpenedPercentage = response.data.opened_issues[2]*100;
      }
      else{
        if (response.data.opened_issues[2] > response.data.opened_issues[1]) {
          this.openedPercentageIcon = true;
        }
        else {
          this.openedPercentageIcon = false;
        }
        this.compareOpenedPercentage = Math.round(diffOpenedIssues*100 / response.data.opened_issues[1]);
      }
      this.dataCompareOpenedIssues.datasets[0].data = [response.data.opened_issues[2],
                                                       response.data.opened_issues[1]];
    },

    getIssuesGraphicData() {
      const headers = { Authorization: this.token };
      HTTP.post(`projects/${this.$route.params.id}/issues/graphic`, {
          actual_date: this.finalDate,
          option: 'month'
      }, { headers })
      .then((response)=>{
        this.fillChart(response);
        this.error = false;
      })
      .catch(e=>{
        this.error = true;
      });
    }
  },
  mounted() {
    var today = new Date();
    this.initialDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    this.finalDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    this.getIssuesGraphicData();
  },
  created() {
    this.error = true;
  },
};
</script>
<style scoped>

.chartIssuesDoughnut {
  height: 11.4em;
  float: left;
  background: #f7f7f7;
  position: relative;
  border-style: solid;
}

.labelIssuesDoughnut {
  width: 100%;
  position: absolute;
  top: 60%;
  left: 0;
  font-size: 3em;
  color: #124559;
  margin-top: -0.1em;
  line-height:1em;
  text-align: center;
}
.labelIssues {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  font-size: 3.5em;
  color: #124559;
  margin-top: -0.1em;
  line-height:1em;
  text-align: center;
}
#dashBoard {
  background: white;
  width: 100%;
}
#chartBar {
  background: #f7f7f7;
  border-style: solid;
}
h1 {
  font-size: 1.6em;
  color: #688E9B;
  font-weight: bold;
}
h4 {
  font-size: 1em;
  margin-top: 0.4em;
  color: #688E9B;
  font-weight: bold;
}
h6 {
  font-size: 0.60em;
  margin-bottom: 1em;
}

.img-fluid {
 width: 0.8em;
}

.arrow-image {
  width: 0.95em;
}

.empty-issues {
  padding: 8%;
}

.error-icons {
  position: relative;
  display: inline-flex;
}

.issues-icon {
  z-index: 1;
  padding-top: 20px;
  font-size: 150px;
  color: #688E9B;
}

.empty-issues-icon {
  z-index: 2;
  position: absolute;
  bottom: -20px;
  right: -30px;
  font-size: 100px;
  color: #3E5361;
}

</style>
