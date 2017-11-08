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
    <div class="row justify-content-around" v-for="i in Math.ceil(issues.length / 2)">
      <div v-for="issue in issues.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">
          <div class="card" id="issueCard">
              <div class="card-header" id="issueHeader">
                <div class="row align-itens-around" id="issueTitle">
                  <div class="col">
                    <h4 class="no-margin float-left">{{issue.name}}</h4>
                  </div>
                  <div class="col">
                    <!-- <img src="../../assets/dateicon.png" width="25em" alt="Date icon"/> -->
                    <h6 class="no-margin float-right">
                    </h6>
                  </div>
                </div>
                  <div class="row">
                    <div class="col" v-on:click="selectIssue(issue)">
                      <edit-issue v-bind:selected_issue="selectedIssue"></edit-issue>
                    </div>
                    <div class="col">
                      <button type="button" v-on:click="closeIssue(issue.number), reload()" class="btn btn-primary falko-button falko-button-danger">Close</button>
                    </div>
                  </div>
              </div>
            </router-link>
          </div>
          <br>
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
      selectedIssue: undefined
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

      console.log(header)
      let config = {data : {issue: {number:number1}}, headers:header}

      // var config2 = config.replace("/", "")
      // var config3 = config2.replace("/", "")

      console.log(config)
      HTTP.delete(`/projects/${this.$route.params.id}/issues`, config)
      .then(response =>{
				this.$router.push({ path : `/project/${this.$route.params.id}/issues`});
			})
			.catch(e =>{
				this.errors.push(e)
			});
  	},
    reload() {
      this.getIssues();
    }
  },

  mounted() {
    this.getIssues();
  },

  updated() {
    this.getIssues();
  }
}
</script>

<style scoped>
#issueCard {
  width: 30em;
}

#issueHeader {
  background-color: #7799A5;
}

#issueTitle {
  margin: 0;
  color: white;
}

#numberSprints {
  margin-left: -10;
}

#amountSprintsFont {
  font-weight:bolder;
  font-size:1.4em;
}

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

div a {
  text-decoration: none;
  color: inherit;
}

#issueCard:hover {
  /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15); */
  border-color: #7799A5;
}
</style>
