<template>
  <div class="row no-margin justify-content-center">
    <div class="col-md-6" align="center">
      <div>
        <h3>
          Sprint Retrospective  
        </h3>
      </div>
      <div>
        <list parent="PositivePoints"></list>
        <list parent="NegativePoints"></list>
        <list parent="Improvements"></list>
      </div>   
      <textarea class="text-justify" 
                placeholder="Input your sprint report..." 
                v-model="sprintReport"
      />
      
      <button class="btn btn-info btn-md falko-button" v-on:click="addRetrospective">Done</button>
    </div>
  </div>
</template>

<script>
import List from '@/components/RetrospectiveComponents/List'

export default {
  components: {
    'list': List
  },

  data () {
    return {
      sprintReport: '',
      positivePoints: [],
      negativePoints: [],
      improvements: []
    }
  },

  methods: {
    addRetrospective () {
			var token = localStorage.getItem('token');
			var tokenSimple = token.replace(/"/, "");
			var tokenSimple2 = tokenSimple.replace(/"/, "");
			var headers = { 'Authorization':tokenSimple2 };

      HTTP.post(`sprints/${this.$route.params.id}/retrospectives`, {
        sprint_report: this.sprintReport,
        positive_points: this.positivePoints,
        negative_points: this.negativePoints,
        improvements: this.improvements
      }, { headers:headers })
      .then(response => {
        //Ir para show de retrospectiva
      })
      .catch(e => {
        this.errors.push(e)
      });
    }
  }
}
</script>

<style scoped>
h3 {
  font-weight: bold;
  color: #6E9191;
  margin: 1em 0em;
}

textarea {
  width: 40em;
  height: 15em;
  padding: 1em;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: #444;
}

input::placeholder {
  color: #777;
}

</style>
