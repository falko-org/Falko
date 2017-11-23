  <template>

  <div class="row">
    <div class="col-md-3">
      <h4>Backlog da Sprint</h4>
      <draggable v-model="issues" v-bind:options="{group:'issues'}" @change="onUpdateBacklog($event)" class="dragArea">
        <div v-for="issue in issues">{{issue.name}}</div>
      </draggable>
    </div>
    <div class="col-md-3">
      <h4>To Do</h4>
      <draggable v-model="stories" v-bind:options="{group:'issues'}" @change="onUpdateToDo($event)" class="dragArea">
        <div v-for="story in stories">{{story.name}}</div>
      </draggable>
    </div>
    <div class="col-md-3">
      <h4>Doing</h4>
      <draggable v-model="doingStories" v-bind:options="{group:'issues'}" @change="onUpdateDoing($event)" class="dragArea">
        <div v-for="story in doingStories">{{story.name}}</div>
      </draggable>
    </div>
    <div class="col-md-3">
      <h4>Done</h4>
      <draggable v-model="doneStories" v-bind:options="{group:'issues'}" @change="onUpdateDone($event)"  class="dragArea">
        <div v-for="story in doneStories">{{story.name}}</div>
      </draggable>
    </div>
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
  min-height: 50px;
  border-style: solid;
  border-color: black;
  border-width: 0.5px;
}
</style>
