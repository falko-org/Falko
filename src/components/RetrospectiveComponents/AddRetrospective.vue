<template>
  <div>
    <div class="text-center">
        <button type="button" class="btn btn-info btn-md falko-button" id="addButton" 
                data-toggle="modal" data-target="#addRetrospectiveModal">
          Add Retrospective
        </button>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="addRetrospectiveModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Add Sprint Retrospective  
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
          <div class="modal-body">
            <list parent="PositivePoints"></list>
            <list parent="NegativePoints"></list>
            <list parent="Improvements"></list>
            <textarea class="text-justify" 
                      placeholder="Input your sprint report..." 
                      v-model="sprintReport"
            />
          </div>   
          <div class="modal-footer">  
            <button class="btn btn-info btn-md falko-button" v-on:click="addRetrospective">Save</button>
            <button class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">Cancel</button>
          </div>   
        </div>
      </div>
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
/* h3 {
  font-weight: bold;
  color: #6E9191;
  margin: 0;
} */

textarea {
  width: 100%;
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
