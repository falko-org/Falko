<template>
  <div>
    <div v-if="isIssuesEmpty()">
      <no-content parent ="Issue"></no-content>
    </div>
    <div class="row">
      <div class="col">
        <add-issue></add-issue>
      </div>
    </div>
    <table width="1855" v-for="i in Math.ceil(issues.length / 2)">
    <tr> <td colspan="2" bgcolor="#FFFFFF" height="30">&nbsp;</td> </tr>
    <div class="row">
      <div v-for="issue in issues.slice((i-1) * 6 , i * 6)" class="col-2 text-center">
        <div align="center">
          <div class="card" id="issueCard">
            <div class="card-header" id="issueHeader">
              <div class="text-align:center" id="issueTitle">
                  <h4>{{issue.name}}</h4>
                  <h8 class="card-text text-muted">{{issue.body}}</h8>
              </div>
              <div class="row">
                <div class="col">
                  <edit-issue v-bind:selected_issue="issue"></edit-issue>
                </div>
                <div class="col">
                  <button type="button" v-on:click="closeIssue(issue.number), reload()" class="btn btn-primary btn-sm falko-button falko-button-danger">Close</button>
                </div>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>
  </table>

  </div>
</template>

<script>
import { HTTP } from '../../http-common.js'
import AddIssue from '@/components/Issues/AddIssue'
import EditIssue from '@/components/Issues/EditIssue'
import NoContent from '@/components/NoContent'

export default {
  components: {
    'add-issue': AddIssue,
    'edit-issue': EditIssue,
    'no-content': NoContent
  },

  data () {
    return {
      issues: [],
      selectedIssue: ''
    }
  },

  methods: {
    selectIssue(issue){
      this.selectedIssue = issue;
    },

    getIssues() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var header = { 'Authorization': tokenSimple2 };

      HTTP.get(`projects/${this.$route.params.id}/issues`, { headers: header })
        .then((response) => {
          this.issues = response.data.issues_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    isIssuesEmpty() {
      return this.issues.length == 0
    },

    closeIssue(number1){
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var header = { 'Authorization': tokenSimple2 };

      let config = {data : {issue: {number:number1}}, headers:header}

      HTTP.delete(`/projects/${this.$route.params.id}/issues`, config)
      .then(response =>{
				this.$router.push({ path : `/project/${this.$route.params.id}/issues`});
			})
			.catch(e =>{
				this.errors.push(e)
			});
  	},

    selectIssue(issue){
      this.selectedIssue=issue
    },

    reload() {
      this.getIssues();
    }
  },

  mounted() {
    this.getIssues();
  },

}
</script>

<style scoped>
#issueCard {
  width: 17em;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.4);
  transition: 0.2s;
}

#issueCard:hover {
  border-color: #7799A5;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

#issueHeader {
  background-color: white;
}

#issueTitle {
  margin: none;
  color: black;
}

#blank_row {
    height: 10px !important;
    background-color: #FFFFFF;
}

</style>
