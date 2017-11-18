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
import { mapState } from 'vuex';

export default {
  props: ['projectId'],
  data() {
    return {
      gpa: 0
    }
  },
  methods: {
    async getGpa() {
      const headers = { Authorization: this.token };

      try {
        let response = await HTTP.get(`projects/${ this.$route.params.id }`, { headers });
        let id = response.data.id;
        const result2 = await HTTP.get(`projects/${id}/gpa`, { headers });
        this.gpa = result2.data;
      } catch(err) {
        console.log(err)
      }
    }
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  mounted() {
    this.getGpa();
  }

};

</script>

<style scoped>
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
