<template>
  <div class="gpa">
    <!-- <div class="card-body"> -->
    <div class="row align-itens-arround">
      <div class="col-5 align-content-center">
        <p class="card-text">
          <div class="number-circle " v-if = "gpa != 0">
            <div class="gpa-font v-green" v-if="gpa > 3">
              {{gpa}}
            </div>
            <div class="gpa-font v-red" v-else-if="gpa < 2">
              {{gpa}}
            </div>
            <div class="gpa-font v-yellow" v-else-if="gpa >= 2 && gpa <= 3">
              {{gpa}}
            </div>
            <h4> GPA </h4>
          </div>
        </p>
      </div>
      <div class="col">
        <p class="card-text text-justify"> </p>
      </div>
    </div>
    <!-- </div>		     -->
  </div>
</template>

<script>
import {HTTP} from '../http-common.js';
export default {
  props: ['projectId'],
  data() {
    return {
      gpa: 0
    }
  },
  methods: {
    async getGpa() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      try {
        let response = await HTTP.get(`projects/${ this.$route.params.id }`, { headers:headers });
        let id = response.data.id;
        console.log(id);
        const result2 = await HTTP.get(`projects/${id}/gpa`, { headers: headers });
        console.log(result2);
        this.gpa = result2.data;
      } catch(err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.getGpa();
  }

};

</script>

<style>

.number-circle {
  font: 32px Arial, sans-serif;

  width: 2.5em;
  height: 2.5em;
  box-sizing: initial;

  background: #fff;
  border: 0.2em solid #7799A5;
  border-style: solid;
  color: #7799A5;
  text-align: center;
  border-radius: 50%;

  line-height: 2.5em;
  box-sizing: content-box;
  top: 50%;
  left: 50%;
}

.gpa-font {
  font-weight:bolder;
  font-size:1.2em;
}

.v-red{
  color: red;
}

.v-yellow{
  color: yellow;
}

.v-green{
  color: green;
}

h4 {
  margin-top: 0.5em;
  font-weight:bolder;
}
</style>>
