<template>
  <div>
    <div v-if="isSprintsEmpty()">
      <no-content parent = "Sprint"></no-content>
    </div>
    <div class="row">
      <div class="col">
        <add-sprint></add-sprint>
      </div>
    </div>

    <div class="row top-buffer" v-for="i in Math.ceil(sprints.length / 2)">
      <div v-for="sprint in sprints.slice((i-1) * 2,i*2)" class="col-md-6 text-center">
        <router-link v-bind:to="'/sprints/'+sprint.id">
          <div class="card">
            <div class="card-body sprint">
              <h4 class="card-title"> {{sprint.name}} </h4>
              <p class="card-text text-muted"> {{sprint.description}} </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddSprint from './AddSprint.vue';
import NoContent from '../NoContent.vue';
import { HTTP } from '../../http-common';

export default{
  components: {
    'add-sprint': AddSprint,
    'no-content': NoContent,
  },
  name: 'sprints',
  data() {
    return {
      sprints: [],
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    getSprints() {
      const headers = { Authorization: this.token };

      HTTP.get(`releases/${this.$route.params.id}/sprints`, { headers })
        .then((response) => {
          this.sprints = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    isSprintsEmpty() {
      return this.sprints.length === 0;
    },
  },
  mounted() {
    this.getSprints();
  },
  updated() {
    this.getSprints();
  },
};
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
