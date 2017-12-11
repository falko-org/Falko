<template>
  <div v-if="isFromProjectGitHub()">
    <div v-if="isIssuesEmpty()">
      <no-content parent ="Issue"></no-content>
    </div>
    <h1>Backlog</h1>
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
                  <p>{{ issue.name | truncate '10' }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-3" id="colIssue">
                  <edit-issue v-bind:selected_issue="issue"></edit-issue>
                  <button type="button" v-on:click="closeIssue(issue.number), getIssues()" class="btn btn-primary btn-sm falko-button falko-button-danger" id="close">Close</button>
                </div>
                <div class="col" v-if="issue.body != null" >
                  <div class="card-text text-muted card-description" v-if="issue.body.length > 20">{{issue.body.substr(0, 28)}}...</div>
                  <div class="card-text text-muted card-description" v-if="issue.body.length < 20">{{issue.body}}</div>
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
import AddIssue from './AddIssue.vue';
import EditIssue from './EditIssue.vue';
import NoContent from '../NoContent.vue';
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
  components: {
    'add-issue': AddIssue,
    'edit-issue': EditIssue,
    'no-content': NoContent,
  },

  data() {
    return {
      issues: [],
      contributors: [],
      selectedIssue: '',
      is_project_from_github: '',
    }
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
    }),
  },

  filters: {

  truncate: function(string, value) {
    return string.substring(0, value) + '...';
  }
  },

  methods: {
    selectIssue(issue) {
      this.selectedIssue = issue;
    },

    getIssues() {
      this.getProjectOrigin();

      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.projectId}/issues`, { headers })
        .then((response) => {
          this.issues = response.data.issues_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    isIssuesEmpty() {
      return this.issues.length === 0;
    },

    closeIssue(number1) {
      const headers = { Authorization: this.token };

      const config = { data: { issue: { number: number1 } }, headers };

      HTTP.delete(`/projects/${this.projectId}/issues`, config)
        .then(() => {
          this.$router.push({ path: `/projects/${this.$route.params.id}/issues` });
          this.getIssues();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getProjectOrigin() {
      this.is_project_from_github = (localStorage.getItem('is_project_from_github') === 'true');
    },

    isFromProjectGitHub() {
      return this.is_project_from_github;
    },
  },

  mounted() {
    this.getIssues();
  },

};
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
  max-width: 24em;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  transition: 0.2s;
  margin-top: 10px;
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

.card-description {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

h1 {
  margin-top: 20px;
  margin-left: 20px;
  color: #598392;
}
</style>
