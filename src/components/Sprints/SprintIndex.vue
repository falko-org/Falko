<template>
  <div>
    <div v-if="isSprintsEmpty()">
      <no-content parent = "Sprint"></no-content>
    </div>
    <div class="row top-buffer" v-for="i in Math.ceil(sprints.length / 2)">
      <div v-for="sprint in sprints.slice((i-1) * 2,i*2)" class="col-md-6 text-center">
        <router-link v-bind:to="'/insprint/'+sprint.id">
          <div class="card">
            <div class="card-body sprint">
              <h4 class="card-title">
                  {{sprint.name}}
              </h4>
              <p class="card-text text-muted">{{sprint.description}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col">
      <AddSprint></AddSprint>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus.js';
import AddSprint from '@/components/Sprints/AddSprint';
import {HTTP} from '../../http-common.js';
import EditProject from '@/components/EditProject';
import NoContent from '@/components/NoContent';
import { mapState } from 'vuex';

export default{
  components: {
    'AddSprint' : AddSprint,
    'no-content': NoContent,
  },
  name: 'sprints',
  data() {
    return{
      sprints: []
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    })
  },
  methods: {
    getSprints() {
      var headers = { 'Authorization':this.token };

      HTTP.get(`projects/${this.$route.params.id}/sprints`, { headers })
        .then((response) => {
          this.sprints = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    isSprintsEmpty() {
      return this.sprints.length == 0
    }
  },

  mounted() {
    this.getSprints();
  },

  updated() {
    this.getSprints();
  }
}
</script>

<style scoped>
.top-buffer {
  margin-top:30px;
}

a:link {
  text-decoration: none !important;
  color: inherit;
}

a:hover {
  font-weight: bold;
}
</style>
