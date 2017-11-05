<template>
  <div class="delsprint">
    <button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#delSprintModal">
      Delete
    </button>
    <div class="modal fade" id ="delSprintModal" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <div>
                    <h4 class="modal-title">Delete Sprint?</h4>
                  </div>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <p><label> Are you sure?</label></p>
              </div>
              <div class="modal-footer">
                  <button v-on:click="delSprint" type="button" class="btn btn-info btn-md falko-button" data-dismiss="modal" >Yes</button>
                <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">No</button>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common.js';

export default {
  name: 'delsprint',
  data () {
    return {

    }
  },
  methods:{

    async delSprint(){

      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      try {
        let response = await HTTP.get("sprints/"+this.$route.params.id, { headers: headers });
        let id = response.data.release_id;
        await HTTP.delete("sprints/"+this.$route.params.id, { headers: headers })
        this.$router.push({ path : `/releases/${id}/sprints`});
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
