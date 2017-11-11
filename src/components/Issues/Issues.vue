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
    <div v-for="i in Math.ceil(issues.length / 2)">
      <div class="row">
        <div v-for="issue in issues.slice((i-1) * 3 , i * 3)" class="col text-center">
        <div align="center">
          <div class="card" id="issueCard">
            <div class="card-body">
                <div class="row">
                  <div class="col">
                  <h4 class="float-left">{{issue.name}}</h4>
                  </div>
                  <div class="col-6 align-self-center">
                    <div class="float-right ">Points</div>
                    <div class="float-right number-circle">
                      <div id="pointsFont">
                        2
                      </div>
                    </div>
                 </div>
               </div>
              <div class="row">
                <div class="col-3" id="colIssue">
                  <edit-issue v-bind:selected_issue="issue"></edit-issue>
                  <button type="button" v-on:click="closeIssue(issue.number), getIssues()" class="btn btn-primary btn-sm falko-button falko-button-danger" id="close">Close</button>
                </div>
                <div class="col">
                  <p class="card-text text-muted" v-if="issue.body.length < 20">{{issue.body}}</p>
                  <p class="card-text text-muted" v-if="issue.body.length > 20">{{issue.body.substr(0, 28)}}...</p>
                </div>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>

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
      contributors: [],
      selectedIssue: ''
    }
  },

  methods: {

    selectIssue(issue) {
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
        this.getIssues();
			})
			.catch(e =>{
				this.errors.push(e)
			});
  	},

    selectIssue(issue){
      this.selectedIssue=issue
    }
  },

  mounted() {
    this.getIssues();
    this.getContributors();
  },

}
</script>

<style scoped>

#colIssue{
  max-width: 100%;
  direction: ltr;
  padding: 0;
}

p{
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#close {
  width: 83px;
  text-align: center;
}

#issueCard {
  width: 24em;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  transition: 0.2s;
}

#issueCard:hover {
  border-color: #7799A5;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
}

#issueHeader {
  background-color: white;
  height: 13em;
}

#issueTitle {
  color: black;
}

#blank_row {
    height: 10px !important;
    background-color: #FFFFFF;
}

.number-circle {
  font: 32px Arial, sans-serif;

  width: 0.5em;
  height: 0.5em;
  box-sizing: initial;

  background: #fff;
  border: 0.1em solid;
  margin-right: 0.3em;
  border-style: solid;
  color: #7799A5;
  border-radius: 50%;

  line-height: 0.5em;
  box-sizing: content-box;
  top: 50%;
  left: 50%;
}

#pointsFont {
  font-weight:bolder;
  font-size:0.4em;
}

</style>
