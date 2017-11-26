<template>
  <div v-if="projectOrigin()">
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
              </div>
              <div class="row">
                <div class="col-3" id="colIssue">
                  <edit-issue v-bind:selected_issue="issue"></edit-issue>
                  <button type="button" v-on:click="closeIssue(issue.number), getIssues()" class="btn btn-primary btn-sm falko-button falko-button-danger" id="close">Close</button>
                </div>
                <div class="col">
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
import { mapState } from 'vuex';
import AddIssue from './AddIssue.vue';
import EditIssue from './EditIssue.vue';
import NoContent from '../NoContent.vue';
import { HTTP } from '../../http-common';

export default {
  components: {
    'add-issue': AddIssue,
    'edit-issue': EditIssue,
    'no-content': NoContent,
  },

  data() {
    return {
      issues: [],
      selectedIssue: '',
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      isProjectFromGitHub: state => state.clientStatus.isProjectFromGitHub,
    }),
  },

  methods: {
    selectIssue(issue) {
      this.selectedIssue = issue;
    },

    getIssues() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}/issues`, { headers })
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

      HTTP.delete(`/projects/${this.$route.params.id}/issues`, config)
        .then(() => {
          this.$router.push({ path: `/projects/${this.$route.params.id}/issues` });
          this.getIssues();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    projectOrigin() {
      return this.isProjectFromGitHub;
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

#close {
  width: 83px;
  text-align: center;
}

#issueCard {
  max-width: 24em;
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

</style>
