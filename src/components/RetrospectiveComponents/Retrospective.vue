<template>
  <div>
    <div class="row justify-content-around no-margin">
      <div class="col-md-10">
        <div class="card">
          <div class="card-head">
            <h1 id="title" class="indent"> Sprint Retrospective </h1>
          </div>
          <div class="card-body ">

            <p>
              <ul class="list-group">
                <li class="list-group-item active">Sprint Report</li>
                <li class="list-group-item mx-auto indent">
                  {{ sprintReport }}
                </li>
              </ul>
            </p>

            <div class="container">
              <div class="row">
                <p class="col-md-4">
                  <ul class="list-group ">
                    <li class="list-group-item active">Positive Points</li>
                    <li v-for="(positive, index) in positivePoints" class="list-group-item">
                      <h6> • {{positive}}</h6>
                    </li>
                  </ul>
                </p>

                <p class="col-md-4">
                  <ul class="list-group">
                    <li class="list-group-item active">Negative Points</li>
                    <li v-for="(negative, index) in negativePoints" class="list-group-item">
                      <h6>• {{negative}}</h6>
                    </li>
                  </ul>
                </p>

                <p class="col-md-4">
                  <ul class="list-group">
                    <li class="list-group-item active">Improvements</li>
                    <li v-for="(improvement, index) in improvements" class="list-group-item">
                      <h6>• {{improvement}}</h6>
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-between no-margin" id="buttons">
          <div class="col-md-3">

          </div>
          <div class="col-md-3" align="center">
            <EditRetrospective></EditRetrospective>
          </div>
          <div class="col-md-3" align="end">
            <DeleteRetrospective></DeleteRetrospective>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/RetrospectiveComponents/List'
import DeleteRetrospective from '@/components/RetrospectiveComponents/DeleteRetrospective'
import EditRetrospective from '@/components/RetrospectiveComponents/EditRetrospective'
import {HTTP} from '../../http-common.js';


export default {
  name: 'Retrospective',
  components: {
    'DeleteRetrospective': DeleteRetrospective,
    'EditRetrospective': EditRetrospective,
    'list': List
  },
  data () {
    return {
      sprintReport: "",
      positivePoints: [],
      negativePoints: [],
      improvements: []
    }
  },
  methods: {
    getRetrospective () {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      HTTP.get(`retrospectives/${this.$route.params.id}`, { headers:headers })
        .then(response => {
          console.log(response.data);
          this.sprintReport = response.data.sprint_report,
          this.positivePoints = response.data.positive_points,
          this.negativePoints = response.data.negative_points,
          this.improvements = response.data.improvements
        })
      .catch(e => {
        this.errors.push(e)
      });
    }
  },
  mounted () {
    this.getRetrospective();
  }
}

</script>

<style scoped="">
#buttons {
  margin-top: 1em;
}
p {
  color: #01161E;
  /*text-align: center;*/
}

li {
  border: 0;
}

div {
    text-align: justify;
    text-justify: inter-word;
}

.indent {
  text-indent: 20px;
}

.active {
  background-color: #86b1b1;
  text-align: center;
  border: 0;
}

#title {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
