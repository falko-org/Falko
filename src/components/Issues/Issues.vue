<template>
  <div v-if="projectOrigin()">
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <div v-if="isIssuesEmpty()">
      <no-content parent ="Issue"></no-content>
    </div>
    <div class="row">
      <div class="col">
        <add-issue></add-issue>
      </div>
    </div>
    <div>
      <div v-for="i in Math.ceil(issues.length / 2)" :key="i">
        <div class="row" >
          <div
            v-for="issue in issues.slice((i-1) * 3 , i * 3)"
            :key="issue.name"
            class="col text-center"
          >
            <v-card
              class="mx-auto"
              max-width="344"
              raised
              shaped
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1"><b>{{ issue.name}}</b></v-list-item-title>
                </v-list-item-content>
                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ><v-icon class="fa fa-sticky-note"></v-icon> </v-list-item-avatar>
              </v-list-item>

              <v-card-text v-if="issue.body != null" align="left">
                {{issue.body}}
                </v-card-text>

              <v-card-actions>
                  <edit-issue :selected_issue="issue"></edit-issue>
                  <button type="button" v-on:click="closeIssue(issue.number), getIssues()" class="btn btn-primary btn-sm falko-button falko-button-danger" id="close">Close</button>
              </v-card-actions>
            </v-card>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.total_pages > 1" class="text-center">
        <v-pagination
          v-model="page"
          class="pagination"
          :length="this.total_pages"
          :total-visible="10"
          circle
          color="#3E5361"
          @input="getIssues()"
        ></v-pagination>
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
      contributors: [],
      selectedIssue: '',
      page: 1,
      total_pages: 0,
      items_per_page: [15, 30, 45, 75, 90]
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
      isProjectFromGitHub: state => state.clientStatus.isProjectFromGitHub,
    }),
  },

  filters: {
    truncate: function(string, value) {
      if(string.length > value)
        return string.substring(0, value) + '...';
      else
        return string;
    }
  },

  methods: {
    selectIssue(issue) {
      this.selectedIssue = issue;
    },

    getIssues() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.projectId}/issues/${this.page}`, { headers })
        .then((response) => {
          this.issues = response.data.issues_infos;
          this.total_pages = response.data.total_pages;
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

.pagination {
  padding-bottom: 20px;
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
