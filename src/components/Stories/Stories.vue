  <template>

  <div class="row">
    <table>
      <div class="row" id="rowKanban">
        <div class="col">
          <div class="row" id="title">
            <h4>Backlog da Sprint&nbsp; &nbsp; </h4>
            <h4 style="color:#00FFFF; font-size:24px;">{{issues.length}}</h4>
          </div>
          <draggable v-model="issues" v-bind:options="{group:'issues'}" @change="onUpdateBacklog($event)" class="dragArea">
            <div v-for="issue in issues">
              <div align="center" id="cardDiv">
                <div class="card" id="kanbanCard">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
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
      <div class="col">
        <div class="row" id="title">
          <h4>To Do&nbsp; &nbsp; </h4>
          <h4 style="color:#00FFFF; font-size:24px;">{{stories.length}}</h4>
        </div>
        <draggable v-model="stories" v-bind:options="{group:'issues'}" @change="onUpdateToDo($event)" class="dragArea">
          <div v-for="story in stories">
            <div align="center" id="cardDiv">
              <div class="card" id="kanbanCard">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="float-left">{{story.name}}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
        </draggable>
        </div>
      <div class="col">
        <div class="row" id="title">
          <h4>Doing&nbsp; &nbsp; </h4>
          <h4 style="color:#00FFFF; font-size:24px;">{{doingStories.length}}</h4>
        </div>
        <draggable v-model="doingStories" v-bind:options="{group:'issues'}" @change="onUpdateDoing($event)" class="dragArea">
          <div v-for="story in doingStories">
            <div align="center" id="cardDiv">
              <div class="card" id="kanbanCard">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="float-left">{{story.name}}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col">
        <div class="row" id="title">
          <h4>Done&nbsp; &nbsp; </h4>
          <h4 style="color:#00FFFF; font-size:24px;">{{doneStories.length}}</h4>
        </div>
        <draggable v-model="doneStories" v-bind:options="{group:'issues'}" @change="onUpdateDone($event)"  class="dragArea">
          <div v-for="story in doneStories">
            <div align="center" id="cardDiv">
              <div class="card" id="kanbanCard">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="float-left">{{story.name}}</h6>
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
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
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
      }
    },

  },
  mounted() {
    this.getIssues();
    this.getToDo();
    this.getDoing();
    this.getDone();
  }
}

</script>

<style scoped>
.dragArea {
  height: 1000px;
  width: 300px;
  box-shadow: 5px 0 0 0 rgba(0,0,0,0.1);
}

#rowKanban {
  width: 1400px;
  margin-top: 50px;
}

#kanbanSpace {
  width: 50px;
}

#kanbanCard {
  max-width: 15em;
  margin-top: 15px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  transition: 0.2s;
}

#kanbanCard:hover {
  border-color: #7799A5;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
}

#title {
  justify-content: center;
  width: 270px;
}

#cardDiv {
  height: 70px;
}

</style>
