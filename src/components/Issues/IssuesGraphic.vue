<template>
  <div>
    <div class="modal fade" id ="issuesGraphicModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Set a interval</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
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
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="getIssuesGraphicData" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
    <div align="center">
      <div id = "graphics">
        <div class="card-body " id="dashBoard" v-if="finalDate !== ''">
          <div v-if=" dataActualClosedIssues.datasets[0].data != ''" class="float-right card chartIssuesDoughnut">
            <h4>Closed Issues</h4>
            <h6>Projected monthly trend compared to last month</h6>
            <div class="labelIssuesDoughnut">
              <!-- <img v-if="closedIcon==true" src="../../assets/up-arrow.png" class="img-fluid align-self-center"/>
              <img v-if="closedIcon==false" src="../../assets/down-arrow.png" class="img-fluid align-self-center"/> -->
              {{actualClosedPercentage}}%
            </div>
            <vue-chart type="doughnut" v-bind:width="8.5" v-bind:height="3" v-bind:options="dataActualClosedIssues.options" v-bind:data="dataActualClosedIssues"></vue-chart>
          </div>

          <div v-if=" dataCompareClosedIssues.datasets[0].data != ''" class="float-right card chartIssuesDoughnut">
            <h4>Issues closed this month</h4>
            <h6>Projected monthly trend compared to last month</h6>
            <div class="labelIssues">
              <img v-if="closedPercentageIcon==true" src="../../assets/up-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              <img v-if="closedPercentageIcon==false" src="../../assets/down-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              {{compareClosedPercentage}}%
            </div>
          </div>

          <div v-if=" dataCompareOpenedIssues.datasets[0].data != ''" class="float-right card chartIssuesDoughnut">
            <h4>Issues</h4>
            <h6>Projected monthly trend compared to last month</h6>
            <div class="labelIssues">
              <img v-if="openedPercentageIcon==true"src="../../assets/up-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              <img v-if="openedPercentageIcon==false" src="../../assets/down-porcentage-arrow.png" class="img-fluid align-self-center arrow-image"/>
              {{compareOpenedPercentage}}%
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
      if (response.data.closed_issues[1] == 0) {
        this.actualClosedPercentage = response.data.closed_issues[2] * 100;
      }
      else {
        this.actualClosedPercentage = Math.round((response.data.closed_issues[2])*100/
                                      (response.data.opened_issues[2]+
                                       response.data.closed_issues[1]));
      }
      this.dataActualClosedIssues.datasets[0].data = [response.data.closed_issues[2],
                                                      response.data.opened_issues[1]];
    },

    compareClosedIssuesDoughnutPercentage(response) {
      if (response.data.closed_issues[1] == 0) {
        this.compareClosedPercentage = response.data.closed_issues[2]*100;
      }
      else {
        if (response.data.closed_issues[2] > response.data.closed_issues[1]) {
          this.compareClosedPercentage = Math.round(((response.data.closed_issues[2]/
                                                      response.data.closed_issues[1])-1)*100);
          this.closedPercentageIcon = true;
        }
        else {
          this.compareClosedPercentage = Math.round((response.data.closed_issues[2]/response.data.closed_issues[1])*100);
          this.closedPercentageIcon = false;
        }
      }
      this.dataCompareClosedIssues.datasets[0].data = [response.data.closed_issues[2],
                                                       response.data.closed_issues[1]];
    },

    compareOpenedIssuesDoughnutPercentage(response) {
      if (response.data.opened_issues[1] == 0) {
        this.compareOpenedPercentage = response.data.opened_issues[2]*100;
      }
      else{
        if (response.data.opened_issues[2] > response.data.opened_issues[1]) {
          this.compareOpenedPercentage = ((response.data.opened_issues[2]/response.data.opened_issues[1])-1)*100;
          this.openedPercentageIcon = true;
        }
        else {
          this.compareOpenedPercentage = (response.data.opened_issues[2]/response.data.opened_issues[1])*100;
          this.openedPercentageIcon = false;
        }
      }
      this.dataCompareOpenedIssues.datasets[0].data = [response.data.opened_issues[2],
      response.data.opened_issues[1]];
    },

    getIssuesGraphicData() {
      const headers = { Authorization: this.token };
      console.log(this.initialDate);
      console.log(this.finalDate);
      HTTP.post(`projects/${this.$route.params.id}/issues/graphic`, {
          actual_date: this.finalDate,
          option: 'month'
      }, { headers })
      .then((response)=>{
        this.fillChart(response);
      })
      .catch(e=>{
        this.errors.push(e)
      });
    }
  },
  mounted() {
    var today = new Date();
    this.initialDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    this.finalDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    this.getIssuesGraphicData();
  }
};
</script>
<style scoped>
#graphics {
  max-width: 70em;
}

.chartIssuesDoughnut {
  width: 22.48em;
  height: 14.4em;
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
  font-size: 4.5em;
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
  font-size: 4.5em;
  color: #124559;
  margin-top: -0.1em;
  line-height:1em;
  text-align: center;
}
#dashBoard {
  background: white;
}
#chartBar {
  background: #f7f7f7;
  border-style: solid;
}
h1 {
  color: #688E9B;
  font-weight: bold;
}
h4 {
  margin-top: 0.4em;
  color: #688E9B;
  font-weight: bold;
}
h6 {
  font-size: 0.9em;
  margin-bottom: 1em;
}

.img-fluid {
 width: 0.8em;
}

.arrow-image {
  width: 0.9em;
}

</style>
