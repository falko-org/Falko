  <template>

  <div>
    <table>
      <div class="row" id="rowKanban">
        <div class="col" style="padding: 0;" id="kanbanCol">
          <div class="row" id="title">
            <h4>Sprint Backlog&nbsp; &nbsp; </h4>
            <h4 style="color:#86B1B1; font-size:24px;">{{issues.length}}</h4>
          </div>
          <draggable v-model="issues" v-bind:options="{group:'issues'}" @change="onUpdateBacklog($event)" class="dragArea">
            <div v-for="issue in issues">
              <div align="center" id="cardDiv">
                <div class="card" id="kanbanCard">
                  <div class="date">
                    <a href="#sprints/6">
                      <div class="day">{{issue.number}}</div>
                      <i class="fa fa-github" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col text-truncate" style="max-width: 150px;">
                        <h6 class="float-left">{{issue.name}}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
              </div>
            </div>
          </draggable>
        </div>
      <div class="col" id="kanbanCol">
        <div class="row" id="title">
          <h4>To Do&nbsp; &nbsp; </h4>
          <h4 style="color:#86B1B1; font-size:24px;">{{stories.length}}</h4>
        </div>
        <draggable v-model="stories" v-bind:options="{group:'issues'}" @change="onUpdateToDo($event)" class="dragArea">
          <div v-for="story in stories">
            <div align="center" id="cardDiv">
              <div class="card" id="kanbanCard">
                <div class="date"><a href="#0">
                  <div class="day">{{story.issue_number}}</div>
                  <i class="fa fa-github go-github-icon" aria-hidden="true"></i>
                </a> </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="float-left text-truncate" style="max-width: 150px;">{{story.name}}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
        </draggable>
        </div>
      <div class="col" id="kanbanCol">
        <div class="row" id="title">
          <h4>Doing&nbsp; &nbsp; </h4>
          <h4 style="color:#86B1B1; font-size:24px;">{{doingStories.length}}</h4>
        </div>
        <draggable v-model="doingStories" v-bind:options="{group:'issues'}" @change="onUpdateDoing($event)" class="dragArea">
          <div v-for="story in doingStories">
            <div align="center" id="cardDiv">
              <div class="card" id="kanbanCard">
                <div class="date"><a href="#0">
                  <div class="day" v-model="issues">{{story.issue_number}}</div>
                  <i class="fa fa-github go-github-icon" aria-hidden="true"></i>
                </a> </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="float-left text-truncate" style="max-width: 150px;">{{story.name}}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col" id="kanbanCol">
        <div class="row" id="title">
          <h4>Done&nbsp; &nbsp; </h4>
          <h4 style="color:#86B1B1; font-size:24px;">{{doneStories.length}}</h4>
        </div>
        <draggable v-model="doneStories" v-bind:options="{group:'issues'}" @change="onUpdateDone($event)"  class="dragArea">
          <!-- <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="this.closed">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>Issue Closed!</strong>
          </div> -->
          <div v-for="story in doneStories">
            <div align="center" id="cardDiv">
              <div class="card" id="doneCard" data-hover="CLOSE">
                <div class="date"><a href="#0">
                  <div class="day">{{story.issue_number}}</div>
                  <i class="fa fa-github go-github-icon" aria-hidden="true"></i>
                </a> </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="float-left text-truncate" style="max-width: 100px;"><span>{{story.name}}</span></h6>
                    </div>
                    <div class="col">
                      <a class="text-align" id="closed" style="text-decoration: underline;">Closed</a>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </table>
  </div>

  </template>

<script>

