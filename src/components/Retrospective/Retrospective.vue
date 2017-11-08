<template>
  <div>
    <div class="row justify-content-around no-margin">
      <div class="col-md-10">
        <div class="card">
          <div class="card-head text-center">
            <h1 id="title" class=""> Sprint Retrospective </h1>
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
        <div class="row justify-content-around" id="buttons">
          <edit-retrospective></edit-retrospective>
          <delete-retrospective></delete-retrospective>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/Retrospective/List'
import DeleteRetrospective from '@/components/Retrospective/DeleteRetrospective'
import EditRetrospective from '@/components/Retrospective/EditRetrospective'
import {HTTP} from '../../http-common.js';


export default {
  name: 'Retrospective',
  components: {
    'delete-retrospective': DeleteRetrospective,
    'edit-retrospective': EditRetrospective,
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

<style scoped>
#buttons {
  margin-top: 1em;
}

h1 {
  color: #688E9B;
  font-weight: bold;
  margin-top: 0.5em;
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

.active {
  background-color: #86b1b1;
  text-align: center;
  border: 0;
}
</style>
