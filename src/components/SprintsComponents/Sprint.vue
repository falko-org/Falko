<template>
  <div>
    <div class="row justify-content-around" id="sprintData">
      <div class="col-md-8">
        <ul class="list-inline">
          <li class="list-inline-item vertical-center">
            <h1>{{sprint.name}}</h1>
          </li>
          <li class="list-inline-item vertical-center small-float-right">
            <h5 class="float-left">
              {{sprint.start_date}}
              |
              {{sprint.end_date}}
            </h5>
          </li>
          <p class="text-justify text-muted">
            {{sprint.description}}
          </p>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-inline">
          <li class="list-inline-item">
            <edit-sprint></edit-sprint>
          </li>
          <li class="list-inline-item">
            <delete-sprint></delete-sprint>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus.js';
import { HTTP } from '../../http-common.js';
import EditSprint from '@/components/SprintsComponents/EditSprint';
import DeleteSprint from '@/components/SprintsComponents/DeleteSprint';
import { mapState } from 'vuex';

export default{
  name: 'InSprint',
  components: {
    'edit-sprint': EditSprint,
    'delete-sprint': DeleteSprint,
  },
  data() {
    return {
      sprint: {},
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    })
  },
  methods: {
    getSprint() {
      var headers = { 'Authorization':this.token };

      HTTP.get(`sprints/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.sprint = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  mounted() {
    const myThis = this;
    var headers = { 'Authorization':this.token };

    EventBus.$on('edited-sprint', () => {
      HTTP.get(`sprints/${this.$route.params.id}`, { headers })
        .then((response) => {
          myThis.project = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    });
    this.getSprint();
  },
};
</script>

<style scoped>
h1 {
  color: #688E9B;
  font-weight: bold;
}

h5 {
  color: rgba(1, 22, 30, 0.75);
  font-weight: lighter;
}

#sprintData {
  margin-top: 2em;
  margin-right: 0em;
}

.small-float-right {
  margin-left: 1em;
}
.vertical-center {
  vertical-align: middle;
}
</style>