import draggable from 'vuedraggable';
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      issues: [],
      stories: [],
      doingStories: [],
      doneStories: [],
      projects: [],
      issue_number: "",
      closed: false,
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
      userId: state => state.auth.userId,
    }),
  },
  methods: {
    getIssues() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.projectId}/issues`, { headers })
        .then((response) => {
          this.issues = response.data.issues_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getToDo() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/to_do_stories`, { headers })
        .then((response) => {
          this.stories = response.data.stories_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getDoing() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/doing_stories`, { headers })
        .then((response) => {
          this.doingStories = response.data.stories_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getDone() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/done_stories`, { headers })
        .then((response) => {
          this.doneStories = response.data.stories_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    onUpdateBacklog(evt) {
      const headers = { Authorization: this.token }

      if(evt.added){
        HTTP.delete(`stories/${evt.added.element.id}`, { headers })
        .then((response) => console.log(response.code))
      }
      else {
        HTTP.post(`sprints/${this.$route.params.id}/stories`, { name: evt.removed.element.name,
                                                                 description: evt.removed.element.body,
                                                                 issue_number:evt.removed.element.number,
                                                                 pipeline:"To Do",
                                                                 initial_date:new Date().toString(),
                                                                }, { headers })
        .then((response) => console.log(response.code))
        .then(() => this.$router.push({ path: `/sprints/${this.$route.params.id}`}));
      }
    },

    onUpdateToDo(evt) {
      const headers = { Authorization: this.token };

      if(evt.added){
        HTTP.patch(`/stories/${evt.added.element.id}`, { pipeline:"To Do" }, { headers })
        .then((response) => console.log(response.code))
      }
    },

    onUpdateDoing(evt) {
      const headers = { Authorization: this.token };

      if(evt.added){
        HTTP.patch(`/stories/${evt.added.element.id}`, { pipeline:"Doing" }, { headers })
        .then((response) => console.log(response.code))
      }
    },

    onUpdateDone(evt) {
      const headers = { Authorization: this.token };
      if(evt.added){
        HTTP.patch(`/stories/${evt.added.element.id}`, { pipeline:"Done" }, { headers })
        .then((response) => console.log(response.code))

        const config = { data: { issue: { number: evt.added.element.issue_number } }, headers };

        HTTP.delete(`/projects/${this.projectId}/issues`, config)
          .then(() => {
            this.closed = true;
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
      else{

        HTTP.post(`/projects/${this.projectId}/reopen_issue`, { issue: { number: evt.removed.element.issue_number } }, { headers })
        .then(() => {
          this.closed = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      }
    },

      getProjects() {
        const headers = { Authorization: this.token };

        HTTP.get(`users/${this.userId}/projects`, { headers })
        .then((response) => {
          this.projects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      },
  },
  mounted() {
    this.getIssues();
    this.getToDo();
    this.getDoing();
    this.getDone();
    this.getProjects();
  }
}

</script>

<style scoped>

.fa {
  margin-top: 12px;
}

.dragArea {
  height: 800px;
  width: 300px;
  margin-left:auto;
  margin-right:auto;
}

#rowKanban {
  margin-left:auto;
  margin-right:auto;
}

#kanbanSpace {
  width: 50px;
}

#kanbanCard {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  transition: 0.2s;
  width: 280px;
}

#kanbanCard:hover {
  border-color: #7799A5;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
  cursor: pointer;
}

#doneCard {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  width: 280px;
  transition: 0.2s;
}

#title {
  justify-content: center;
  margin-left:auto;
  margin-right:auto;
  margin-bottom: 12px;
}

#cardDiv {
  height: 70px;
}

.date {
  position: absolute;
  top: 15px;
  right: 10px;
  z-index: 1;
  color: #688E9B;
  width: 25px;
  height: 25px;
  padding: 12.5px 0;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  border-style: solid;
  border-width: 1.3px;
  border-color: #2f5cb6;
  color: #FFFFFF;
  font-style: oblique;
  text-align: center
}

.date .day {
  font-size: 12px;
  line-height: 4px;
  color: #2f5cb6;
}

#kanbanCol {
  box-shadow: 5px 0 0 0 rgba(0,0,0,0.1);
  text-align: center;
  justify-content: center;
  width: 1000px;
}

*,
*:before,
*:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    text-align: center;
    background: #00C8FF;
}

p {
    font-size: 1.6em;
    font-family: 'Lato', sans-serif;
    background-color: #fff;
    padding: 1em;
    color: #002240;
    margin-top: 0;
}

#closed {
  color: red;
}

</style>
